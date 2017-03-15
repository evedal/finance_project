var router = require('express').Router();
var Segment = require("../../models/Segment");

router.route("/segment")
    .get(function (req, res) {
        "use strict";
        console.log(req);
        Segment.find(function (err, segments) {
            if(err){
                console.log(err);
                res.status(500);
                res.json(err);
                return;
            }
            res.json(segments);
        })
    });

router.route("/segment/:name")
    .get(function (req, res) {
        "use strict";
        Segment.findByName(req.params.name, function (err, segment) {
            if(err){
                res.status(500);
                res.json(err);
                return;
            }
            res.json(segment);
        })
    });

module.exports = router;