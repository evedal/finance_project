var pool = require("../utils/db").pool;
const sqlCreatePost = "INSERT INTO post SET ?";
const sqlGetPosts = "SELECT * FROM post";
const sqlGetPostById = "SELECT * FROM post WHERE post_id = ?";
const sqlDeletePost = "DELETE FROM post WHERE post_id = ?";
const sqlUpdatePost = "UPDATE post SET content=? WHERE post_id = ?";
const sqlGetPostsByCompany = "SELECT * FROM post WHERE company_id = ? ORDER BY created_date DESC LIMIT ?,?";
const sqlGetPostsBySegment = "SELECT * FROM post WHERE company_id IN (SELECT company_id FROM segment WHERE segment_id = ?) ORDER BY created_date DESC LIMIT ?,?";


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
/*
 params:
 getDetails {
 sLimit: Start limit,
 eLimit: End limit
 }
 Order by is hardcoded to created_date
 */
function getPostByCompany(company_id, getDetails, callback) {
    "use strict";
    getDetails.sLimit = (getDetails.sLimit) ? getDetails.sLimit : 0;
    getDetails.eLimit = (getDetails.eLimit) ? getDetails.eLimit : getDetails.sLimit+30;
    var query = pool.query(sqlGetPostsByCompany, [company_id, getDetails.sLimit,getDetails.eLimit], function (err, posts) {
        if(err){
            console.log(err);
            return callback(err);
        }
        return callback(null, posts);
    });
}
/*
 params:
 getDetails {
 sLimit: Start limit,
 eLimit: End limit
 }
 Order by is hardcoded to created_date
 */
function getPostBySegment(segment_id, getDetails, callback) {
    "use strict";
    getDetails.sLimit = (getDetails.sLimit) ? getDetails.sLimit : 0;
    getDetails.eLimit = (getDetails.eLimit) ? getDetails.eLimit : getDetails.sLimit+30;
    var query = pool.query(sqlGetPostsBySegment, [segment_id, getDetails.sLimit,getDetails.eLimit], function (err, posts) {
        if(err){
            console.log(err);
            return callback(err);
        }
        return callback(null, posts);
    });
}
function updatePost(post_content, post_id, callback){
    "use strict";
    var query = pool.query(sqlUpdatePost, [post_content,post_id], function (err, result) {
        if(err){
            return callback(err);
        }
        return callback(null, result);
    });
    console.log(query)

}
function deletePost(post_id, callback){
    "use strict";
    var query = pool.query(sqlDeletePost, post_id, function (err, result) {
        if(err){

            return callback(err);
        }
        return callback(null, result);
    });
}

module.exports = {
    create: createPost,
    find: getPosts,
    findById : getPostById,
    findByCompany: getPostByCompany,
    findBySegment: getPostBySegment,
    update: updatePost,
    delete: deletePost
};