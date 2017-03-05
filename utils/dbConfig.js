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
    dbConfig = {
        connectionLimit : 10,
        host     : 'mysql.stud.ntnu.no',
        user     : 'evend_finansforu',
        password : 'evend',
        database : 'evend_finans',
        debug    : false,
    };
}
exports.module = dbConfig;
