var router = require('express').Router();
var Comment = require("../../models/Comment");
router.route("/comment")
    .post(function (req, res) {
        "use strict";
        Comment.create(req.body, function (err, result) {
            if(err){
                res.status(400);
                res.json(err);
            }
            res.json(result);
        })
    });

router.route("/comment/:comment_id")
    .get(function (req, res) {
        "use strict";
        Comment.findById(req.params.comment_id, function (err, comment) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(comment);
        })
    });

router.route("/comment/post/:post_id")
    .get(function (req, res) {
        "use strict";
        Comment.findByPost(req.params.post_id, function (err, comment) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(comment);
        })
    });

module.exports = router;

