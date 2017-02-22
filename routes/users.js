var express = require('express');
var router = express.Router();

let db = require('../models');

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render('users/create');
});

router.get('/', function(req, res, next) {
  db.User.findAll().then(users => {
    res.render('users/index', {
      result:users
    });
  });

});

router.post('/create', function(req, res, next) {
  db.User.create ({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  });
  res.redirect('/users')
});

router.get('/edit/:id', function(req, res, next) {
  db.User.find({
    where: {
      id: req.params.id
    }
  }).then(function(item){
    res.render('users/edit', {user: item})
  })
})

router.post('/update/:id', function(req, res, next) {
  db.User.update ({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  },{
    where: {
      id: req.params.id
    }
  }).then(()=> {
    res.redirect('/users')
  })
})

router.get('/delete/:id', function(req, res, next) {
  db.User.destroy ({
    where: {
      id: req.params.id
    }
  }).then(()=> {
    res.redirect('/users')
  })
})

module.exports = router;
