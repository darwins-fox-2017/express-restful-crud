var express = require('express');
var router  = express.Router();
var models   = require("../models")

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Todo.findAll({include:[models.User], raw:true, order:'"id" ASC'}).then(function (todos) {
    models.User.findAll({raw:true}).then(function(users){
      res.render('index', { title: 'Todos', todos:todos, users:users});
    })
  })
});

router.post('/', function(req, res, next) {
  models.Todo.create({
    title: req.body.title,
    is_complete: req.body.iscomplete,
    UserId:req.body.email
  }).then(function (todos) {
    res.redirect("/")
  })
});

router.get('/update/:id', function(req, res){
  models.Todo.findById(req.params.id).then(function(todo){
    models.User.findAll({raw:true}).then(function(users){
      res.render('edit-todos', {todo:todo, users})
    })
  })
})

router.post('/update/:id', function(req, res){
  models.Todo.findById(req.params.id).then(function(todos){
    if (!todos.is_complete) {
      todos.is_complete = false
    }
    todos.update({
      title:req.body.title,
      is_complete:req.body.iscomplete,
      UserId:req.body.email
    })
    res.redirect('/')
  })
})

router.get('/delete/:id', function(req, res){
  models.Todo.findById(req.params.id).then(function(todo){
    if (todo) {
      todo.destroy({
        where:{
          id:req.body.id
        }
      })
      res.redirect('/')
    }
  })
})

module.exports = router;
