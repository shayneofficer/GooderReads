var user = require("../models/users");
var userEmail = require("../models/userEmails");
var express = require("express");
var path = require("path");
var router = express.Router();
var books = require('google-books-search')


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
        res.json({error: 'User Name contains invalid characters'});
    } else if (req.body.userPassword.length < 8) {
        res.json({error: 'Password not long enough! Please use a password that is 8 characters long!'});
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


module.exports = router;