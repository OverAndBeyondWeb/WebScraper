var express = require('express');
var router = express.Router();

router.get('/api', function(req, res) {
  var obj = {
    route: 'api',
    page: 'page 1'
  }
  res.json(obj);
});

router.get('/api/page2', function(req, res) {
  var obj = {
    route: 'api',
    page: 'page 2'
  }
  res.json(obj);
});




module.exports = router;