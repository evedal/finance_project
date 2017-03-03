var router = require('express').Router();
var auth = require("../../controllers/auth");
router.route("/auth/login")
    .post(function (req, res) {
        "use strict";
        console.log(req.body);
        auth.login(req.body.email, req.body.password, function (err, result) {
            if(err){
                console.log(err)
                res.status(400);
                res.json(err);
            }
            res.json(result);
        })
    });

module.exports = router;

