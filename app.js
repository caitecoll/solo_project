var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var passport = require('./strategies/user.js');
var session = require('express-session');

var login = require('./routes/login');
var user = require('./routes/user');
var register = require('./routes/register');

var devModule = require('./routes/devmodule');
var techModule = require('./routes/techmodule');
var searchModule = require('./routes/searchmodule');
var articleModule = require('./routes/articlemodule');
var allArticlesModule = require('./routes/allarticlesmodule');
var logout = require('./routes/logout');
var review = require('./routes/reviewmodule');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration //
app.use(session({
  secret: 'secret',
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', register);
app.use('/user', user);
app.use('/', login);
app.use('/devprof', devModule);
app.use('/techprof', techModule);
app.use('/search', searchModule);
app.use('/article', articleModule);
app.use('/allarticles', allArticlesModule);
app.use('/logout',logout);
app.use('/review',review);

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

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});
