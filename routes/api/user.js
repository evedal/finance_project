var router = require('express').Router();
var UserController = require("../../controllers/user");
var auth = require("../../controllers/auth");

router.route("/user")
    .post(function (req, res) {
        "use strict";
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
    });

module.exports = router;