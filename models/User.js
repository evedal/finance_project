var db = require('../utils/db');
var pool = db.pool;
const sqlCreateUser = "INSERT INTO user SET ?";

function createUser(user, callback){
    "use strict";
    console.log(db);
    pool.query(sqlCreateUser, user, function (err, result) {
        if(err){
            return callback(err);
        }
        user.user_id = result.insertId;
        callback(null, user);
    });
}

module.exports = {
    create: createUser
};