var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.Memo.findAll().then(function(data){
  res.render('index', {title : "Memo", memos : data});
  })
});
router.get('/new', function(req, res, next) {
  res.render('new', {title : "ADD NEW DATA"})
  })

router.post('/', function(req, res, next){
  // res.render('users', {title : "Memo", text : req.body})
  db.Memo.create(req.body).then(function(data){
    res.redirect('memos')
  }).catch(function(err){
    res.redirect('memos')
  })
})

module.exports = router;
