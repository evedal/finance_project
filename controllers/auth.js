var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');

passport.use(new BasicStrategy(
    {usernameField: "email"},
    function(email, password, callback) {
        console.log(email, password);
        User.findByEmail(email, function (err, user) {
            console.log(err, user);
            if (err) {
                return callback(err)
            }
            if (!user) {
                return callback(null, false)
            }
            bcrypt.compare(password, user.password, function (err, isMatch) {
                console.log("isMathc: "+isMatch)
                if(err) return callback(err);
                if(isMatch) return callback(null, user);
                return callback(null, isMatch);
            });
        })
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });

