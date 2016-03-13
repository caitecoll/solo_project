/**
 * Created by cecollins on 3/9/16.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var app = express();
var connectionString = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if (process.env.DATABASE_URL !== undefined) {
  connectionString = process.env.DATABASE_URL + 'ssl';
} else {
  connectionString = 'postgres://localhost:5432/SoloProject';
}

router.get('/', function(req, res) {
  var results = [];
  pg.connect(connectionString, function (err, client, done) {
    var query = client.query('SELECT * FROM developer_profiles JOIN authors ON (developer_profiles.author_id = authors.author_id) ORDER BY date_created desc');

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
  pg.connect(connectionString, function (err, client, done) {
    var query = client.query('SELECT article_title, article_blurb FROM developer_profiles WHERE featured = true');

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

module.exports = router;