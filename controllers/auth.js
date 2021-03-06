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
//Only id is stored in token, front-end gets user-object and stores in session storage
//Simplyfied passport strategy, do we need to find whether its a valid user?
//TODO:
passport.use(new JWTStrategy(params,
    function (jwt_payload, done) {
    /*
        User.findById(jwt_payload.id, function (err, user) {
            if(err) return done(err);
            if(!user) {
                return done(null, false);
            }
            return done(null, user);
        })
    }*/
        return done(null, jwt_payload.id)

    }));
function checkForUser(req,res,next) {
    console.log("\n\n\n")

    console.log(req)
    console.log("\n\n\n")

        passport.authenticate('jwt', {session: false},(err, user, info) => {
            console.log("\n\n\n")
            console.log(err);
            console.log(user)
            console.log("\n\n\n")
            req.user = user;
            return next()
        })(req, res, next);
}

//Used to authenticate user,
function login(email, password, callback) {
    User.findByEmail(email, function (err, user) {
        console.log(err, user);
        if (err) {
            return callback(err)
        }
        if (!user) {
            return callback(null, false)
        }
        //Uses bcrypt to comare passwords, uses salt already stored in same string
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
    login: login,
    checkForUser: checkForUser
}



