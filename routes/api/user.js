var router = require('express').Router();
var UserController = require("../../controllers/UserController");
router.route("/user")
    .post(function (req, res) {
        "use strict";
        UserController.create(req.body, function (err, user) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(user);
        })
    });

module.exports = router;