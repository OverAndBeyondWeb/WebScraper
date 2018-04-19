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
      db.Article.create({
        headline: $(article).find('.teaser-title').text(),
        summary: $(article).find('.teaser-blurb').text(),
        url: $(article).find('a').attr('href')
      });
      data.push({headline: $(article).find('a').attr('href')});
    });
    
    res.json(data);
  });
 
});

module.exports = router;