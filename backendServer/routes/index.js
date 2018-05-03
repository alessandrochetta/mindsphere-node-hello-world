var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/appapi/test', function(req, res, next) {
  res.send("Hi, it's MindSphere");
});

module.exports = router;
