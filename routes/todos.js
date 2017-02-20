var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
    models.User.findAll().then(function(users) {
        models.Todo.findAll({
            include: [{
                model: models.User
            }]
        }).then(function(todos) {
            res.render('todos/index', {todos:todos, users:users})
        })
    })
});

router.post('/create', function(req, res, next) {
    models.Todo.create({title:req.body.title, UserId:req.body.UserId}).then(function(success) {
        res.redirect('/todos')
    })
});

router.post('/createuser', function(req, res, next) {
    models.User.create({email:req.body.userEmail}).then(function(success) {
        res.redirect('/todos')
    })
});

router.get('/delete/:id', function(req, res, next) {
    models.Todo.destroy({
        where: {
            id:req.params.id
        }
    }).then(function(success) {
        res.redirect('/todos')
    })
});

router.get('/deleteuser/:id', function(req, res, next) {
    models.User.destroy({
        where: {
            id:req.params.id
        }
    }).then(function(success) {
        res.redirect('/todos')
    })
});

router.get('/edit/:id', function(req, res, next) {
    models.Todo.findById(req.params.id).then(function(todo) {
        res.render('todos/edit', {todo:todo})
    })
});

router.post('/edit/update', function(req, res, next) {
    console.log(req.body.is_complete)
    models.Todo.update({
        title: req.body.title,
        is_complete: req.body.is_complete
    }, {
        where: {
            id: req.body.id
        }
    }).then(function(id) {
       res.redirect('/todos') 
    })
});


module.exports = router;