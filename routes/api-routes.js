var user = require("../models/users");
var express = require("express");
var path = require("path");
var router = express.Router();

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

module.exports = router;