var router = require('express').Router();
var Company = require("../../models/Company");
router.route("/company/:company_id")
    .get(function (req, res) {
        "use strict";
        Company.findById(req.params.company_id, function (err, company) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(company);
        })
    });

module.exports = router;