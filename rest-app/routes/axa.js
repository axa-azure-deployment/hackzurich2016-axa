var express = require('express');
var querystring = require('querystring');
var url = require('url');

var router = express.Router();

module.exports = router;

function RestApiError(code, message) {
    this.name = "RestApiError";
    this.message = "["+code+"] "+(message || "");
}
RestApiError.prototype = Error.prototype;

function getHttpErrorCode(e) {
    var hasError = /^\[.*\].*$/.test(e.message);
    if (hasError) {
        var myRegexp = /^\[(.*)\].*$/;
        var match = myRegexp.exec(e.message);
        return match[1];
    } else {
        return "500";
    }
}

function handleError(res, e, docs, defaultString) {
    if (e && e.name == "RestApiError") {
        console.log("handle error: e="+e+", docs="+docs+", str="+defaultString);
        res.status(getHttpErrorCode(e)).send(e.message);
        //res.render('500', {error: err, stack: err.stack});
        return true;
    } else if (e) {
        console.log("handle error: e="+e+", docs="+docs+", str="+defaultString);
        res.status(500).send(e.message);
        return true;
    } else if (!docs) {
        console.log("handle error: e="+e+", docs="+docs+", str="+defaultString);
        res.status(404).send(defaultString);
        return true;
    }
    return false;
}

function isEmpty(obj) {
    return obj == undefined || obj.length == 0;
}
function isInvalidWildcard(obj) {
    return /^.*[\.\*].*$/.test(obj);
}


function isNumeric(obj) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !Array.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
}

function fullUrl(req, dictionary) {
    var path = req.originalUrl;
    var query = "";
    var index = path.indexOf('?');
    if (index >= 0) {
        query = path.substr(index+1);
        path = path.substr(0, index);
    }
    var queryParams = querystring.parse(query);
    for (item in dictionary) {
        queryParams[item] = dictionary[item];
    }
    query = "?"+querystring.stringify(queryParams);
    var fullURL = req.protocol + '://' + req.get('host') + path + query;
    return fullURL;
}


function linkURL(req, skip, limit, max, overwrite) {
    //console.log(skip +" / "+limit + "/ "+max);
    if (!overwrite) {
        if (skip < 0) {
            return null;
        }
        if (skip + limit > max) {
            return null;
        }
        if (skip >= max) {
            return null;
        }
    }
    return fullUrl(req, { "skip" : skip, "limit" : limit});
}

function buildResponseLimited(req, res, skip, limit, e, docs, totalCount) {
    if (handleError(res, e, docs, "no results found")) {
        return;
    }
    var lastSkip = (Math.floor(totalCount / limit)) * limit;
    if (lastSkip == totalCount) { lastSkip = Math.max(0, lastSkip - limit); }
    var prevSkip = skip - limit;
    var nextSkip = skip + limit;
    res.json({
        "links" : {
            "cur" : linkURL(req, skip, limit, totalCount, true),
            "first" : linkURL(req, 0, limit, totalCount, true),
            "prev" : linkURL(req, prevSkip, limit, totalCount, false),
            "next" : linkURL(req, nextSkip, limit, totalCount, false),
            "last" : linkURL(req, lastSkip, limit, totalCount, true),
            "count" : docs.length,
            "totalCount" : totalCount
        },
        "data" : docs
    })
}

function buildOptions(req, idName, sortColumn) {
    var limit = parseInt(req.param('limit'));
    var skip = parseInt(req.param('skip')); 

    if (!limit) { 
        limit = 10; 
    }
    if (limit > 100 || limit < -100 ) {
        throw new RestApiError("400", 'limit <'+limit+'> is too high. Use skip (max +/-100) & limit to get data');
    }
    if (!skip) { 
        skip = 0; 
    }
    if (isEmpty(sortColumn)) {
        var options = {
            "limit": limit,
            "skip": skip
        }
    } else {
        var options = {
            "limit": limit,
            "skip": skip,
            "sort": sortColumn
        }
    }
    return options;
}
function findLimited(req, res, collection, idName, query, sortColumn) {
    var options = buildOptions(req, idName, sortColumn);
    var limit = options.limit;
    var skip = options.skip; 
    collection.count(query, function (e1, totalCount) {
        if (handleError(res, e1, totalCount, 'not found')) {
            return;
        }
        collection.find(query, options, function(e, docs){
            buildResponseLimited(req, res, skip, limit, e, docs, totalCount);
        });
    });

}

/************* start model **************************/


function registerModelAPIs(type, typeMultiple, idName, isIdInteger, hasLimitCollection) {
if (isIdInteger === undefined) isIdInteger = false; // default string

/*
 * GET models.
 */
router.get('/'+typeMultiple, function(req, res) {
    var db = req.db;
    var collection = db.get(typeMultiple);
    if (hasLimitCollection) {
        try {
            var sortColumn = {};
            sortColumn[idName] = "1";
            findLimited(req, res, collection, idName, sortColumn);
        } catch (e) {
            if (handleError(res, e, null, "no results found")) {
                return;
            }
        }
    } else {
        var options = {
            "sort": idName
        }
        collection.find({ }, options, function(e,docs){
            res.json(docs)
        });
    }
});


if (isIdInteger) {
/*
 * GET model by id (integer)
 */
router.get('/'+typeMultiple+'/:id', function(req, res) {
    var db = req.db;
    var collection = db.get(typeMultiple);
    if (!isNumeric(req.params.id)) {
        return handleError(res,
            new RestApiError("400", 'id '+req.params.id+'is not numeric'));
    } else {
        var idToSearch = parseInt(req.params.id);
        collection.findOne({ id : idToSearch }, function(e,docs){
            if (handleError(res, e, docs, 'No '+type+' found with id '+idToSearch)) {
                return;
            }
            res.json(docs)
        });
    } 
});
    
} else {

/*
 * GET model by id (string)
 */
router.get('/'+typeMultiple+'/:id', function(req, res) {
    var db = req.db;
    var collection = db.get(typeMultiple);
    var idToSearch = req.params.id;
    if (idName == "_id") {
        collection.findOne({ _id : idToSearch }, function(e,docs){
            if (handleError(res, e, docs, 'No '+type+' found with _id '+idToSearch)) {
                return;
            }
            res.json(docs);
        });
    } else {
        collection.findOne({ id : idToSearch }, function(e,docs){
            if (handleError(res, e, docs, 'No '+type+' found with id '+idToSearch)) {
                return;
            }
            res.json(docs);
        });
    }
});
}

}


/************* end model **************************/


/************* start cars **************************/

registerModelAPIs('car', 'cars', 'id', true, true);

/************* end cars **************************/


/************* start trucks **************************/

registerModelAPIs('truck', 'trucks', 'id', true, true);

/************* end trucks **************************/


/************* start customers **************************/

registerModelAPIs('customer', 'customers', 'id', false, true);
router.get('/customers/:id/transactions', function(req, res) {
    var db = req.db;
    var collection = db.get('transactions');
    var idToSearch = req.params.id;
    var options = {
        "sort": "date"
    }

    collection.find({ customer : idToSearch }, options, function(e,docs){
        res.json(docs)
    });
});

router.get('/customers/:id/trips', function(req, res) {
    var db = req.db;
    var collection = db.get('trips');
    var idToSearch = req.params.id;
    var options = {
        "sort": "id"
    }

    collection.find({ }, options, function(e,docs){
        res.json(docs)
    });
});


router.get('/customers/search/byZip/:zip', function(req, res) {
    var db = req.db;
    var collection = db.get('customers');
    var options = {
        "sort": "id"
    }
    if (!isNumeric(req.params.zip)) {
        return handleError(res,
            new RestApiError("400", 'parameter zip '+req.params.zip+'is not numeric'));
    } else {
        var zipToSearch = parseInt(req.params.zip);
        findLimited(req, res, collection, "id", { zipCode : zipToSearch });
    } 
});

router.get('/customers/search/byName/:name', function(req, res) {
    var db = req.db;
    var collection = db.get('customers');
    var options = {
        "sort": "id"
    }
    var nameToSearch = req.params.name;
    if (isEmpty(nameToSearch)) {
        return handleError(res,
            new RestApiError("400", 'parameter name is empty'));
    } else if (isInvalidWildcard(nameToSearch)) {
        return handleError(res,
            new RestApiError("400", 'parameter name '+req.params.name+' is not a valid wildcard. Neither can contain a * nor a .'));
    } else {
        findLimited(req, res, collection, "id", 
            { $or: [
                { surname : {'$regex': nameToSearch } },
                { givenName : {'$regex': nameToSearch } }
            ]});
    }

});



router.get('/customers/search/byWord/:text', function(req, res) {
    var db = req.db;
    var collection = db.get('customers');
    var options = {
        "sort": "id"
    }
    var textToSearch = req.params.text;
    if (isEmpty(textToSearch)) {
        return handleError(res,
            new RestApiError("400", 'parameter text is empty'));
    } else if (isInvalidWildcard(textToSearch)) {
        return handleError(res,
            new RestApiError("400", 'parameter text '+req.params.name+' is not a valid wildcard. Neither can contain a * nor a .'));
    } else {
        findLimited(req, res, collection, "id", 
//            { "$text": { "$search": textToSearch } });
            { "$text": { 
                "$search": textToSearch,
                "$diacriticSensitive": true
             } });
    }
});


router.get('/customers/search/byQuery/:query/:sort', function(req, res) {
    var db = req.db;
    var collection = db.get('customers');
    var queryStringToSearch = req.params.query;
    var sortString = req.params.sort;
    if (isEmpty(queryStringToSearch)) {
            return handleError(res,
                new RestApiError("400", 'parameter query is empty'));
    } else if (isEmpty(sortString)) {
            return handleError(res,
                new RestApiError("400", 'parameter sort is empty'));
    } else {
        try {
            var queryToSearch = JSON.parse(queryStringToSearch);
            try {
                var sortToSearch = JSON.parse(sortString);
                findLimited(req, res, collection, "id", queryToSearch, sortToSearch);
            } catch (e) {
                return handleError(res,
                    new RestApiError("400", 'sort is not a valid JSON string <br>&nbsp;'+sortString));
            }
        } catch (e) {
            return handleError(res,
                new RestApiError("400", 'query is not a valid JSON string <br>&nbsp;'+queryStringToSearch));
        }
    }
});



router.get('/customers/search/near/:longitude,:latitude,:meter', function(req, res) {
    var db = req.db;
    var collection = db.get('customers');
    if (!isNumeric(req.params.longitude)) {
        return handleError(res,
            new RestApiError("400", 'longitude '+req.params.longitude+'is not numeric'));
    }
    if (!isNumeric(req.params.latitude)) {
        return handleError(res,
            new RestApiError("400", 'latitude '+req.params.latitude+'is not numeric'));
    }
    if (!isNumeric(req.params.meter)) {
        return handleError(res,
            new RestApiError("400", 'meter '+req.params.meter+'is not numeric'));
    }
    var longitudeSearch = parseFloat(req.params.longitude);
    var latitudeSearch = parseFloat(req.params.latitude);
    var meterSearch = parseInt(req.params.meter);

    var query = {
        "location" : {
            "$nearSphere" :
                {
                    "$geometry" : { 
                        "type" : "Point", 
                        "coordinates" : [ longitudeSearch, latitudeSearch ] },
                    "$maxDistance" : meterSearch
                }
       }
    };

    findLimited(req, res, collection, "id", query, {} );
});




/************* end customers **************************/

/************* start trips **************************/

registerModelAPIs('trip', 'trips', 'id', true, false);

/************* end trips **************************/

/************* start trips **************************/

registerModelAPIs('transaction', 'transactions', '_id', false, true);

/************* end trips **************************/

/************* start favorites **************************/

registerModelAPIs('category', 'categories', 'id', false, false);

router.get('/categories/:id/subcategories', function(req, res) {
    var db = req.db;
    var collection = db.get('categories');
    var idToSearch = req.params.id;
    var options = {
        "sort": "id"
    }
    collection.find({ parent : idToSearch}, options, function(e,docs){
        res.json(docs)
    });
});

registerModelAPIs('risk', 'risks', 'id', false, false);
router.get('/risks/:id/insuranceTypes', function(req, res) {
    var db = req.db;
    var collection = db.get('risks');
    var collectionI = db.get('insuranceTypes');
    var idToSearch = req.params.id;
    var options = {
        "sort": "id"
    }
    collection.findOne({ id : idToSearch}, options, function(e,docs){
        if (handleError(res, e, docs, 'No favorite found with id '+idToSearch)) {
            return;
        }
        collectionI.find({ lineOfBusiness : docs.lineOfBusiness}, options, function(e2,docs2){
            res.json(docs2)
        });
    });
});
registerModelAPIs('insuranceType', 'insuranceTypes', 'id', false, false);
registerModelAPIs('favorite', 'favorites', 'id', false, false);

router.get('/favorites/:id/category', function(req, res) {
    var db = req.db;
    var collection = db.get('favorites');
    var collectionC = db.get('categories');
    var idToSearch = req.params.id;
    var options = {
        "sort": "id"
    }
    collection.findOne({ id : idToSearch}, options, function(e,docs){
        if (handleError(res, e, docs, 'No favorite found with id '+idToSearch)) {
            return;
        }
        collectionC.findOne({ id : docs.category}, options, function(e2,docs2){
            res.json(docs2)
        });
    });
});


/************* end favorites **************************/
