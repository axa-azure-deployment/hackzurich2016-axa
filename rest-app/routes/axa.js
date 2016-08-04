var express = require('express');
var querystring = require('querystring');
var url = require('url');

var router = express.Router();

module.exports = router;

/************* start model **************************/

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

function registerModelAPIs(type, typeMultiple, idName, isIdInteger, hasLimitCollection) {
if (isIdInteger === undefined) isIdInteger = false; // default string

/*
 * GET models.
 */
router.get('/'+typeMultiple, function(req, res) {
    var db = req.db;
    var collection = db.get(typeMultiple);
    var options = {
        "sort": idName
    }
    if (hasLimitCollection) {
        var limit = parseInt(req.param('limit'));
        var skip = parseInt(req.param('skip')); 
        if (!limit) { 
            limit = 20; 
            console.log("no limit - use 20 as limit");
        }
        if (limit > 100 || limit < -100 ) {
            throw new Error('limit <'+limit+'> is too high. Use skip & limit to get data');
        }
        if (!skip) { 
            skip = 0; 
        }
        options = {
            "limit": limit,
            "skip": skip,
            "sort": idName
        }
    }
    collection.count({}, function (e1, count) {
        collection.find({}, options, function(e, docs){
            if (hasLimitCollection) {
                var lastSkip = (Math.floor(count / limit)) * limit;
                if (lastSkip == count) { lastSkip = lastSkip - limit; }
                var prevSkip = skip - limit;
                var nextSkip = skip + limit;
                res.json({
                    "links" : {
                        "cur" : linkURL(req, skip, limit, count, true),
                        "first" : linkURL(req, 0, limit, count, true),
                        "prev" : linkURL(req, prevSkip, limit, count, false),
                        "next" : linkURL(req, nextSkip, limit, count, false),
                        "last" : linkURL(req, lastSkip, limit, count, true),
                        "count" : docs.length,
                        "totalCount" : count
                    },
                    "data" : docs
                })
            } else {
                res.json(docs);
            }
        });
    });

    
});


if (isIdInteger) {
/*
 * GET model by id (integer)
 */
router.get('/'+typeMultiple+'/:id', function(req, res) {
    var db = req.db;
    var collection = db.get(typeMultiple);
    if (!isNumeric(req.params.id)) {
        res.status(404).send('id '+req.params.id+'is not numeric');
    } else {
        var idToSearch = parseInt(req.params.id);
        collection.findOne({ id : idToSearch }, function(e,docs){
            if (e || !docs) {
                res.status(404).send('No '+type+' found with id '+idToSearch);
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
            if (e || !docs) {
                res.status(404).send('No '+type+' found with id '+idToSearch);
                return;
            }
            res.json(docs);
        });
    } else {
        collection.findOne({ id : idToSearch }, function(e,docs){
            if (e || !docs) {
                res.status(404).send('No '+type+' found with id '+idToSearch);
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

registerModelAPIs('car', 'cars', 'id', true, false);

/************* end cars **************************/


/************* start trucks **************************/

registerModelAPIs('truck', 'trucks', 'id', true, false);

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


router.get('/customers/search/zipCode/:zip', function(req, res) {
    var db = req.db;
    var collection = db.get('customers');
    var options = {
        "sort": "id"
    }
    if (!isNumeric(req.params.zip)) {
        res.status(404).send('zipCode '+req.params.zip+'is not numeric');
    } else {
        var zipToSearch = parseInt(req.params.zip);
        collection.find({ zipCode : zipToSearch }, function(e,docs){
            if (e || !docs) {
                res.status(404).send('No '+type+' found with id '+idToSearch);
                return;
            }
            res.json(docs)
        });
    } 
});

router.get('/customers/search/byName/:name', function(req, res) {
    var db = req.db;
    var collection = db.get('customers');
    var options = {
        "sort": "id"
    }
    var nameToSearch = req.params.name;
    collection.find( { $or: [
            { surname : {'$regex': nameToSearch } },
            { givenName : {'$regex': nameToSearch } }
        ]}, function(e,docs){
        if (e || !docs) {
            res.status(404).send('No customer found with name '+nameToSearch);
            return;
        }
        res.json(docs)
    });
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
        if (e || !docs) {
                res.status(404).send('No favorite found with id '+idToSearch);
                return;
            }
            console.log(docs.category);
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
        if (e || !docs) {
                res.status(404).send('No favorite found with id '+idToSearch);
                return;
            }
            console.log(docs.category);
            collectionC.findOne({ id : docs.category}, options, function(e2,docs2){
                res.json(docs2)
            });
    });
});


/************* end favorites **************************/
