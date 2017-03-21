var router = require('express').Router();
var Post = require('../../models/Post');
var auth = require('../../controllers/auth');

//Create rest routes for posts
router.route('/post')
    .get(function (req, res) {
        Post.find(function (err, posts) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(posts);
        });
    })
    .post(auth.isAuthenticated, function (req, res) {
        if(req.user == req.body.user_id ) {
            Post.create(req.body, function (err, result) {
                if(err){
                    res.status(400);
                    res.json(err);
                    return;
                }
                res.json(result);
            });
        }
        else{
            res.status(401);
            res.json({message: "Forbidden"})
        }

    });

//Create REST route for spesific posts
router.route('/post/:post_id')
    .get(auth.isAuthenticated, function (req,res) {
        console.log("USER_ID "+req.user)
        Post.findById(req.params.post_id, req.user, function (err, post) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(post);
        })
    })
    .delete(function (req, res) {
        Post.delete(req.params.post_id, function (err, result) {
            if (err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(result);
        })
    })
    .put(function (req, res) {
        Post.update(req.body.content, req.params.post_id,function (err, result) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(result);
        })
    });

//Route for posts from company
//getDetails{sLimit: startCount, eLimit: endCount}
router.route('/post/company/:ticker')
    .get(auth.isAuthenticated, function (req, res) {
        Post.findByCompany(req.params.ticker, req.user, req.body, function (err, posts) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(posts);
        })
    });

//getDetails{sLimit: start limit, eLimit: end limit}
router.route('/post/segment/:name')
    .get(auth.isAuthenticated, function (req, res) {
        Post.findBySegment(req.params.name, req.user, req.body, function (err, posts) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(posts);
        })
    });

router.route('/post/user/:user_id')
    .get(function (req, res) {
        Post.findByUser(req.params.user_id, req.body, function (err, posts) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(posts);
        })
    });

router.route('/post/ogdata/:url')
    .get(function (req, res) {
        Post.getOgData(req.params.url, function (err, data) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            console.log(data)
            res.json(data);
        })
    });

module.exports = router;