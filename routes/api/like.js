var router = require('express').Router();
var Like = require("../../models/Like");
var auth = require("../../controllers/auth");

router.route("/like/post/:post_id")
    .put(auth.isAuthenticated, function (req, res) {
        let payload = {
            user_id: req.user,
            post_id: req.params.post_id,
            liked: req.body.liked
        }
        Like.putPost(payload, function (err, like) {
            if(err){
                res.status(500);
                res.json(err);
                return;
            }
            res.json(like);
        })
    });
router.route("/like/comment/:comment_id")
    .put(auth.isAuthenticated, function (req, res) {
        let payload = {
            user_id: req.user,
            comment_id: req.params.comment_id,
            liked: req.body.liked
        }
        Like.putComment(payload, function (err, like) {
            if(err){
                res.status(500);
                res.json(err);
                return;
            }
            res.json(like);
        })
    })

module.exports = router;