var User = require('../models/User');
var crypto = require('crypto');

function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);
    /** return required number of characters */
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512 (password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        hash: value,
        salt: salt,

    };
}
function createUser(user, callback){
    "use strict";
    if(!user.first_name || !user.last_name || !user.username || !user.password || user.password.length < 8){
        return callback({message: "Password too short", status : 400});
    }
    var hashPass = sha512(user.password, generateRandomString(16));
    var user = {
        first_name : user.first_name,
        last_name : user.last_name,
        username : user.username,
        email : user.email,
        hash : hashPass.hash,
        salt : hashPass.salt,
        is_page_admin : false,
        removed : 0
    };

    User.create(user, callback)
}
module.exports = {
    create: createUser
    }
