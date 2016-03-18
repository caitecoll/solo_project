var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var app = express();
var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.get('/:id', function(req, res) {
  var results = [];

  var article = {
    id: req.params.id
  };

  pg.connect(connection, function (err, client, done) {
    var query = client.query('SELECT comments.comments, comments.comment_date, users.username FROM comments JOIN users ON ' +
      '(comments.admin_id = users.id) WHERE comments.dev_id = $1 OR comments.tech_id = $1',
      [article.id]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      client.end();
      return res.json(results);
    });

    if(err) {
      done();
      console.log(err);
    }
  });
});

//router.put('/:id', function(req, res) {
//
//  var newComment = {
//    id: req.params.id,
//    admin_id: req.body.admin_id,
//    comments: req.body.comments,
//    status: req.body.status,
//    date: 'now()'
//  };
//
//  if (newComment.id >= 5000) {
//
//    newComment.dev_id =  req.params.id;
//
//    pg.connect(connection, function(err, client, done) {
//      client.query('UPDATE developer_profiles SET status = ($1), last_modified = ($2) WHERE id = ($3)',
//        [newComment.status, newComment.date, newComment.dev_id],
//        function (err, result) {
//          if(err) {
//            console.log("Error inserting data: ", err);
//            res.send(false);
//          } else {
//            res.send(result);
//          }
//        });
//      done();
//    });
//
//  } else {
//
//    newComment.tech_id =  req.params.id;
//
//    pg.connect(connection, function(err, client, done) {
//      client.query('UPDATE tech_profiles SET status = ($1), last_modified = ($2) WHERE id = ($3)',
//        [newComment.status, newComment.date, newComment.tech_id],
//        function (err, result) {
//          if(err) {
//            console.log("Error inserting data: ", err);
//            res.send(false);
//          } else {
//            res.send(result);
//          }
//        });
//      done();
//    });
//  }
//
//});
//
//router.post('/:id', function(req, res) {
//
//  var newComment = {
//    id: req.params.id,
//    admin_id: req.body.admin_id,
//    comments: req.body.comments,
//    status: req.body.status,
//    date: 'now()'
//  };
//
//  if (newComment.id >= 5000) {
//
//    newComment.dev_id =  req.params.id;
//
//    pg.connect(connection, function(err, client, done) {
//      client.query("INSERT INTO comments (admin_id, dev_id, comments, comment_date) VALUES ($1, $2, $3, $4)",
//        [newComment.admin_id, newComment.dev_id, newComment.comments, newComment.date],
//        function (err, result) {
//          if(err) {
//            console.log("Error inserting data: ", err);
//            res.send(false);
//          } else {
//            res.send(result);
//          }
//        });
//      done();
//    });
//
//  } else {
//
//    newComment.tech_id =  req.params.id;
//
//    pg.connect(connection, function(err, client, done) {
//      client.query("INSERT INTO comments (admin_id, tech_id, comments, comment_date) VALUES ($1, $2, $3, $4)",
//        [newComment.admin_id, newComment.tech_id, newComment.comments, newComment.date],
//        function (err, result) {
//          if(err) {
//            console.log("Error inserting data: ", err);
//            res.send(false);
//          } else {
//            res.send(result);
//          }
//        });
//      done();
//    });
//  }
//
//});


module.exports = router;