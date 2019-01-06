var user = require("../models/users");
var userEmail = require("../models/userEmails");
var genre = require("../models/genres");
var genrePreference = require("../models/genrePreferences");
var ratings = require("../models/ratings");

var express = require("express");
var router = express.Router();
var axios = require("axios");
var bcrypt = require('bcrypt-nodejs');
var isbn = require("node-isbn");
var featuredBooks = require("../models/featuredBooks")
var rating = require("../models/ratings")



router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Get liked genres for user
router.get("/api/likedGenres/:userID", function (req, res) {
    genrePreference.selectWhere("User-ID", req.params.userID, function (genrePrefs) {
        genre.all(function (genres) {
            var liked = [];
            for (var i = 0; i < genrePrefs.length; i++) {
                for (var j = 0; j < genres.length; j++) {
                    if (Object.values(genrePrefs[i])[1] == Object.values(genres[j])[0]) {
                        liked.push(genres[j].genreName);
                        break;
                    }
                }
            }
            res.json({ genres: liked });
        });
    });
});

// Add new liked genres to user
router.post("/api/likedGenres", function (req, res) {
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

            res.json({ message: "genrePreferences updated" });
        });
    });
});

router.post("/api/userLogin", function (req, res) {
    user.leftJoinWhere("userEmails", "userEmail", ["users.`User-ID`", "userEmails.userEmail", "users.userPassword", "users.userName"], req.body.userEmail, function (result) {
        var password = req.body.userPassword;
        // Encrypt user password
        console.log(password)
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

router.get("/api/book-rating/:isbn/:userID", function (req, res) {
    ratings.selectWhereMulti(["`ISBN`", "`User-ID`"], ['"' + req.params.isbn + '"', req.params.userID], function (result) {
        if (result.length == 0) {
            res.json(null);
        } else {
            res.json(result);
        }
    })
});

// Rate a book
router.post("/api/rate-book/", function (req, res) {
    if (Number.isNaN(parseInt(req.body.userID))) {
        res.json({ error: "Please Log In before rating a book" });
    } else {
        ratings.selectWhereMulti(["`ISBN`", "`User-ID`"], ['"' + req.body.isbn + '"', req.body.userID], function (result) {
            console.log(result);
            if (result.length == 0) {
                console.log("if")
                ratings.create(["`ISBN`", "`Book-Rating`", "`User-ID`"], [req.body.isbn, req.body.rating, req.body.userID], function (result) {
                    res.json(result);
                });
            } else {
                console.log("else")
                ratings.delete(["`ISBN`", "`User-ID`"], ['"' + req.body.isbn + '"', req.body.userID], function (result) {
                    console.log(result);
                    ratings.create(["`ISBN`", "`Book-Rating`", "`User-ID`"], [req.body.isbn, req.body.rating, req.body.userID], function (result) {
                        res.json(result);
                    });
                });
            }
        });
    }
});

//function used to grab data for featuredBooks table
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

                var snippet;
                if (!books[i].searchInfo) {
                    snippet = "No description available."
                } else {
                    snippet = books[i].searchInfo.textSnippet;
                }

                booksArr.push({
                    title: bookInfo.title,
                    author: bookInfo.authors,
                    publisher: bookInfo.publisher,
                    publishedDate: bookInfo.publishedDate,
                    snippet: snippet,
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

router.get('/profile/:userID', function (req, res) {
    ratings.selectWhereMulti(["`User-ID`"], req.params.userID, function (result) {
        getRatings(result, result.length, [], res);
    });
});

function getRatings(result, count, reviewInfo, res) {
    if (count === 0) {
        res.render("profile", { books: reviewInfo });
    } else {
        isbn.resolve(Object.values(result[count - 1])[1], function (err, book) {
            if (err) {
                console.log('Book not found', err);
            } else {
                var rate = Object.values(result[count - 1])[2];
                var rev = {
                    title: book.title,
                    author: book.authors.join(", "),
                    cover: book.imageLinks.thumbnail,
                    description: book.description,
                    rating: rate
                };
                reviewInfo.push(rev);
            }
            return getRatings(result, count - 1, reviewInfo, res);
        });
    }
}

//function for populating featuredBooks table
function makeFeaturedBooks(){

rating.grabTopRatings(9, function (results) {
    
  var data = results
  
  for (var i = 0; i < results.length; i++) { 
  
    function getBooks(count){
      
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=" + data[count].title).then(function (response) {
       
        
        var books = response.data.items
        for (var j = 0; j < books.length; j++) {
          function addToTable(counter){
              
          var bookInfo = books[counter].volumeInfo;
          
          var identifiers = [];
          var isbn10;
          for (var k = 0; bookInfo.industryIdentifiers && k < bookInfo.industryIdentifiers.length; k++) {
            function addingIdentifers(l){
            identifiers.push({ type: bookInfo.industryIdentifiers[l].type, identifier: bookInfo.industryIdentifiers[l].identifier })
            if (bookInfo.industryIdentifiers[l].type === 'ISBN_10') {
              isbn10 = bookInfo.industryIdentifiers[l].identifier;
            }
            }
            addingIdentifers(k)
          }
          
          var image;
          if (!bookInfo.imageLinks) {
            image = "https://via.placeholder.com/300/400";
          } else {
            image = bookInfo.imageLinks.thumbnail;
          }
          if (isbn10 === data[count].ISBN){

            
            var ratings = parseFloat(data[count].avgRating) + parseFloat(bookInfo.averageRating)
            
          var book =[
            isbn10,
            bookInfo.title,
            bookInfo.authors.toString(),
            bookInfo.description,
            books[counter].id,
            image,
            bookInfo.categories,
            bookInfo.ratingsCount,
            identifiers.toString(),
            ratings,  
            books[counter].accessInfo.embeddable
          ]

       
          featuredBooks.selectWhere("isbn10", data[count].ISBN.toString(), function (result) {
              console.log(result)
            if (!result.length) {
            featuredBooks.create(["ISBN10", "title", "author", "description", "id", "image", "categories", "ratingsCount", "identifiers", "rating", "embeddable" ], book)
            }
            
        })
      }
     

    }
    addToTable(j)
        }
        
       
      

      })
      

    
  
}
      
if(results[i].title != null)getBooks(i)
else console.log("book not found")
}
})




}




module.exports = router;
