//requires ORM for Mysql usage
var orm = require("../config/orm.js");

//Create and select user emails from MySQL database
userEmail = {
  create: function (cols, vals, cb) {
    orm.create("userEmails", cols, vals, function (res) {
      cb(res);
    });
  },

  selectWhere: function (searchCol, val, cb) {
    orm.selectWhere("userEmails", searchCol, val, function (res) {
      cb(res);
    });
  },
}

module.exports = userEmail;