var router = require('express').Router();
var Company = require("../../models/Company");
router.route("/company/:ticker")
    .get(function (req, res) {
        "use strict";
        Company.findById(req.params.ticker, function (err, company) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(company);
        })
    });

module.exports = router;