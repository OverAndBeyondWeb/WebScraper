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
      
      data.push({
        headline: $(article).find('.teaser-title').text(),
        summary: $(article).find('.teaser-blurb').text(),
        url: $(article).find('a').attr('href')
      });
    });
    
    res.json(data);
  });
 
});

router.post('/saved-articles', function(req, res) {
  db.Article.create(req.body);
});

router.delete('/delete-article/:id', function(req, res) {
  db.Article.findByIdAndRemove( req.params.id, function() {
    res.send('deleted');
  })
});

router.post('/note', function(req, res) {
  console.log(req.body.id);
  db.Comment.create({title: req.body.title, body: req.body.comment})
    .then(function(comment) {
      console.log(comment);
      return db.Article.findOneAndUpdate({_id: req.body.id}, {$push: {comments: comment._id}}, {new: true});
    })
    .then(function(article) {
      console.log(article);
    });

  res.end();
});

module.exports = router;