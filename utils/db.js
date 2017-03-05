var mysql = require('mysql');
var dbConfig = require('./dbConfig').module;
var pool = mysql.createPool(dbConfig);
module.exports = {
    getPool : function(){
        return pool;
    }
};