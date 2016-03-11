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

router.get('/:query', function(req, res) {
  var results = [];

  var mySearch = {
    search: '%' + req.params.query + '%'
  };

  pg.connect(connectionString, function (err, client, done) {
    var query = client.query("SELECT article_title FROM tech_profiles WHERE article_title ILIKE $1",
      [mySearch.search]);

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