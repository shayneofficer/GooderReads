var express = require('express')
var router = express.Router()

router.use(
  express.urlencoded({
    extended: true
  })
)
router.use(express.json())

// router.get('/register', function (req, res) {
//   res.render('register');
// });

router.get('/genres', function (req, res) {
  res.render('genres')
})

router.get('/preferences', function (req, res) {
  res.render('genres')
})

router.get('/profile', function (req, res) {
  
  res.render('profile')
})

// Default landing page
router.get('*', function (req, res) {

  
  // res.render('home', {
  //   books: books
  // });
});

module.exports = router
