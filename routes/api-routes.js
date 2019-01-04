var user = require("../models/users");
var userEmail = require("../models/userEmails");
var express = require("express");
var router = express.Router();
var axios = require("axios");


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/api/registerUser", function (req, res) {
    // Registration Authentication
    // Check User Name for invalid characters
    var invalidChar = [];
    for (var i = 0; i < req.body.userName.length; i++) {
        var ascii = req.body.userName.charCodeAt(i);
        if ((ascii > 32 && ascii < 48) || (ascii > 57 && ascii < 65) || (ascii > 90 && ascii < 97) || ascii > 123) {
            invalidChar.push(req.body.userName[i]);
        }
    }
    // Authentication checklist
    if (invalidChar.length) {
        res.json({ error: 'User Name contains invalid characters' });
    } else if (req.body.userPassword.length < 8) {
        res.json({ error: 'Password not long enough! Please use a password that is 8 characters long!' });
    } else {
        userEmail.selectWhere("userEmail", req.body.userEmail, function (result) {
            if (!result.length) {
                // Create new User
                user.create(
                    ["userName", "userPassword"],
                    [req.body.userName, req.body.userPassword],
                    function (result) {
                        console.log(`email:${req.body.userEmail} id:${result.insertId}`);
                        userEmail.create(
                            ["userEmail", "`User-ID`"],
                            [req.body.userEmail, result.insertId],
                            function (res) {
                                console.log(res);
                            }
                        );
                        // Send back the ID of the new quote
                        res.json({ id: result.insertId });
                    }
                );
            } else {
                res.json({ error: "Email already in use!" })
            }
        });
    }
});

function getBooks(title, cb) {
    axios
        .get("https://www.googleapis.com/books/v1/volumes?q=" + title

        )
        .then(function (response) {
            var books = response.data.items
            console.log(books)
            var booksArr = [];
            for (var i = 0; i < books.length; i++) {
                var bookInfo = books[i].volumeInfo;
                var identifiers = [];
                var images = [];
                for (var j = 0; j < bookInfo.industryIdentifiers.length; j++) {
                    identifiers.push({ type: bookInfo.industryIdentifiers[j].type, identifier: bookInfo.industryIdentifiers[j].identifier })
                }

                for (var j = Object.values(bookInfo.imageLinks).length - 1; j >= 0; j--) {
                    images.push(Object.values(bookInfo.imageLinks)[j])
                }
                booksArr.push({
                    title: bookInfo.title,
                    author: bookInfo.authors,
                    publisher: bookInfo.publisher,
                    publishedDate: bookInfo.publishedDate,
                    description: bookInfo.description,
                    image: bookInfo.imageLinks.thumbnail,
                    id: books[i].id,
                    categories: bookInfo.categories,
                    pageCount: bookInfo.pageCount,
                    ratingsCount: bookInfo.ratingsCount,
                    identifiers: identifiers,
                    embeddable: books[i].accessInfo.embeddable
                });
                console.log(booksArr[i].identifiers[0].identifier)
              
              }
            console.log(books)
            cb(booksArr)

        });
}

router.get('/books/:title', function (req, res) {
    // console.log(req.params.title);
    getBooks(req.params.title, function (books) {
        console.log(books[0].image);
        res.render("basic-home", { books: books });
    });
});


module.exports = router;