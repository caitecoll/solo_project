var express = require('express');
var router = express.Router();
var passport = require('passport');

// Handles login form POST from login.html
router.post('/',
    passport.authenticate('local', {
        successRedirect: 'admin.html#/allarticles',
        failureRedirect: '/views/failure.html'
    })
);

module.exports = router;