var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res){
  console.log(req.user);
  req.logout();
  res.sendStatus(200);
});

module.exports = router;