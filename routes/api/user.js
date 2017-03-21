var router = require('express').Router();
var UserController = require("../../controllers/user");
var SubController = require("../../controllers/subscription");

var User = require("../../models/User");
var auth = require("../../controllers/auth");
var Company = require("../../models/Company");
var async = require('async')
router.route("/user")
    .post(function (req, res) {
        "use strict";
        console.log(req.body);
        let createUser = new Promise((resolve, reject) => {
            UserController.create(req.body, function (err, user) {
                if (err || !user) {
                    err = err ? err : {message: "Issue creating user"};
                    reject(err);
                    return;
                }
                //Add token to response for automatic login
                var token = auth.generateToken(user.user_id);
                resolve({user: user, token: token});
            })
        });
        let findCompanies = new Promise((resolve, reject) => {
            Company.find((err, companies) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log("COMPANIES");
                console.log(companies)
                resolve(companies);

            });
        });
        Promise.all([createUser, findCompanies]).then((values) => {
            var userAndToken = values[0];
            var companies = values[1];
            console.log("HER KOMMER SELSKAPENE");
            console.log(companies[0]);
            res.json(userAndToken);
            SubController.addSubs(userAndToken.user, companies, (err, success) => {
                console.log("_________HEIHEI________")
                console.log(err, success)
            });
        }).catch((reason) => {
            console.log("ERROR", reason);
            res.json(reason);
            res.status(200);
        });
    })
    .get(auth.isAuthenticated, function (req, res) {
        User.findById(req.user, function (err, user) {
            if(err) {
                res.status(500);
                res.json(err);
                return;
            }
            if(!user){
                res.status(404);
                res.json({message: "User not found"});
                return;
            }
            res.json(user)
        })

    });

module.exports = router;