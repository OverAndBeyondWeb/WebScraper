var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/api/saved-articles', function(req, res) {
  db.Article.find({}).then(function(articles) {
    res.json(articles);
  })
  .catch(function(err) {
    console.log(err);
  });
  
});

router.get('/api/saved-articles/:id', function(req, res) {
  db.Article.findOne({_id: req.params.id})
    .populate('comment')
    .then(function(article) {
      console.log(article);
       res.json(article);
    })
    .catch(function(err) {
      res.json(err);
    });
 
});




module.exports = router;