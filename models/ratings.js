var orm = require("../config/orm.js");

genre = {
    all: function (cb) {
        orm.all("ratings", function (res) {
            cb(res);
        });
    },

    create: function (cols, vals, cb) {
        orm.create("ratings", cols, vals, function (res) {
            cb(res);
        });
    },

    selectWhere: function (searchCol, val, cb) {
        orm.selectWhere("ratings", searchCol, val, function (res) {
            cb(res);
        });
    },
}

module.exports = genre;