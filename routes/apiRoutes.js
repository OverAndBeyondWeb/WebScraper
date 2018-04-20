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

router.get('/api/page2', function(req, res) {
  var obj = {
    route: 'api',
    page: 'page 2'
  }
  res.json(obj);
});




module.exports = router;