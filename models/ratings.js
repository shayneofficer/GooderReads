var orm = require("../config/orm.js");

genre = {
    all: function (cb) {
        orm.all("ratings", function (res) {
            cb(res);
        });
    },
    delete: function (cols, vals, cb) {
        orm.delete("ratings", cols, vals, function(res){
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

module.exports = genre;