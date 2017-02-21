var express = require('express');
var router = express.Router();
let model = require('../models');
/* GET users listing. */
//halaman view user
router.get('/', function(req, res, next) {
  model.User.findAll().then(function(users){
    res.render('user/read.ejs', { dataUsers:users });
  })
});


//halaman create
router.get('/create', function(req, res, next) {
  res.render('user/create.ejs');
});


router.post('/create', function(req, res, next) {
 model.User.create({name:req.body.name,email:req.body.email}).then(function(){
   res.redirect('/users')
 }).catch(function(){
   res.render('user/create.ejs');
 })
});

//view edit
router.get('/:id/edit', function(req, res, next) {
  model.User.findOne({where:
    { id:req.params.id }
  }).then(function(users){
  res.render('user/edit.ejs', { dataUsers:users });
  })
});

//update edit
router.post('/update', function(req, res, next){
  console.log(req.body);
  model.User.update({
    name: req.body.name,
    email: req.body.email
  },{
    where: {
      id: req.body.id
    }
  }).then(() => {
    res.redirect('/users')
  })
})

//delete users
router.get('/:id/delete', function(req, res, next){
  model.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/users')
  })
})

module.exports = router;
