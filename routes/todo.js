'use strict'
var express = require('express');
var router = express.Router();
let db = require('../models')

/* GET users listing. */
// TODO
  router.get('/', function(req, res, next) {
    db.Todo.findAll({
      include: [{model: db.User}]
      ,order: '"id" ASC'
    }).then(function(result) {
      res.render('todo/index.ejs', { allTodoList: result });
    })
  });

// ADD fitur
// NEW
  router.get('/new', function(req, res, next) {
    db.User.findAll().then(function(result) {
      res.render('todo/new.ejs', { allTodoList: result });
    })
  });

  router.post('/new', function(req, res, next) {
    db.Todo.create({title: req.body.task, UserId: req.body.email, is_complete: req.body.is_complete }).then(function(result) {
      // setelah selesai insert data, render halaman kembali ke index
      res.redirect('/todo')
      console.log(`data berhasil diasukkan`);
    })
  });

// DELETE fitur
// DELETE
  router.get('/:todoId/delete', function(req, res, next) {
    db.Todo.findById(req.params.todoId).then(function(result) {
      return result.destroy().then(function() {
        res.redirect('/todo')
      })
    })
  });

// COMPLETED fitur
// COMPLETE
  router.get('/:todoId/complete', function(req, res, next) {
    db.Todo.findById(req.params.todoId).then(function(result) {
      return result.update({ is_complete: true }).then(function() {
        res.redirect('/todo')
      })
    })
  });

// UPDATE fitur
// UPDATE
  router.get('/:todoId/update', function(req, res, next) {
    db.Todo.findById(req.params.todoId).then(function(result_todo) {
      db.User.findAll().then(function(result_user) {
        res.render('todo/update.ejs', { allTodoList: result_todo, allEmail: result_user  });
      })
    })
  });

  router.post('/:todoId/update', function(req, res, next) {
    db.Todo.findById(req.params.todoId).then(function(result) {
      return result.update({ title: req.body.task, is_complete: req.body.is_complete, UserId: req.body.email }).then(function() {
        res.redirect('/todo')
      })
    })
    // console.log(`-------------------------- todo id `  + req.params.todoId);
    // console.log(`-------------------------- title `  + req.body.task);
    // console.log(`-------------------------- user id `  + req.body.email);
    // console.log(`-------------------------- sudah selesai? `  + req.body.is_complete);
  });


// klo pakai '=' => itu query string
// klo pakai ':' => itu parameter


module.exports = router;
