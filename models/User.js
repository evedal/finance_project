var db = require("../utils/db");

const sqlCreateUser = "INSERT INTO user SET ?";
const sqlDeleteUser = "DELETE FROM user WHERE user_id = ?";

function createUser(user, callback){
    "use strict";
    console.log(db);
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

module.exports = {
    create: createUser,
    delete: deleteUser
};