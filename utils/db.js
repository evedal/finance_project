var mysql = require('mysql');
var app = require('../app');
var dbConfig;
if(process.env.NODE_ENV){
    dbConfig = {
        connectionLimit : 10,
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME,
        debug    : false
    }
}
else{
    dbConfig = require('./dbConfig').module;

}
var pool = mysql.createPool(dbConfig);
module.exports = {
    pool : pool
};