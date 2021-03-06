var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var app = express();
var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req, res) {
  var results = [];
  pg.connect(connection, function (err, client, done) {
    var query = client.query("SELECT * FROM developer_profiles JOIN authors ON (developer_profiles.author_id = " +
      "authors.author_id) WHERE developer_profiles.status = 'Published' ORDER BY date_created desc");

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      client.end();
      return res.json(results);
    });

    if(err) {
      console.log(err);
    }
  });
});

router.get('/featured', function(req, res) {
  var results = [];
  pg.connect(connection, function (err, client, done) {
    var query = client.query('SELECT article_blurb, small_photo FROM developer_profiles WHERE featured = true');

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      client.end();
      return res.json(results);
    });

    if(err) {
      console.log(err);
    }
  });
});

router.post('/', function(req, res) {
  console.log(req.body);

  var newArticle = {
    article_title: req.body.title,
    article_blurb: req.body.blurb,
    author_id: req.body.author_id,
    content: req.body.content,
    date_created: 'now()',
    last_modified: 'now()',
    status: 'Awaiting Admin Review'
  };

  pg.connect(connection, function(err, client, done) {
    client.query("INSERT INTO developer_profiles (article_title, article_blurb, author_id, date_created, last_modified, " +
      "content, status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [newArticle.article_title, newArticle.article_blurb, newArticle.author_id, newArticle.date_created,
        newArticle.last_modified, newArticle.content, newArticle.status],
      function (err, result) {
        if(err) {
          console.log("Error inserting data: ", err);
          res.send(false);
        } else {
          res.send(result);
        }
      });
    done();
  });
});

router.put('/revise', function(req, res) {
  console.log(req.body);

  var revisedArticle = {
    article_title: req.body.title,
    article_blurb: req.body.blurb,
    content: req.body.content,
    id: req.body.article_id,
    last_modified: 'now()',
    status: 'Awaiting Admin Review'
  };

  pg.connect(connection, function(err, client, done) {
    client.query("UPDATE developer_profiles (article_title, article_blurb, last_modified, " +
      "content, status) VALUES ($1, $2, $3, $4, $5) WHERE id = $6",
      [revisedArticle.article_title, revisedArticle.article_blurb, revisedArticle.last_modified,
        revisedArticle.content, revisedArticle.status, revisedArticle.id],
      function (err, result) {
        if(err) {
          console.log("Error inserting data: ", err);
          res.send(false);
        } else {
          res.send(result);
        }
      });
    done();
  });
});

module.exports = router;