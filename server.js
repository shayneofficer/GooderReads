var express = require("express");
var app = express();
app.use(express.static("public"));
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var apiRoutes = require("./routes/api-routes");
app.use(apiRoutes);

var htmlRoutes = require("./routes/html-routes");
app.use(htmlRoutes);

app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
