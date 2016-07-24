var express = require('express');
var router = express.Router();

module.exports = router;

/************* start users **************************/
/*
 * GET userlist.
 */
router.get('/users', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * GET user.
 */
router.get('/users/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToSearch = req.params.id;
    collection.find({ '_id' : userToSearch},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * POST to adduser.
 */
router.post('/users', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/users/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/************* end users **************************/

/************* start cars **************************/


/*
 * GET cars.
 */
router.get('/cars', function(req, res) {
    var db = req.db;
    var collection = db.get('cars');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});



/*
 * GET cars.
 */
router.get('/trucks', function(req, res) {
    var db = req.db;
    var collection = db.get('trucks');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/************* end cars **************************/



/************* start customers **************************/


/*
 * GET customers.
 */
router.get('/customers', function(req, res) {
    var db = req.db;
    var limit = req.param('limit');
    var skip = req.param('skip');
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
    var options = {
        "limit": limit,
        "skip": skip,
        "sort": "id"
    }
    var collection = db.get('customers');
    collection.find( {}, options, function(e,docs){
        res.json(docs);
    });
});





/************* end customers **************************/
