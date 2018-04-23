var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/saved-articles', function(req, res) {
  res.render('saved-articles');
});

router.get('/saved-articles/:id', function(req, res) {
  db.Article.findOne({_id: req.params.id})
    .populate('comments')
    .then(function(article) {
       res.render('article', {
         article: article
       });
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;