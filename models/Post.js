var pool = require("../utils/db").pool;


const sqlCreatePost = "INSERT INTO post SET ?";


const sqlGetPosts = "SELECT * FROM post";

const sqlGetPostById = "SELECT post.post_id, post.header, SUBSTRING(post.content, 1, 100) as content, post.created_date, post.user_id, " +
    "post.ticker, company.name, post.image_url, post.link_url, username, COUNT(like_id) as like_count, COUNT(comment_id) as comment_count FROM post " +
    "LEFT JOIN user ON post.user_id = user.user_id LEFT JOIN post_like ON post.post_id = post_like.post_id " +
    "LEFT JOIN comment ON comment.post_id = post.post_id JOIN company ON post.ticker = company.ticker " +
    "WHERE post.post_id = ? GROUP BY post_id";

const sqlDeletePost = "DELETE FROM post WHERE post_id = ?";


const sqlUpdatePost = "UPDATE post SET content=? WHERE post_id = ?";


const sqlGetPostsByCompany = "SELECT post.post_id, post.header, SUBSTRING(post.content, 1, 100) as content, post.created_date, post.user_id, " +
    "ticker, post.image_url, post.link_url, username, COUNT(like_id) as like_count, COUNT(comment_id) as comment_count FROM post " +
    "LEFT JOIN user ON post.user_id = user.user_id LEFT JOIN post_like ON post.post_id = post_like.post_id " +
    "LEFT JOIN comment ON comment.post_id = post.post_id WHERE post.ticker = ? GROUP BY post_id ORDER BY created_date DESC LIMIT ?,?";


const sqlGetPostsBySegment = "SELECT post.post_id, post.header, post.content, post.created_date, post.user_id, " +
    "ticker, post.image_url, post.link_url, username, COUNT(like_id) as like_count, COUNT(comment_id) as comment_count FROM post " +
    "LEFT JOIN user ON post.user_id = user.user_id LEFT JOIN post_like ON post.post_id = post_like.post_id " +
    "LEFT JOIN comment ON comment.post_id = post.post_id WHERE ticker IN (SELECT ticker FROM segment " +
    "WHERE name = ?) GROUP BY post_id ORDER BY created_date DESC LIMIT ?,?";


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
            console.log(err);
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
function getPostByCompany(ticker, getDetails, callback) {
    "use strict";
    getDetails.sLimit = (getDetails.sLimit) ? getDetails.sLimit : 0;
    getDetails.eLimit = (getDetails.eLimit) ? getDetails.eLimit : getDetails.sLimit+30;
    var query = pool.query(sqlGetPostsByCompany, [ticker, getDetails.sLimit,getDetails.eLimit], function (err, posts) {
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
function getPostBySegment(name, getDetails, callback) {
    "use strict";
    getDetails.sLimit = (getDetails.sLimit) ? getDetails.sLimit : 0;
    getDetails.eLimit = (getDetails.eLimit) ? getDetails.eLimit : getDetails.sLimit+30;
    var query = pool.query(sqlGetPostsBySegment, [name, getDetails.sLimit,getDetails.eLimit], function (err, posts) {
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

function getOgDataForPost(url, callback){
    "use strict";
    console.log("url"+url);
    var ogs = require('open-graph-scraper');
    ogs({url: url}, function (err, result) {
        if(err || !result || !result.success){
            return callback(err)
        }
        return callback(null,result.data)
    })
}

module.exports = {
    create: createPost,
    find: getPosts,
    findById : getPostById,
    findByCompany: getPostByCompany,
    findBySegment: getPostBySegment,
    update: updatePost,
    delete: deletePost,
    getOgData: getOgDataForPost
};