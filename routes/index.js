var express = require('express');
var router  = express.Router();
var models  = require('../models');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  models.todo.findAll({include:models.user}).then(function(todos){
    models.user.findAll({raw:true}).then(function(data){
      res.render('index',{title:"Todo List", todoData:todos, users:data});
    })
  })
})

router.post('/add', function(req, res, next) {
  models.todo.create({title: req.body.title, is_complete:req.body.is_complete, userId: req.body.email}).then(function(){
    res.redirect('/')
  })
})

router.get('/update/:id', function(req, res, next) {
  models.user.findAll({raw:true}).then(function(value){
    models.todo.findById(req.params.id).then(function(todos){
      // console.log(todos);
      res.render('update',{title:"Todo List", data:todos, users:value});
    })
  })
})

router.post('/update/:id', function(req, res, next) {
  if(!req.body.is_complete){
    req.body.is_complete = false
  }
  models.todo.findById(req.params.id).then(function(todos){
    models.todo.update({
      title: req.body.title,
      is_complete: req.body.is_complete,
      userId: req.body.emailId
    }, {
      where:{
        id: req.body.id
      }
    }).then(function(){
      res.redirect('/')
    })
  })
})

router.get('/delete/:id', function(req, res){
  models.todo.findById(req.params.id).then(function(todos){
    if(todos){
      todos.destroy({where:{todos:req.body.id}})
      res.redirect('/')
    }
  })
});

module.exports = router;

/*
<div class="panel panel-default">
  <div class="panel-heading"><center><strong>Table Data</strong></center></div>
    <table class="table" border="1">
      <tr>
        <td><center>ID</td>
        <th><center>Email</th>
      </tr>
      <% for (var i=0; i<users.length; i++) {%>
        <tr>
          <td><center><%= users[i].id %></td>
          <td><center><%= users[i].email %></td>
        </tr>
      <% } %>
    </table>
</div>
*/
