var mysql = require('mysql');
var cfg = require('../config');
var pool = mysql.createPool(cfg.dbConfig);
module.exports = {
    getPool : function(){
        return pool;
    }
};