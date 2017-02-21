var express = require('express');
var router = express.Router();

let db = require('../models')
let faker = require('faker')

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.User.findAll({
    include : [
      db.Todo
    ]
  }).then(users => {
    res.render('users/index', {result: JSON.stringify(users)})
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

router.post('/:id/update', function(req, res, next){
  db.User.update({
    name: req.body.name,
    email: req.body.email
  },{
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/users')
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
    where: {
      id: req.params.id
    }
  }).then(function(user){
    res.render('users/edit', {user: user})
  })
})

router.get('/seed/:amont', function(req, res, next){
  for (let i = 0; i < req.params.amont; i++) {
    db.User.create({
      name: faker.name.findName(),
      email: faker.internet.email()
    })
  }
  res.redirect('/users')
})


router.get('/testing', function(req, res, next){
  db.User.findAll().then(users => {
    res.send('fjashf dfjdshf dskjf dsj dfsjfhsjf ', users)
    // res.render('users/index', {result: users})
  })
})

module.exports = router;
