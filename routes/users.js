var express = require('express');
var router = express.Router();

let db = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.User.findAll().then(users => {
    res.render('users/index', {result: users})
  })
  // res.send('respond with a resource');
});

router.get('/create', function(req, res, next){
  res.render('users/create')
})

router.post('/create', function(req, res, next){
  db.User.create({
    name: req.body.name,
    email: req.body.email
  })
  res.redirect('/users')
})

router.post('/update', function(req, res, next){
  let update = req.body
  db.User.find({
    where: {
      id: req.params.id
    }
  }).then(user => {
    return updateAttributes(update)
  })
})

router.get('/:id/delete', function(req, res, next){
  db.User.destroy({
    where: {
      id : req.params.id
    }
  }).then(() => {
    res.redirect('/users')

  })
})

router.get('/:id', function(req, res, next){
  db.User.find({
    where : {
      id: req.params.id
    }
  }).then(user => {
    res.render('users/show', {user: user})
  })
})

router.get('/:id/edit', function(req, res, next){
  db.User.find({
    where : {
      id: req.params.id
    }
  }).then(user => {
    res.render('users/edit', {user: user})
  })
})

router.get('/seed/:amont', function(req, res, next){
    db.User.create({})
})

module.exports = router;
