var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll({raw:true}).then(function(data){
    res.render('user', {users: data});
  })
});

router.post('/', function(req, res, next) {
  models.User.create({
    email:req.body.email
  }).then(function(data){
    res.redirect('/users');
  })
});

router.get('/update/:id', function(req, res){
  models.User.findById(req.params.id).then(function(user){
    res.render('edit-users',{user:user})
  })
})

router.post('/update/:id', function(req,res){
  models.User.findById(req.params.id).then(function(user){
    user.update({
      email:req.body.email
    })
    res.redirect('/users')
  })
})

router.get('/delete/:id', function (req, res) {
  models.User.findById(req.params.id).then(function(user){
    if (user) {
      user.destroy({
        where:{
          user:req.body.id
        }
      })
      res.redirect('/users')
    }
  })
})


module.exports = router;
