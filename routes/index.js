var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Memo.findAll().then(function(memos) {
    res.render('index', { title: 'Express',memo: memos });
  })
});

module.exports = router;
