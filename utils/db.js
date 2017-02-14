var mysql = require('mysql');
var app = require('../app');
var dbConfig;
if(process.env.NODE_ENV){
    dbConfig = {
        connectionLimit : 5,
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME,
        debug    : false
    }
}
else{
    var localConfig = require('./dbConfig');
    dbConfig = {
        connectionLimit : 20,
        host     : localConfig.host,
        user     : localConfig.user,
        password : localConfig.password,
        database : localConfig.database,
        debug    : false
    }
}
var pool = mysql.createPool(dbConfig);
module.exports = {
    pool : pool
};