//requires ORM for Mysql usage
var orm = require("../config/orm.js");

//create delete and select genre preferences
genre = {
  all: function (cb) {
    orm.all("genres", function (res) {
      cb(res);
    });
  },

  create: function (cols, vals, cb) {
    orm.create("genres", cols, vals, function (res) {
      cb(res);
    });
  },

  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("genres", searchCol, val, function (res) {
      cb(res);
    });
  },
}

module.exports = genre;