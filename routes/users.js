var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource =============');
// });

// router.get('/', function(req, res, next) {
//   db.Memo.findAll().then(function(data){
//   res.render('index', {title : "Memo", memos : data});
//   })
// });

// render tampilan form awal
router.get('/', function(req, res, next) {
  res.render('new-user', {title : "Tambah Memo Baru"})
})

// router.post('/', function(req, res, next){
//   // res.render('users', {title : "Memo", text : req.body})
//   db.Memo.create(req.body).then(function(data){
//     res.redirect('memos')
//   }).catch(function(err){
//     res.redirect('memos')
//   })
// })

router.get('/', function(req, res, next) {
  db.Memo.findAll().then(function(data){
  res.render('index', {title : "Memo", memos : data});
  })
})

router.post('/create', function(req, res, next) {
  db.Memo.create(req.body).then(function() {
    res.redirect('/')
  })
})

// localhost:3000/users/edit/3
router.get('/edit/:id', function(req, res, next) {
  db.Memo.findById(req.params.id).then(function(memo) {
    res.render('edit', {title: "Edit Memo", data : memo})
  }).catch(function() {

  })
})

// delete memo
// router.get('/delete/:id', function(req, res, next) {
//   db.Memo.destroy({
//     where : {
//       id
//     }
//   })
// })

router.get('/delete/:id', function(req, res) {
  db.Memo.destroy({
    where : {
      id : req.params.id
    }
  }).then(function() {
    res.redirect('/')
  })
})


module.exports = router;
