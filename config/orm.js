// Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

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
    all: function (table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function (error, result) {
            if (error) throw error;
            cb(result);
        });
    },

    create: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ");";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) throw err;
            console.log(result);
            cb(result);
        });
    },

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
            console.log(queryString);
            
            connection.query(queryString, [table], function (err, result) {
                if (err) throw err;
                cb(result);
            });
        }
    },

    selectWhere: function (table, searchCol, val, cb) {
        var queryString = "SELECT * FROM ?? WHERE ?? = ?;";
        console.log(`SELECT * FROM ${table} WHERE ${searchCol} = ${val};`)
        connection.query(queryString, [table, searchCol, val], function (err, result) {
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

    leftJoinWhere: function (table1, table2, primaryKeyT1, primaryKeyT2, cols, val, cb) {
        var queryString = "SELECT " + cols.toString() + " FROM ?? LEFT JOIN ?? ON ??.?? = ??.?? WHERE ??.?? = ?;"
        connection.query(queryString, [table1, table2, table1, primaryKeyT1, table2, primaryKeyT1, table2, primaryKeyT2, val], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = orm;