var express = require("express");
var session = require('express-session')
var bodyParser = require('body-parser')
var app = express();
app.use(express.static("public"));
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var apiRoutes = require("./routes/api-routes");
app.use(apiRoutes);

var htmlRoutes = require("./routes/html-routes");
app.use(htmlRoutes);

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});