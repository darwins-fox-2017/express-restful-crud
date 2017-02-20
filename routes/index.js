var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'TODOS' });
// });

router.get('/', function(req, res, next) {
  db.Todo.findAll( {include: db.User}).then(function (result) {
    res.render('index', { title:'TODOLIST', todo: result });
    // console.log(result);
  })
});

router.get('/add', function(req, res, next) {
  db.Todo.findAll( {include: db.User}).then(function (result) {
    res.render('add', { title:'ADD TODO LIST', todo: result });
  })
});

router.post('/add', function(req, res, next) {
  db.Todo.create({
    title: req.body.title,
    is_complete: req.body.isComplete,
    UserId: req.body.UserId
  }).then(function(result) {
    res.redirect('/')
  })
});

module.exports = router;
