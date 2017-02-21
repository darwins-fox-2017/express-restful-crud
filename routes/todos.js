var express = require('express');
var router = express.Router();

let db = require('../models')
let faker = require('faker')

/* GET todos listing. */
router.get('/', function(req, res, next) {
  db.Todo.findAll({
    include: [
      db.User
    ]
  }).then(todos => {
    console.log(JSON.stringify(todos))
    res.render('todos/index', {result: todos})
  })
  // res.send('respond with a resource');
});

router.get('/create', function(req, res, next){
  db.User.findAll().then((users) => {
    res.render('todos/create', {users: users})
    })
})

router.post('/create', function(req, res, next){
  db.Todo.create({
    name: req.body.name,
    completed: req.body.completed,
    user_id: req.body.user_id
  })
  res.redirect('/todos')
})

router.post('/:id/update', function(req, res, next){
  db.Todo.update({
    name: req.body.name,
    completed: req.body.completed,
    user_id: req.body.user_id
  },{
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/todos')
  })
})

router.get('/:id/delete', function(req, res, next){
  db.Todo.destroy({
    where: {
      id : req.params.id
    }
  }).then(() => {
    res.redirect('/todos')

  })
})

router.get('/:id', function(req, res, next){
  db.Todo.find({
    where : {
      id: req.params.id
    }
  }).then(item => {
    res.render('todos/show', {item: item})
  })
})

router.get('/:id/edit', function(req, res, next){
  db.Todo.find({
    include: [ db.User ],
    where: {
      id: req.params.id
    }
  }).then(function(todo){
    db.User.findAll().then((users) => {

      res.render('todos/edit', {todo: todo, users: users})
    })
  })
})

router.get('/seed/:amont', function(req, res, next){
  for (let i = 0; i < req.params.amont; i++) {
    db.Todo.create({
      name: faker.lorem.words(),
      completed: faker.random.boolean(),
      user_id: randomIntFromInterval(1, 100)
    })
  }
  res.redirect('/todos')
})

function randomIntFromInterval(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

module.exports = router;
