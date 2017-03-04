var router = require('express').Router();
var UserController = require("../../controllers/user");
var User = require("../../models/User");
var auth = require("../../controllers/auth");

router.route("/user")
    .post(function (req, res) {
        "use strict";
        console.log(req.body);
        UserController.create(req.body, function (err, user) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            //Add token to response for automatic login
            var token = auth.generateToken(user.user_id);
            res.json({user: user, token: token});
        })
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