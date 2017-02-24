var pool = require("../utils/db").pool;
const sqlCreateUser = "INSERT INTO user SET ?";


function createUser(user, callback){
    console.log("pool: "+pool + " db: "+require("../utils/db"));
    "use strict";
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