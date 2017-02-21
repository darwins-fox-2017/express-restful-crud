var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.User.findAll({raw: true}).then(function (data) {
    res.render('users/index', { title:'USER LIST', users: data });
  })
});

router.get('/add', function(req, res, next) {
  db.User.findAll({raw: true}).then(function (data) {
    res.render('users/add', { title:'ADD USER', users: data});
  })
});

router.post('/add', function(req, res, next) {
    db.User.create({
      email: req.body.email
    }).then(function() {
      res.redirect('/users')
    })
});


router.get('/delete/:id', function(req, res, next) {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect('/users')
  })
});

router.get('/update/:id', function(req, res, next) {
  db.User.findById(req.params.id).then(function(user) {
    console.log(user.email);
    res.render('users/update', { title:'UPDATE USER', id: user.id, email: user.email });
  })
});

router.post('/update/:id', function(req, res, next) {
  db.User.update({
      email: req.body.email
    },{
      where:
      {
        id: req.params.id
      }
    })
    .then(result => res.redirect('/users'))
    .catch(err => res.send('gagal maning'))
});

module.exports = router;
