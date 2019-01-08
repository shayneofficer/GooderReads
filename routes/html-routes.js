var express = require('express');
var router = express.Router();
var featuredBooks = require("../models/featuredBooks")


router.use(
  express.urlencoded({
    extended: true
  })
)
router.use(express.json())


//route for loading genres
router.get('/genres', function (req, res) {
  res.render('genres')
})
//another for loading genres
router.get('/preferences', function (req, res) {
  res.render('genres')
})
// route for loading profile page
router.get('/profile', function (req, res) {
  
  res.render('profile')
})

// Default landing page
router.get('*', function (req, res) {
  var ran = Math.floor(Math.random()*11)
  featuredBooks.selectFeaturedBooks(10, ran, "rating", function(response){
  res.render("home",{books: response})
  })
 
});


module.exports = router;
