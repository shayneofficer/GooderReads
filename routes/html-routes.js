var express = require('express');
var path = require('path');
var router = express.Router();

router.use(express.urlencoded({
  extended: true
}));
router.use(express.json());

// Landing page for users already signed in
router.get('/user-home', function (req, res) {
  //Popular / Featured books
  var placeholderImg = 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png';
  var books = [{
      title: 'Hunt for Red October',
      cover: placeholderImg,
      summary: 'This is a summary.'
    },
    {
      title: 'Harry Pottah',
      summary: 'This is a summary, with a British accent.',
      cover: placeholderImg
    },
    {
      title: 'Lord of the Rings',
      summary: 'This is a boring summary.',
      cover: placeholderImg,
    }
  ];
  res.render('user-home', {
    books: books
  });
});


router.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

// Default landing page
router.get('*', function (req, res) {
  //Popular / Featured books 
  var placeholderImg = 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png';
  var books = [{
      title: 'Hunt for Red October',
      cover: placeholderImg,
      summary: 'This is a summary.'
    },
    {
      title: 'Harry Pottah',
      summary: 'This is a summary, with a British accent.',
      cover: placeholderImg
    },
    {
      title: 'Lord of the Rings',
      summary: 'This is a boring summary.',
      cover: placeholderImg,
    }
  ];
  res.render('basic-home', {
    books: books
  });
});

module.exports = router;