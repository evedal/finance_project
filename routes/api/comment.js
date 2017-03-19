var router = require('express').Router();
var Comment = require("../../models/Comment");
import auth from '../../controllers/auth';
router.route("/comment")
    .post(auth.isAuthenticated, function (req, res) {
        "use strict";
        if(req.user) {
            Comment.create(req.body, function (err, result) {
                if (err) {
                    res.status(400);
                    res.json(err);
                }
                res.json(result);
            })
        }
        else{
            res.status(401);
            res.json({message: "Forbidden"})
        }
    });

router.route("/comment/:comment_id")
    .get(auth.isAuthenticated, function (req, res) {
        "use strict";
        Comment.findById(req.params.comment_id, req.user, function (err, comment) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(comment);
        })
    });

router.route("/comment/post/:post_id")
    .get(auth.isAuthenticated, function (req, res) {
        "use strict";
        Comment.findByPost(req.params.post_id, req.user, function (err, comment) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(comment);
        })
    });

module.exports = router;

