var orm = require("../config/orm.js");

var featurerdBook ={
  create: function (cols, vals, cb) {
    orm.create("featuredBooks", cols, vals, function (res) {
      console.log(res)
    });
  },
  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("featuredBooks", searchCol, val, function (res) {
      cb(res);
    });
  },

  selectFeaturedBooks: function(amount, offset, orderBy, cb){
    orm.selectFeaturedBooks("featuredBooks", amount, offset, orderBy, function(res){
    cb(res)
    });
  }


  // emptyTable: function(){
  //   orm.emptyTable("featuredBooks")
  // }
}
module.exports = featurerdBook