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


function getBooks(title, ISBN, cb) {
books.search(title, function(error, results) {
    if ( ! error ) {
      
        
      for (var i = 0; i < results.length; i++){
        var bookInfo = results[i];
        if (bookInfo.hasOwnProperty("industryIdentifiers")){
          for(var j = 0; j < bookInfo.industryIdentifiers.length; j++){
            if (bookInfo.industryIdentifiers[j].identifier === ISBN){
              var book ={
                description: bookInfo.description,
                image: bookInfo.thumbnail,
                categories: bookInfo.categories,
                pageCount: bookInfo.pageCount,
                ISBN: bookInfo.industryIdentifiers[j].identifier
              };
              console.log(book)
        //   cb(book)
              return
            }
          }
        }
        
    }
}
    else {
        console.log(error);
    }
});

}


module.exports = router;