var express = require('express');
var router = express.Router();
var passport = require('passport');
 //var Users = require('../models/user');
var path = require('path');

// module with bcrypt functions
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

// Handles request for HTML file
//router.get('/', function(req, res, next) {
//    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
//});

// Handles POST request with new user data
router.post('/', function(req, res, next) {

  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    author_id: req.body.author_id,
    role: req.body.role
  };
  console.log('new user:', saveUser);

  pg.connect(connection, function(err, client, done) {
    client.query("INSERT INTO users (username, password, author_id, role) VALUES ($1, $2, $3, $4) RETURNING id",
      [saveUser.username, saveUser.password, saveUser.author_id, saveUser.role],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.redirect('/admin.html#/allarticles');
          }
        });
  });

});


module.exports = router;
