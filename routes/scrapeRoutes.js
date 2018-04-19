var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var db = require('../models');

router.get('/scrape', function(req, res) {
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

module.exports = router;