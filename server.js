var express = require('express');
var exhbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');

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

//db connection
mongoose.connect('mongodb://localhost/testDB');

//routes
app.use(require('./routes/htmlRoutes'));
app.use(require('./routes/apiRoutes'));
app.use(require('./routes/scrapeRoutes'));

//testing route
app.get('/testdb', function(req, res) {
  var url = 'https://news.artnet.com/art-world';
  request(url, function(err, resp, body) {
    var $ = cheerio.load(body);
    var articles = $('.media');//array
    articles.each(function(i, article) {
      console.log($(article).find('.teaser-title').text());
      db.Article.create({headline: $(article).find('.teaser-title').text()});
    });
    
    res.end('butter');
  });
 
});

app.listen(PORT, function() {
  console.log('app listening on port: ' + PORT);
});
