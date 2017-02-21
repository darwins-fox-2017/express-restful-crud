var express = require('express');
var router = express.Router();
let model = require('../models');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   model.todo.findAll().then(function(todos){
//     res.render('todo/list.ejs', { dataTodo:todos });
//   })
// });
//list task
router.get('/:id/:name/list', function(req, res, next) {
  model.todo.findAll({
    where :
    {userId:req.params.id},
    include: [
        model.User
    ]
  }).then(function(todos){
    res.render('todo/list.ejs', { dataTodo:todos,userId:req.params.id,userName:req.params.name});
  }).catch(function(){
    console.log('error');
  })
});
//create task
router.get('/:id/:name/create', function(req, res, next) {
res.render('todo/create.ejs',{userId:req.params.id,userName:req.params.name})
});

//post update
router.post('/:id/:name/create', function(req, res, next) {
  //console.log(req.params.id);
  model.todo.create({title:req.body.title,iscompleate:false,userId:req.params.id}).then(function(){
    //let sim=`todo/${req.params.id}/${req.params.name}/list`
    res.redirect("/users")
    /console.log();
  }).catch(function(){
    res.render('user/create.ejs');
  })
});

router.get('/:id/:name/:todoid/edit', function(req, res, next) {
  model.todo.findOne({
    where:{id:req.params.todoid},
    include: [
        model.User
    ]
  }).then(function(todo){
    res.render('todo/edit.ejs',{userId:req.params.id,userName:req.params.name,todoTitle:todo.title,todoiscompelete:todo.iscompleate,todoId:todo.id})
  })

});

router.post('/:id/edit', function(req, res, next) {

  console.log(req.body);

  let isComplete = false;
  if(req.body.completed) {
    //console.log('masuk');
    isComplete = true;
  }
console.log(isComplete);
  let date;
  if (isComplete==true) {
    date = new Date();
  } else {
    date=null;
  }
  model.todo.update({
    title: req.body.title,
    iscompleate: isComplete,
    completeAt:date
  },{
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/users')
  })

});

router.get('/:id/delete', function(req, res, next) {
  console.log('masuk');
  model.todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/users')
  })

});

module.exports = router;
