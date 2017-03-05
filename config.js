if(process.env.NODE_ENV){
    module.exports = {
        jwtSecret: process.env.JWT_SECRET,
        jwtSession: {
            session: false
        },
        sessionSecret: process.env.SESSION_SECRET,
        dbConfig: {
            connectionLimit : 10,
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB_NAME,
            debug    : false
        }
    };
}
else{
    module.exports = {
        jwtSecret: "uKMmQRjFaebBe76hHhQQ5Fg4",
        jwtSession: {
            session: false
        },
        sessionSecret: "uKMmQRjFaebBe76hHhQQ5Fg4",
        dbConfig: {
            connectionLimit : 10,
            host     : 'mysql.stud.ntnu.no',
            user     : 'evend_finansforu',
            password : 'evend',
            database : 'evend_finans',
            debug    : true,
        }
    };
}