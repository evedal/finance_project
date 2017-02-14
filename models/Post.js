var path = require('path');
var dbPath = path.join('../utils/db');
console.log(dbPath);
var pool = require(dbPath).pool;
const sqlCreatePost = "INSERT INTO post SET post_id=DEFAULT,created_date=DEFAULT,removed=DEFAULT,?";
const sqlGetPosts = "SELECT * FROM post";
const sqlGetPostById = "SELECT * FROM post WHERE post_id = ?";
const sqlDeletePost = "DELETE FROM post WHERE post_id = ?";
const sqlUpdatePost = "UPDATE post SET ?";


function createPost(post_params, callback){
    "use strict";
    var query = pool.query(sqlCreatePost, post_params, function (err, result) {
        if(err){
            return callback(err);
        }
        post_params['post_id'] = result.insertId;
        return callback(null, post_params);
    });
    console.log(query.sql);
    console.log(post_params);
}
function getPosts(callback){
    "use strict";
    pool.query(sqlGetPosts, function (err, result) {
        if (err) {
            console.log(err);
            return callback(err)
        }
        return callback(err, result);
    });
}
function getPostById(post_id, callback){
    "use strict";
    pool.query(sqlGetPostById, post_id, function (err, result) {
        if(err){
            return callback(err);
        }
        return callback(null, result);
    })
}
function updatePost(post_data, callback){
    "use strict";
    pool.query(sqlUpdatePost, post_data, function (err, result) {
        if(err){
            return callback(err);
        }
        return callback(null, result);
    });

}
function deletePost(post_id, callback){
    "use strict";
    var query = pool.query(sqlDeletePost, post_id, function (err, result) {
        if(err){
            return callback(err);
        }
        return callback(null, result);
    });
    console.log(query.sql);
    console.log(post_id);
}

module.exports = {
    create: createPost,
    find: getPosts,
    findById : getPostById,
    update: updatePost,
    delete: deletePost
};