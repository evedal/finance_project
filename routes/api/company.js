var router = require('express').Router();
var Company = require("../../models/Company");
var CompanyController = require("../../controllers/company");
var auth = require("../../controllers/auth");

router.route("/company")
    .post(auth.isAuthenticated, function (req, res) {
        CompanyController.create(req.body, function (err, company) {
            if(err){
                res.status(500);
                res.json(err);
                return;
            }
            res.json(company);
        })
    })
    .get(function (req, res) {
        console.log("heihei");
        "use strict";
        Company.find(function (err, companies) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(companies);
        })
    });
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