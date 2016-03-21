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
    var query = client.query("SELECT * FROM tech_profiles JOIN authors ON (tech_profiles.author_id = authors.author_id) " +
      "WHERE tech_profiles.status = 'Published' ORDER BY date_created desc");

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
    var query = client.query('SELECT article_blurb, small_photo FROM tech_profiles WHERE featured = true');

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
    date_created: 'now()',
    last_modified: 'now()',
    nj_what: req.body.nj_what,
    nj_why: req.body.nj_why,
    nj_how_new_dev: req.body.nj_how_new_dev,
    nj_how_exp_dev: req.body.nj_how_exp_dev,
    nj_how_sr_dev: req.body.nj_how_sr_dev,
    nj_controversy: req.body.nj_controversy,
    j_what: req.body.j_what,
    j_why: req.body.j_why,
    j_how_new_dev: req.body.j_how_new_dev,
    j_how_exp_dev: req.body.j_how_exp_dev,
    j_how_sr_dev: req.body.j_how_sr_dev,
    j_controversy: req.body.j_controversy,
    terms: req.body.terms,
    additional_resources:req.body.additional_resources,
    status: 'Awaiting Admin Approval'
  };

  pg.connect(connection, function(err, client, done) {
    client.query("INSERT INTO tech_profiles (article_title, article_blurb, author_id, date_created, last_modified, nj_what, " +
      "nj_why, nj_how_new_dev, nj_how_exp_dev, nj_how_sr_dev, nj_controversy, j_what, j_why, j_how_new_dev, j_how_exp_dev" +
      ", j_how_sr_dev, j_controversy, terms, additional_resources, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10" +
      ", $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)",
      [newArticle.article_title, newArticle.article_blurb, newArticle.author_id, newArticle.date_created, newArticle.last_modified,
        newArticle.nj_what, newArticle.nj_why, newArticle.nj_how_new_dev, newArticle.nj_how_exp_dev, newArticle.nj_how_sr_dev,
        newArticle.nj_controversy, newArticle.j_what, newArticle.j_why, newArticle.j_how_new_dev, newArticle.j_how_exp_dev,
        newArticle.j_how_sr_dev, newArticle.j_controversy, newArticle.terms, newArticle.additional_resources, newArticle.status],
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
    id: req.body.article_id,
    last_modified: 'now()',
    nj_what: req.body.nj_what,
    nj_why: req.body.nj_why,
    nj_how_new_dev: req.body.nj_how_new_dev,
    nj_how_exp_dev: req.body.nj_how_exp_dev,
    nj_how_sr_dev: req.body.nj_how_sr_dev,
    nj_controversy: req.body.nj_controversy,
    j_what: req.body.j_what,
    j_why: req.body.j_why,
    j_how_new_dev: req.body.j_how_new_dev,
    j_how_exp_dev: req.body.j_how_exp_dev,
    j_how_sr_dev: req.body.j_how_sr_dev,
    j_controversy: req.body.j_controversy,
    terms: req.body.terms,
    additional_resources:req.body.additional_resources,
    status: 'Awaiting Admin Approval'
  };

  pg.connect(connection, function(err, client, done) {
    client.query("UPDATE tech_profiles (article_title, article_blurb, last_modified, nj_what, " +
      "nj_why, nj_how_new_dev, nj_how_exp_dev, nj_how_sr_dev, nj_controversy, j_what, j_why, j_how_new_dev, j_how_exp_dev" +
      ", j_how_sr_dev, j_controversy, terms, additional_resources, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10" +
      ", $11, $12, $13, $14, $15, $16, $17, $18) WHERE id = $19",
      [revisedArticle.article_title, revisedArticle.article_blurb, revisedArticle.last_modified,
        revisedArticle.nj_what, revisedArticle.nj_why, revisedArticle.nj_how_new_dev, revisedArticle.nj_how_exp_dev, revisedArticle.nj_how_sr_dev,
        revisedArticle.nj_controversy, revisedArticle.j_what, revisedArticle.j_why, revisedArticle.j_how_new_dev, revisedArticle.j_how_exp_dev,
        revisedArticle.j_how_sr_dev, revisedArticle.j_controversy, revisedArticle.terms, revisedArticle.additional_resources,
        revisedArticle.status, revisedArticle.id],
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