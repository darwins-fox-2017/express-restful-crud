"use strict"
var express = require('express');
var router = express.Router();
let db = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Todo.findAll({ include: [{model: db.User}] }).then(function(result) {
    res.render('index', { todosFromRouter: result });
  })
});

// ADD
router.get('/add', function(req, res, next) {
  db.User.findAll().then(function(result) {
    res.render('add', { userFromRouter: result });
  })
});

router.post('/add', function(req, res, next) {
  // masukkan data yang di input ke dalam database
  let task = req.body.task;
  let id = req.body.email;
  db.Todo.create({title: task, UserId: id, is_complete: false }).then(function(result) {
    // setelah selesai insert data, render halaman kembali ke index
    res.redirect('/')
    console.log(`data berhasil diasukkan`);
  })
});

// DELETE
router.post('/:userId/delete', function(req, res, next) {
  let id = req.params.userId;
  db.Todo.findById(id).then(function(result) {
    return result.destroy().then(function() {
      res.redirect('/')
    })
  })
});

// UPDATE
router.get('/update', function(req, res, next) {
  let id = req.params.userId;
  res.render('update', { userFromRouter: result });
});

router.post('/:userId/update', function(req, res, next) {
    let id = req.params.userId;
    db.User.findAll().then(function(result) {
      res.render('update', { userFromRouter: result, userId: id });
    })
});

// jalankan router dari form update
router.post('/update', function(req, res, next) {
    console.log(req.body.task);
    console.log(req.body.numberId);
    db.Todo.findById(req.body.numberId).then(function(result) {
      return result.update({ title: req.body.task, UserId: req.body.email }).then(function() {
        res.redirect('/')
      })
    })
});

// COMPLETED
router.post('/:userId/complete', function(req, res, next) {
  let id = req.params.userId;
  console.log(id);
  db.Todo.findById(id).then(function(result) {
    return result.update({ is_complete: true }).then(function() {
      res.redirect('/')
    })
  })
});

module.exports = router;
