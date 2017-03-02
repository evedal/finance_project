var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');


function createUser(user, callback){
    "use strict";
    if(!user.first_name || !user.last_name || !user.username || !user.email ||!user.password || user.password.length < 8){
        return callback({message: "Password too short", status : 400});
    }
    //Generate salt
    bcrypt.genSalt(5, function (err, salt) {
        if(err) return callback(err);
        console.log(user);

        //Success, generate hash
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if(err) return callback(err);

            //Create user object
            var processedUser = {
                first_name : user.first_name,
                last_name : user.last_name,
                username : user.username,
                email : user.email,
                password : hash,
                is_page_admin : false,
                removed : 0
            };
            //Send call to model
            console.log(user);
            User.create(processedUser, callback)
        })

    })

}

module.exports = {
    create: createUser,
};
