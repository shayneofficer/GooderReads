var user = require("../models/users");
var userEmail = require("../models/userEmails");
var genre = require("../models/genres");
var genrePreference = require("../models/genrePreferences");
var express = require("express");
var router = express.Router();
var axios = require("axios");
var bcrypt = require('bcrypt-nodejs');


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Get liked genres for user
router.get("/api/likedGenres", function (req, res) {
    res.json({});
});

// Add new liked genres to user
router.post("/api/likedGenres", function (req, res) {
    console.log("\nGenres");
    console.log(req.body);

    genre.all(function (result) {
        likes = req.body.likes;
        for (var i = 0; i < likes.length; i++) {
            for (var j = 0; j < result.length; j++) {
                if (result[j].genreName == likes[i]) {
                    likes[i] = Object.values(result[j])[0];
                    break;
                }
            }
        }

        console.log("\nAfter conversion to genre-id");
        console.log(likes);

        genrePreference.selectWhere("User-ID", req.body.userID, function (result) {
            console.log(result);
            if (!result) result = [];
            for (var i = 0; i < result.length; i++) {
                var match = false;
                for (var j = 0; j < likes.length; j++) {
                    if (Object.values(result[i])[1] == likes[j]) {
                        match = true;
                        break;
                    }
                }
                if (!match) {
                    console.log("delete genre " + result[i]);
                    genrePreference.delete(["`User-ID`", "`Genre-ID`"], [req.body.userID, Object.values(result[i])[1]]);
                }
            }

            for (var i = 0; i < likes.length; i++) {
                var match = false;
                for (var j = 0; j < result.length; j++) {
                    if (Object.values(result[j])[1] == likes[i]) {
                        match = true;
                        break;
                    }
                }
                if (!match) {
                    console.log("create genre " + likes[i]);
                    genrePreference.create(["`User-ID`", "`Genre-ID`"], [req.body.userID, likes[i]]);
                }
            }
        });
    });
});

router.post("/api/userLogin", function (req, res) {
    user.leftJoinWhere("userEmails", "userEmail", ["users.`User-ID`", "userEmails.userEmail", "users.userPassword", "users.userName"], req.body.userEmail, function (result) {
        var password = req.body.userPassword;
        // Encrypt user password

        var userName;
        var userID;
        console.log(result);
        for (var i = 0; i < result.length; i++) {
            if (result[i].userEmail == req.body.userEmail) {
                console.log(result[i.userPassword])
                if (bcrypt.compareSync(password, result[i].userPassword)) {
                    userName = result[i].userName;
                    userID = Object.values(result[i])[0];
                    console.log("User Sign in: " + userName + "\n" + userID + "\n");
                } else {
                    userName = -4;
                }
                break;
            }
        }

        if (userName && userID) {
            res.json({ userName: userName, userID: userID });
        } else if (userName === -4) {
            res.json({ error: "Incorrect Password" });
        } else {
            res.json({ error: "Email Does Not Exist" });
        }
    });
});

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
        console.log(req.body);
        userEmail.selectWhere("userEmail", req.body.userEmail, function (result) {
            if (!result.length) {
                // Encrypt password Server Side Sets Password to hash Value
                var password = bcrypt.hashSync(req.body.userPassword);
                var loginInfo = { userName: req.body.userName };

                // Create new User
                user.create(
                    ["userName", "userPassword"],
                    [req.body.userName, password],
                    function (result) {
                        console.log("\nusers");
                        console.log(`email:${req.body.userEmail} id:${result.insertId}`);
                        userEmail.create(
                            ["userEmail", "`User-ID`"],
                            [req.body.userEmail, result.insertId],
                            function (res) {
                                console.log("\nuserEmails");
                                console.log(res);
                            }
                        );

                        // Send back the ID & userName of the new User
                        loginInfo.userID = result.insertId;
                        res.json(loginInfo);
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
            var booksArr = [];
            for (var i = 0; i < books.length; i++) {
                var bookInfo = books[i].volumeInfo;
                var identifiers = [];
                var isbn10;
                for (var j = 0; bookInfo.industryIdentifiers && j < bookInfo.industryIdentifiers.length; j++) {
                    identifiers.push({ type: bookInfo.industryIdentifiers[j].type, identifier: bookInfo.industryIdentifiers[j].identifier })
                    if (bookInfo.industryIdentifiers[j].type === 'ISBN_10') {
                        isbn10 = bookInfo.industryIdentifiers[j].identifier;
                    }
                }

                var image;
                if (!bookInfo.imageLinks) {
                    image = "https://via.placeholder.com/300/400";
                } else {
                    image = bookInfo.imageLinks.thumbnail;
                }

                booksArr.push({
                    title: bookInfo.title,
                    author: bookInfo.authors,
                    publisher: bookInfo.publisher,
                    publishedDate: bookInfo.publishedDate,
                    description: bookInfo.description,
                    id: books[i].id,
                    image: image,
                    categories: bookInfo.categories,
                    pageCount: bookInfo.pageCount,
                    ratingsCount: bookInfo.ratingsCount,
                    identifiers: identifiers,
                    isbn10: isbn10,
                    embeddable: books[i].accessInfo.embeddable
                });


            }
            cb(booksArr)

        }).catch(function (err) {
            if (err) throw err;
        });
}

router.get('/search/:title', function (req, res) {
    getBooks(req.params.title, function (books) {
        res.render("home", { books: books });
    });
});


module.exports = router;
