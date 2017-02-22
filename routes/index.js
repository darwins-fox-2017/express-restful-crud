let models = require('../models')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/viewer', function(req, res, next) {
  models.User.findAll().then(function(Users) {
    models.Todo.findAll({
      include: models.User
    }).then(function(Todos) {
    res.render('viewer', { title: 'Viewer', Users: Users, Todos: Todos});
  }).catch(function(err) {
    console.log(err)
  })
})
})

router.post('/viewer', function(req, res, next) {
  models.User.create(req.body).then(function() {
    res.redirect('/viewer')
  }).catch(function(err) {
    res.render('viewer', {msg: `${req.body.email} email validation is failed`, title: 'Viewer', err:err.message})
  })
})

router.post('/todo', function(req, res, next) {
  models.Todo.create(req.body).then(function() {
    res.redirect('/viewer')
  }).catch(function(err) {
    res.render('viewer', {msg: `Error mas bro..`, title: 'Viewer'})
  })
})

router.get('/todo/:id/edit', function(req, res, next) {
  models.Todo.findById(req.params.id).then(function(Todo) {
    models.User.findAll().then(function(Users) {
      res.render('edit-todo', {Todo: Todo, Users: Users})
    })
  })
})

router.get('/todo/:id/complete', function(req, res, next) {
  models.Todo.update({is_complete: true}, {where: {id: req.params.id}}).then(function() {
    res.redirect('/viewer')
  }).catch(function(err) {
    res.render('viewer', {msg: `Mark complete failed`, title: 'Viewer'})
  })
})

router.post('/todo/update', function(req, res, next) {
  models.Todo.update({title : req.body.title, is_complete:req.body.is_complete, UserId: req.body.UserId},
    {where: {id: req.body.id}
  }).then(function() {
    res.redirect('/viewer')
  }).catch(function(err) {
    res.render('viewer', {msg: `Update failed`, title: 'Viewer'})
  })
})

router.get('/todo/:id/delete', function(req, res, next) {
  models.Todo.destroy({
    where: {id: req.params.id}
  }).then(function() {
    res.redirect('/viewer')
  }).catch(function(err) {
    res.render('viewer', {msg: `Delete failed`, title: 'Viewer'})
  })
})


module.exports = router;
