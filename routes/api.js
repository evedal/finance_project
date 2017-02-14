var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
router.route('/post')
    .get(function (req, res, next) {
        Post.find(function (err, result) {
            if(err){
                res.json(err);
                return;
            }
            res.json(result);
        });

    });

module.exports = router;