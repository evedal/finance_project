var db = require("../utils/db");

const sqlCreateUser = "INSERT INTO user SET ?";
const sqlDeleteUser = "DELETE FROM user WHERE user_id = ?";
const sqlGetUserByEmail = "SELECT * FROM user WHERE email = ?";

function createUser(user, callback){
    "use strict";
    db.getPool().query(sqlCreateUser, user, function (err, result) {
        if(err || !result){
            return callback(err);
        }
        user.user_id = result.insertId;
        callback(null, user);
    });
}
function deleteUser(user_id, callback){
    "use strict";
    db.getPool().query(sqlDeleteUser, user_id, function (err, result) {
        if(err){
            return callback(err);
        }
        return callback(null, result);
    })
}
function getUserByEmail(email, callback) {
    "use strict";
    db.getPool().query(sqlGetUserByEmail, email, function (err, user) {
        if(err){
            console.log(err);
            return callback(err);
        }
        if(!user){
            return callback(null, false);
        }
        return callback(null, user[0]);
    })
}
module.exports = {
    create: createUser,
    findByEmail: getUserByEmail,
    delete: deleteUser
};