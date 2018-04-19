var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var db = require('../models');

router.post('/scrape', function(req, res) {
  var url = 'https://news.artnet.com/art-world';
  request(url, function(err, resp, body) {
    var $ = cheerio.load(body);
    var articles = $('.media');//array
    var data = [];
    articles.each(function(i, article) {
      console.log($(article).find('.teaser-title').text());
     
      db.Article.create({headline: $(article).find('.teaser-title').text()});
      data.push({headline: $(article).find('.teaser-title').text()});
    });
    
    res.json(data);
  });
 
});

module.exports = router;