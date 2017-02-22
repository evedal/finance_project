var router = require('express').Router();
var Segment = require("../../models/Segment");
router.route("/segment/:name")
    .get(function (req, res) {
        "use strict";
        Segment.findByName(req.params.name, function (err, segment) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(segment);
        })
    });

module.exports = router;