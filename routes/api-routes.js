var user = require("../models/users");
var userEmail = require("../models/userEmails");
var express = require("express");
var path = require("path");
var router = express.Router();
var books = require('google-books-search')


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/api/registerUser", function (req, res) {
    userEmail.selectWhere("userEmail", req.body.userEmail, function (result) {
        if (!result.length) {
            user.create(
                ["userName", "userPassword"],
                [req.body.userName, req.body.userPassword],
                function (result) {
                    console.log(`email:${req.body.userEmail} id:${result.insertId}`);
                    userEmail.create(
                        ["userEmail", "UserID"],
                        [req.body.userEmail, result.insertId],
                        function (res) {
                            console.log(res);
                        }
                    );
                    // Send back the ID of the new quote
                    res.json({ id: result.insertId });
                }
            );
        }
    });
});

function getBooks(title, cb) {
    books.search(title, function (error, results) {
        if (!error) {
            var booksArr = [];
            for (var i = 0; i < results.length; i++) {
                var bookInfo = results[i];
                var identifiers = [];
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


router.get('/books/:title', function (req, res) {
    console.log(req.params.title);
    getBooks(req.params.title, function (books) {
        // console.log(books);
        res.render("basic-home", { books: books });
    })
});

module.exports = router;