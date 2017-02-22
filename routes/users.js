var express = require('express');
var router = express.Router();
let models = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll().then(function(User) {
    res.render('users/index', {Users: User, title: "Users"});
  })

});


module.exports = router;
