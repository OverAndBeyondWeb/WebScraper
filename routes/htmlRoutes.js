var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('<h1>Page 1</h1>');
});

router.get('/page2', function(req, res) {
  res.send('<h1>Page 2</h1>');
});




module.exports = router;