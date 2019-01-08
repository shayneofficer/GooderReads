//requires ORM for Mysql usage
var orm = require("../config/orm.js");

//create delete and select genre preferences
genrePreference = {
  all: function (cb) {
    orm.all("genrePreferences", function (res) {
      cb(res);
    });
  },

  create: function (cols, vals) {
    orm.create("genrePreferences", cols, vals, function (res) {
    });
  },

  delete: function (cols, vals) {
    orm.delete("genrePreferences", cols, vals, function (res) {
    });
  },

  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("genrePreferences", searchCol, val, function (res) {
      cb(res);
    });
  },
}

module.exports = genrePreference;