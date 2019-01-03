var user = require("../models/users");
var express = require("express");
var path = require("path");
var router = express.Router();
var books = require('google-books-search')
var goodreads = require('goodreads-api-node');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/api/registerUser", function (req, res) {
  user.selectWhere("userName", req.body.userName,
    function (result) {
      if (result && result.length) {
        console.log(`User "${result[0].userName}" already exists`);
        console.log(result);
      } else {
        console.log("Create");
        user.create(
          ["userName", "userPassword", "userEmail"],
          [req.body.userName, req.body.userPassword, req.body.userEmail],
          function (result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
          }
        );
      }
    }
  );
});

function getBooks(title, cb) {
  books.search(title, function (error, results) {
    if (!error) {
      var booksArr = []
      for (var i = 0; i < results.length; i++) {
        var bookInfo = results[i];
        var identifiers = []
        for (var j = 0; j < bookInfo.industryIdentifiers.length; j++) {
          identifiers.push({ type: bookInfo.industryIdentifiers[j].type, identifier: bookInfo.industryIdentifiers[j].identifier })
        }
        booksArr.push({
          title: bookInfo.title,
          author: bookInfo.authors,
          publisher: bookInfo.publisher,
          publishedDate: bookInfo.publishedDate,
          description: bookInfo.description,
          image: bookInfo.thumbnail,
          categories: bookInfo.categories,
          pageCount: bookInfo.pageCount,
          identifier: identifiers
        });
      }
      cb(booksArr)
    }
    else {
      console.log(error);
    }
  });
}

module.exports = router;