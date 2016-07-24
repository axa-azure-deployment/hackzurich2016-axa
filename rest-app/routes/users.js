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
