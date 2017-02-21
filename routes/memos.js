var express = require('express');
var router = express.Router();

let db = require('../models');

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render('memos/create');
});

router.get('/', function(req, res, next) {
  db.Memo.findAll({
    include: [
      db.User
    ]
  }).then(memos => {
    // console.log(memos);
    res.render('memos/index', {
      result:memos
    });
  });

});

router.post('/create', function(req, res, next) {
  db.Memo.create ({
    title: req.body.title,
    is_complete: req.body.is_complete,
    user_id: req.body.user_id
  });
  res.redirect('/memos')
});

router.get('/edit/:id', function(req, res, next) {
  db.Memo.find({
    where: {
      id: req.params.id
    }
  }).then(function(item){
    res.render('memos/edit', {memo: item})
  })
})

router.post('/update/:id', function(req, res, next) {
let complete = false;
if (req.body.is_complete) {
  complete = true;
}

  db.Memo.update ({
    title: req.body.title,
    is_complete: complete,
    user_id: req.body.user_id
  },{
    where: {
      id: req.params.id
    }
  }).then(()=> {
    res.redirect('/memos')
  })
})

router.get('/delete/:id', function(req, res, next) {
  db.Memo.destroy ({
    where: {
      id: req.params.id
    }
  }).then(()=> {
    res.redirect('/memos')
  })
})

module.exports = router;
