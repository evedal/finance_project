var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

//Create rest routes for posts
router.route('/post')
    .get(function (req, res, next) {
        Post.find(function (err, posts) {
            if(err){
                res.status(400);
                res.json(err);
                return;
            }
            res.json(posts);
        });
    })
    .post(function (req, res, next) {
        console.log(req.body);
        Post.create(req.body, function (err, result) {
            if(err){
                res.status(400);
                res.json(err);
            }
            res.json(result);
        })
    });

//Create REST route for spesific posts
router.route('/post/:post_id')
    .get(function (req,res, next) {
        Post.findById(req.params.post_id, function (err, post) {
            if(err){
                res.status(400);
                res.json(err);
            }
            res.json(post);
        })
    })
    .delete(function (req, res, next) {
        Post.delete(req.params.post_id, function (err, result) {
            if (err){
                res.status(400);
                res.json(err);
            }
            res.json(result);
        })
    })
    .put(function (req, res, next) {
        Post.update(req.body, function (err, result) {
            if(err){
                res.status(400);
                res.json(err);
            }
            res.json(result);
        })
    });


module.exports = router;