var express = require('express');
var router = express.Router();
var passport = require('passport');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
    console.log('This is the user:', req.user);
    var user = req.user;
    if(req.isAuthenticated()) {
        // send back user object from database
        console.log('user.js get: sending back user', user);
        res.send(user);
    } else {
        // failure best handled on the server. do redirect here.
        res.send(401);
    }
});

//router.get('/admin', function(req, res) {
//    if(req.body.role == 'admin') {
//        // check if admin
//        res.send(req.user);
//    } else {
//        // not sure what to do here?
//        res.send(false);
//    }
//});


module.exports = router;