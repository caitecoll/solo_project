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

router.get('/:id', function(req, res) {
  var results = [];

  var article = {
    id: req.params.id
  };

  pg.connect(connectionString, function (err, client, done) {
    var query = client.query('SELECT * FROM tech_profiles JOIN authors ON (tech_profiles.author_id = authors.author_id) WHERE ' +
      'tech_profiles.id = $1',
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

router.get('/dev/:id', function(req, res) {
  var results = [];

  var article = {
    id: req.params.id
  };

  pg.connect(connectionString, function (err, client, done) {
    var query = client.query('SELECT * FROM developer_profiles JOIN authors ON (developer_profiles.author_id = authors.author_id)' +
      ' WHERE developer_profiles.id = $1',
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



module.exports = router;