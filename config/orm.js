// Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}
//vestigal may come in use later
function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    //select everything from the MySQL database
    all: function (table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function (error, result) {
            if (error) throw error;
            cb(result);
        });
    },
    //table inserts
    create: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ");";

        connection.query(queryString, vals, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    //delete from table function
    delete: function (table, cols, vals, cb) {
        var queryString = "DELETE FROM ?? WHERE "
        if (cols.length != vals.length && cols.length <= 0) {
            err = "Error: BAD_INPUTS_ERROR: ";
            if (cols.length <= 0) err += "Number of Columns is 0";
            else if (vals.length <= 0) err += "Number of Values is 0";
            else err += "Number of Columns does not match number of Values";
            throw err;
        } else {
            queryString += cols[0] + " = " + vals[0];
            for (var i = 1; i < cols.length; i++) {
                queryString += " AND " + cols[i] + " = " + vals[i];
            }
            queryString += ";";

            connection.query(queryString, [table], function (err, result) {
                if (err) throw err;
                cb(result);
            });
        }
    },

    selectWhereMulti: function (table, cols, vals, cb) {
        var queryString = "SELECT * FROM ?? WHERE ";
        if (cols.length != vals.length && cols.length <= 0) {
            err = "Error: BAD_INPUTS_ERROR: ";
            if (cols.length <= 0) err += "Number of Columns is 0";
            else if (vals.length <= 0) err += "Number of Values is 0";
            else err += "Number of Columns does not match number of Values";
            throw err;
        } else {
            queryString += cols[0] + " = " + vals[0];
            for (var i = 1; i < cols.length; i++) {
                queryString += " AND " + cols[i] + " = " + vals[i];
            }
            queryString += ";";


            connection.query(queryString, [table], function (err, result) {
                if (err) throw err;
                cb(result);
            });
        }
    },

    //Select everything from a variable table where search is value
    selectWhere: function (table, searchCol, val, cb) {
        var queryString = "SELECT * FROM ?? WHERE ?? = ?;";
        connection.query(queryString, [table, searchCol, val], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    // method for for grabing from a table an amount of results, with an offset feature, and order it by a col
    selectFeaturedBooks: function (table, amount, offset, orderBy, cb) {
        var queryString = "SELECT * from ?? ORDER BY ?? LIMIT ?, ?;"
        connection.query(queryString, [table, orderBy, offset, amount], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },


    // Left Join Function
    leftJoin: function (table1, table2, primaryKeyT1, primaryKeyT2, cols, cb) {
        var queryString = "SELECT " + cols.toString() + " FROM ?? LEFT JOIN ?? ON ??.?? = ??.?? WHERE ??.?? IS NOT NULL;"
        connection.query(queryString, [table1, table2, table1, primaryKeyT1, table2, primaryKeyT1, table2, primaryKeyT2], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    //left Join Function Where table2.key is value
    leftJoinWhere: function (table1, table2, primaryKeyT1, primaryKeyT2, cols, val, cb) {
        var queryString = "SELECT " + cols.toString() + " FROM ?? LEFT JOIN ?? ON ??.?? = ??.?? WHERE ??.?? = ?;"
        connection.query(queryString, [table1, table2, table1, primaryKeyT1, table2, primaryKeyT1, table2, primaryKeyT2, val], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    //selects top rated books to use to populate featured books
    selectTop: function (table1, groupBy, orderBy, amount, title, image, cb) {
        var queryString = "SELECT ?? as title, ?? as image, ??.??, COUNT(??) as ratingsCount, AVG(??) AS avgRating FROM ?? LEFT JOIN books ON ??.?? = books.?? WHERE `Book-Rating` >= ? GROUP BY ?? ORDER BY ratingsCount DESC limit 180, 30;"
        connection.query(queryString, [title, image, table1, groupBy, orderBy, orderBy, table1, table1, groupBy, groupBy, amount, groupBy], function (err, res) {
            if (err) throw err;
            cb(res)
        })
    }
}

module.exports = orm;