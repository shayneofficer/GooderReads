var orm = require("../config/orm.js");

var user = {
  // The variables cols and vals are arrays.
  create: function (cols, vals, cb) {
    orm.create("users", cols, vals, function (res) {
      cb(res);
    });
  },

  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("users", searchCol, val, function (res) {
      cb(res);
    });
  },

  // The variables cols is an array.
  // Left Join for users table
  leftJoin: function (table2, primaryKeyT2, cols, cb) {
    orm.leftJoin("users", table2, "User-ID", primaryKeyT2, cols, function (res) {
      cb(res);
    });
  },

  leftJoinWhere: function (table2, primaryKeyT2, cols, val, cb) {
    orm.leftJoinWhere("users", table2, "User-ID", primaryKeyT2, cols, val, function (res) {
      cb(res);
    });
  }
};

// Export the database functions to route controllers.
module.exports = user;
