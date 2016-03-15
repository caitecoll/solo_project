var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var devModule = require('./routes/devmodule');
var techModule = require('./routes/techmodule');
var searchModule = require('./routes/searchmodule');
var articleModule = require('./routes/articlemodule');
var allArticlesModule = require('./routes/allarticlesmodule');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/devprof', devModule);
app.use('/techprof', techModule);
app.use('/search', searchModule);
app.use('/article', articleModule);
app.use('/allarticles', allArticlesModule);

app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/views/admin_templates'));
app.use(express.static('public/views/templates'));
app.use(express.static('public/img'));
app.use(express.static('public/sass_styles/css_files'));
app.use(express.static('public/scripts'));
app.use(express.static('public/scripts/admincontrollers'));
app.use(express.static('public/scripts/controllers'));
app.use(express.static('public/scripts/factories'));
app.use(express.static('public/vendors'));

//app.get('/*', function(req, res) {
//  var file = req.params[0] || '/views/index.html';
//  res.sendFile(path.join(__dirname, './public', file));
//});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});
