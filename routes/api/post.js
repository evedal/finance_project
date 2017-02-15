var router = require('express').Router();
var Post = require('../../models/Post');

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
    .post(function (req, res) {
        console.log(req.body);
        Post.create(req.body, function (err, result) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(result);
        })
    });

//Create REST route for spesific posts
router.route('/post/:post_id')
    .get(function (req,res) {
        Post.findById(req.params.post_id, function (err, post) {
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
router.route('/post/company/:company_id')
    .get(function (req, res) {
        Post.findByCompany(req.params.company_id, req.query, function (err, posts) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(posts);
        })
    });

//getDetails{sLimit: start limit, eLimit: end limit}
router.route('/post/segment/:segment_id')
    .get(function (req, res) {
        Post.findBySegment(req.params.segment_id, req.query, function (err, posts) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(posts);
        })
    });

module.exports = router;