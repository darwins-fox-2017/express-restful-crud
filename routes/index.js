var express = require('express');
var router = express.Router();
let model = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  model.User.findAll().then(function(users){
    res.render('index', { dataUsers:users,title:'todo list'  });
  })


});

module.exports = router;
