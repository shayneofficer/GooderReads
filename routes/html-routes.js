var express = require('express');
var path = require('path');
var router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/basic-home', function (req, res) {
  //Popular / Featured books
  var placeholderImg = 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png';
  var books = [
    {
      title: 'Hunt for Red October',
      cover: placeholderImg
    },
    {
      title: 'Harry Pottah',
      cover: placeholderImg
    },
    {
      title: 'Lord of the Rings',
      cover: placeholderImg
    }
  ];
  res.render('basic-home', books);
});

router.get('/user-home', function (req, res) {
  var user = {
    name: 'Name Placeholder',
    email: 'Email Placeholder',
  };
  res.render('user-home', user)
});

// A default, catch-all route that leads to index.html which displays the home page.
router.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = router;