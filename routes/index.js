var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'TODOS' });
// });

router.get('/', function(req, res, next) {
  db.Todo.findAll( {include: db.User}).then(function (result) {
      res.render('index', {title: 'Todo List', todo: result})
  })
});

router.get('/add', function(req, res, next) {
  db.User.findAll({raw: true}).then(function (data) {
    res.render('add', { title:'ADD TODO LIST', users: data });
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

router.get('/update/:id', function(req, res, next) {
  db.User.findAll({raw: true}).then(function (data) {
    db.Todo.findById(req.params.id).then(function (result) {
      res.render('update', { title:'UPDATE TODO LIST', todo: result, users: data });
    })
  })
});

router.post('/update/:id', function (req, res, next) {
  db.Todo.findById(req.params.id).then(function (result) {
    result.update({
      title: req.body.title,
      is_complete: req.body.isComplete,
      email: req.body.email
    }).then(function () {
      res.redirect('/')
    })
  })
})

router.get('/delete/:id', function(req, res, next) {
  db.Todo.destroy({
    where: {
      id: req.params.id
    }
  })
  res.redirect('/')
})

module.exports = router;