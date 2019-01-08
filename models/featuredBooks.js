var orm = require("../config/orm.js");
//methods to make use of the orm for the featuredBook table
var featurerdBook ={
  //the create for putting books into the featuredBook table
  create: function (cols, vals, cb) {
    orm.create("featuredBooks", cols, vals, function (res) {
      console.log(res)
    });
  },
  //for selecting a book from list used to check if book is already in the list
  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("featuredBooks", searchCol, val, function (res) {
      cb(res);
    });
  },
  //method for grabbing a set amount from set spot and ordeing it by set col
  selectFeaturedBooks: function(amount, offset, orderBy, cb){
    orm.selectFeaturedBooks("featuredBooks", amount, offset, orderBy, function(res){
    cb(res)
    });
  }

}
module.exports = featurerdBook