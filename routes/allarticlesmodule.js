var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var app = express();
var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.get('/alltech', function(req, res) {
  var results = [];

  pg.connect(connection, function (err, client, done) {
    var query = client.query('SELECT * FROM tech_profiles JOIN authors ON (tech_profiles.author_id = authors.author_id) ' +
      'ORDER BY status desc');

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

router.get('/alldev', function(req, res) {
  var results = [];

  pg.connect(connection, function (err, client, done) {
    var query = client.query('SELECT * FROM developer_profiles JOIN authors ON (developer_profiles.author_id = authors.author_id) ' +
      'ORDER BY status desc');

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

router.get('/mydev/:id', function(req, res) {
  var results = [];

  var author = {
    id: req.params.id
  }

  pg.connect(connection, function (err, client, done) {
    var query = client.query('SELECT * FROM developer_profiles JOIN authors ON (developer_profiles.author_id = authors.author_id) ' +
      'WHERE developer_profiles.author_id = $1 ORDER BY status desc', [author.id]);

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

router.get('/mytech/:id', function(req, res) {
  var results = [];

  var author = {
    id: req.params.id
  }

  pg.connect(connection, function (err, client, done) {
    var query = client.query('SELECT * FROM tech_profiles JOIN authors ON (tech_profiles.author_id = authors.author_id) ' +
      'WHERE tech_profiles.author_id = $1 ORDER BY status desc', [author.id]);

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

router.put('/devchange/:id', function(req, res){
  console.log(req.body);

  var newStatus = {
    status: req.body.postStatus,
    id: req.params.id
  };

  pg.connect(connection, function(err, client, done) {
    client.query('UPDATE developer_profiles SET status = ($1) WHERE id = ($2)',
      [newStatus.status, newStatus.id],
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

router.put('/techchange/:id', function(req, res){
  console.log(req.body);

  var newStatus = {
    status: req.body.postStatus,
    id: req.params.id
  };

  pg.connect(connection, function(err, client, done) {
    client.query('UPDATE tech_profiles SET status = ($1) WHERE id = ($2)',
      [newStatus.status, newStatus.id],
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
