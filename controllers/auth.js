var passport = require('passport');
var passportJWT = require('passport-jwt');
var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');
var cfg = require("../config");
var jwt = require('jsonwebtoken');
var ExtractJWT = passportJWT.ExtractJwt;
var JWTStrategy = passportJWT.Strategy;

var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJWT.fromAuthHeader(),

};

//Creates a strategy that find the user and adds it to the request
//Only id is stored in token, front-end gets user-object and stores in session
passport.use(new JWTStrategy(params,
    function (jwt_payload, done) {
        User.findById(jwt_payload.id, function (err, user) {
            if(err) return done(err);
            if(!user) {
                return done(null, false);
            }
            return done(null, user);
        })
    }

));

//Used to authenticate user,
function login(email, password, callback) {
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
            console.log("isMatch: "+isMatch);
            if(err) return callback(err);
            if(isMatch) {
                var token = generateToken(user.user_id);
                return callback(null, {success: true, token: token});
            }
            return callback(null, isMatch);
        });
    })
}
function generateToken(user_id) {
    return jwt.sign({id: user_id}, cfg.jwtSecret, {
        expiresIn: "7 days"
    });
}

module.exports = {
    isAuthenticated: passport.authenticate('jwt', {session: false}),
    generateToken: generateToken,
    login: login

}



