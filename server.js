var express = require('express');
var exhbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');

var PORT = process.env.PORT || 3000;

var app = express();
//static assets
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//handlebars
app.engine('handlebars', exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//routes
app.get('/', function(req, res) {
  res.render('index');
});

app.listen(PORT, function() {
  console.log('app listening on port: ' + PORT);
});
