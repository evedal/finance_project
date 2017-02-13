/*
    1. Set up your database using script from root/database/db.sql
    2. Create a file named dbConfig.js
    3. Copy this data, and fill inn your own settings
 */
var mysql = require('mysql');
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : 'your-mysql-host',
        user     : 'your-username',
        password : 'your-password',
        database : 'db-name',
        charset  : 'your-charset' //utf8
    },
    pool: {min: 0, max: 20} //edit to fit your connection limit
});
module.exports({
    dbConfig: knex
});
