var user = require("../models/users");
var express = require("express");
var path = require("path");
var router = express.Router();
var books = require('google-books-search')

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/api/registerUser", function (req, res) {
    user.create(
        ["userName", "userPassword", "userEmail"],
        [req.body.userName, req.body.userPassword, req.body.userEmail],
        function (result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
        }
    );
});


function getBooks(title, cb) {
books.search(title, function(error, results) {
    if ( ! error ) {
      var books = []
      for (var i = 0; i < results.length; i++){
        var bookInfo = results[i];
        var identifiers = []
        for (var j = 0; j < bookInfo.industryIdentifiers.length; j++){
            identifiers.push({type: bookInfo.industryIdentifiers[j].type, identifier: bookInfo.industryIdentifiers[j].identifier })
        }
         books.push ({
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

      cb(books) 
}
    else {
        console.log(error);
    }
});

}


module.exports = router;