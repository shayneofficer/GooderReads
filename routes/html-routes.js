var express = require('express');
var router = express.Router();

router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

router.get('/register', function (req, res) {
  res.render('register');
});

router.get('/genres', function (req, res) {
  res.render('genres');
});

// Default landing page
router.get('*', function (req, res) {
  //Popular / Featured books 
  var placeholderImg = ['http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png'];
  var books = [{
    title: 'Hunt for Red October',
    description: 'This is a summary.',
    image: placeholderImg
  },
  {
    title: 'Harry Pottah',
    description: 'This is a summary, with a British accent.',
    image: placeholderImg
  },
  {
    title: 'Lord of the Rings',
    description: 'This is a boring summary.',
    image: placeholderImg,
  }
  ];
  res.render('home', {
    books: books
  });
});

module.exports = router;