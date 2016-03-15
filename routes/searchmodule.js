/**
 * Created by cecollins on 3/9/16.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var app = express();
var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.get('/:query', function(req, res) {
  var results = [];

  var mySearch = {
    search: '% ' + req.params.query + '%'
  };

  pg.connect(connection, function (err, client, done) {
    var query = client.query("SELECT article_title, id FROM tech_profiles WHERE article_title ILIKE $1 OR article_blurb ILIKE $1 " +
      "OR nj_what ILIKE $1 OR nj_why ILIKE $1 OR nj_how_new_dev ILIKE $1 OR nj_how_exp_dev ILIKE $1 OR nj_how_sr_dev ILIKE $1 OR " +
      "nj_controversy ILIKE $1 OR j_what ILIKE $1 OR j_why ILIKE $1 OR j_how_new_dev ILIKE $1 OR j_how_exp_dev ILIKE $1 OR " +
      "j_how_sr_dev ILIKE $1 OR j_controversy ILIKE $1 OR terms ILIKE $1;" ,
      [mySearch.search]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      var query2 = client.query("SELECT article_title, id FROM developer_profiles WHERE article_title ILIKE $1 OR article_blurb " +
        "ILIKE $1 OR content ILIKE $1;",
        [mySearch.search]);

      query2.on('row', function(row) {
        results.push(row);
      });

      query2.on('end', function() {
        client.end();
        return res.json(results);
      });
    });

    if(err) {
      done();
      console.log(err);
    }
  });
});

module.exports = router;

