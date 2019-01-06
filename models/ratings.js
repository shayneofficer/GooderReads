//requires ORM for Mysql usage
var orm = require("../config/orm.js");

//create delete and select ratings preferences
ratings = {
    all: function (cb) {
        orm.all("ratings", function (res) {
            cb(res);
        });
    },
    delete: function (cols, vals, cb) {
        orm.delete("ratings", cols, vals, function (res) {
            cb(res);
        });
    },

    create: function (cols, vals, cb) {
        orm.create("ratings", cols, vals, function (res) {
            cb(res);
        });
    },

    selectWhereMulti: function (cols, vals, cb) {
        orm.selectWhereMulti("ratings", cols, vals, function (res) {
            cb(res);
        });
    },
}

module.exports = ratings;


rating = {
  grabTopRatings: function(amount, cb){
    orm.selectTop("ratings", "ISBN", "Book-Rating", amount, "Book-Title", "Image-URL-M", function(res){
      cb(res)
    })
  }


}
module.exports = rating
