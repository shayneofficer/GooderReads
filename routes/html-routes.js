var express = require("express");
var path = require("path");
var router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/home.handlebars"));
})

// A default, catch-all route that leads to index.html which displays the home page.
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});


module.exports = router;