var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var devModule = require('./routes/devmodule');
var techModule = require('./routes/techmodule');
var searchModule = require('./routes/searchmodule');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/devprof', devModule);
app.use('/techprof', techModule);
app.use('/search', searchModule);

app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});
