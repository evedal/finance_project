var path = require('path');
var pool = require(path.relative('/models/', '/utils/db')).pool;
const sqlCreatePost = "INSERT INTO post SET ?";
const sqlGetPosts = "SELECT * FROM post";
const sqlDeletePost = "DELETE FROM post WHERE post_id = ?";

function createPost(data, callback){
    "use strict";
    pool.query(sqlCreatePost, data, function (result, error) {
        if(error){
            console.log(error);
            return callback(null, error);
        }
        console.log(result);
        data['postId'] = result.insertId;
        return callback(data);
    });
}
function getPosts(callback){
    "use strict";
    pool.query(sqlGetPosts, function (err, result) {
        if (err) {
            console.log(err);
            return callback(null, error)
        }
        return callback(result);
    });
}
function deletePost(id, callback){
    "use strict";
    pool.query(sqlDeletePost, id, function (err, result) {
        if(err){
            console.log(err);
            return callback(null, err);
        }
        return callback(id);
    });
}

module.exports = {
    create: createPost,
    find: getPosts,
    delete: deletePost
};