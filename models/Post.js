var db = require("../utils/db");

const sqlCreatePost = "INSERT INTO post SET ?";


const sqlGetPosts = "SELECT post.post_id, post.header, post.content, post.created_date, post.user_id, " +
    "company.ticker, post.image_url, post.link_url, segment.name, username, IFNULL(like_count,0) as like_count, " +
    "COUNT(comment_id) as comment_count FROM post LEFT JOIN user ON post.user_id = user.user_id " +
    "LEFT JOIN (SELECT post_id, SUM(liked) as like_count FROM post_like GROUP BY post_id) as pl_sum ON pl_sum.post_id = post.post_id" +
    " LEFT JOIN comment ON comment.post_id = post.post_id " +
    "JOIN company ON post.ticker= company.ticker LEFT JOIN segment ON segment.segment_id = company.segment_id " +
    "GROUP BY post_id " +
    "ORDER BY created_date DESC LIMIT ?,?";

const sqlGetPostById = "SELECT post.post_id, post.header, SUBSTRING(post.content, 1, 100) as content, post.created_date, post.user_id, " +
    "post.ticker, company.name, post.image_url, post.link_url, username, IFNULL(like_count,0) as like_count, COUNT(comment_id) as comment_count FROM post " +
    "LEFT JOIN user ON post.user_id = user.user_id LEFT JOIN (SELECT post_id, SUM(liked) as like_count FROM post_like GROUP BY post_id) as pl_sum ON pl_sum.post_id = post.post_id " +
    "LEFT JOIN comment ON comment.post_id = post.post_id JOIN company ON post.ticker = company.ticker " +
    "WHERE post.post_id = ? GROUP BY post.post_id LIMIT 1";

const sqlGetPostByIdAndUser = "SELECT post.post_id, post.header, SUBSTRING(post.content, 1, 100) as content, post.created_date, post.user_id, " +
    "post.ticker, company.name, post.image_url, post.link_url, username, IFNULL(like_count,0) as like_count, COUNT(comment_id) as comment_count, " +
    "IF((select count(*) from post_like WHERE post_like.post_id = post.post_id AND user_id = ? AND liked = 1) = 1, true, false) as liked FROM post " +
    "LEFT JOIN user ON post.user_id = user.user_id LEFT JOIN (SELECT post_id, SUM(liked) as like_count FROM post_like GROUP BY post_id) as pl_sum ON pl_sum.post_id = post.post_id " +
    "LEFT JOIN comment ON comment.post_id = post.post_id JOIN company ON post.ticker = company.ticker " +
    "WHERE post.post_id = ? GROUP BY post.post_id";
const sqlDeletePost = "DELETE FROM post WHERE post_id = ?";


const sqlUpdatePost = "UPDATE post SET content=? WHERE post_id = ?";


const sqlGetPostsByCompany = "SELECT post.post_id, post.header, SUBSTRING(post.content, 1, 100) as content, post.created_date, post.user_id, " +
    "ticker, post.image_url, post.link_url, username, IFNULL(like_count,0) as like_count, COUNT(comment_id) as comment_count FROM post " +
    "LEFT JOIN user ON post.user_id = user.user_id LEFT JOIN (SELECT post_id, SUM(liked) as like_count FROM post_like GROUP BY post_id) as pl_sum ON pl_sum.post_id = post.post_id " +
    "LEFT JOIN comment ON comment.post_id = post.post_id WHERE post.ticker = ? GROUP BY post_id ORDER BY created_date DESC LIMIT ?,?";

const sqlGetPostsByCompanyAndUser = "SELECT post.post_id, post.header, SUBSTRING(post.content, 1, 100) as content, post.created_date, post.user_id, " +
    "ticker, post.image_url, post.link_url, username, IFNULL(like_count,0) as like_count, COUNT(comment_id) as comment_count, " +
    "IF((select count(*) from post_like WHERE post_id = post.post_id AND user_id = ? AND liked = 1) = 1, true, false) as liked FROM post " +
    "LEFT JOIN user ON post.user_id = user.user_id LEFT JOIN (SELECT post_id, SUM(liked) as like_count FROM post_like GROUP BY post_id) as pl_sum ON pl_sum.post_id = post.post_id " +
    "LEFT JOIN comment ON comment.post_id = post.post_id WHERE post.ticker = ? GROUP BY post_id ORDER BY created_date DESC LIMIT ?,?";


const sqlGetPostsBySegment = "SELECT post.post_id, post.header, post.content, post.created_date, post.user_id, " +
    "ticker, post.image_url, post.link_url, username, IFNULL(like_count,0) as like_count, COUNT(comment_id) as comment_count FROM post " +
    "LEFT JOIN user ON post.user_id = user.user_id LEFT JOIN (SELECT post_id, SUM(liked) as like_count FROM post_like GROUP BY post_id) as pl_sum ON pl_sum.post_id = post.post_id " +
    "LEFT JOIN comment ON comment.post_id = post.post_id WHERE ticker IN (SELECT ticker FROM segment " +
    "WHERE name = ?) GROUP BY post_id ORDER BY created_date DESC LIMIT ?,?";

const sqlGetPostsBySegmentAndUser = "SELECT post.post_id, post.header, post.content, post.created_date, post.user_id, " +
    "ticker, post.image_url, post.link_url, username, IFNULL(like_count,0) as like_count, COUNT(comment_id) as comment_count, " +
    "IF((select count(*) from post_like WHERE post_id = post.post_id AND user_id = ? AND liked = 1) = 1, true, false) as liked  FROM post " +
    "LEFT JOIN user ON post.user_id = user.user_id LEFT JOIN (SELECT post_id, SUM(liked) as like_count FROM post_like GROUP BY post_id) as pl_sum ON pl_sum.post_id = post.post_id " +
    "LEFT JOIN comment ON comment.post_id = post.post_id WHERE ticker IN (select c.ticker from segment s LEFT JOIN company c ON c.segment_id = s.segment_id where s.name = ?) "+
    "GROUP BY post_id ORDER BY created_date DESC LIMIT ?,?";

const sqlGetPostsByUser = "SELECT post.post_id, post.header, post.content, post.created_date, post.user_id, " +
    "company.ticker, post.image_url, post.link_url, segment.name, username, IFNULL(like_count,0) as like_count, " +
    "COUNT(comment_id) as comment_count, IF((select count(*) from post_like WHERE post_id = post.post_id AND user_id = ? AND liked = 1) = 1, true, false) as liked " +
    "FROM post LEFT JOIN user ON post.user_id = user.user_id " +
    "LEFT JOIN (SELECT post_id, SUM(liked) as like_count FROM post_like GROUP BY post_id) as pl_sum ON pl_sum.post_id = post.post_id LEFT JOIN comment ON comment.post_id = post.post_id " +
    "JOIN company ON post.ticker= company.ticker LEFT JOIN segment ON segment.segment_id = company.segment_id " +
    "WHERE post.ticker IN (select c.ticker from segment s LEFT JOIN company c ON c.segment_id = s.segment_id where s.name = ?) " +
    "GROUP BY post_id ORDER BY created_date DESC LIMIT ?,?";

function createPost(post_params, callback){
    "use strict";
    var query = db.getPool().query(sqlCreatePost, post_params, function (err, result) {
        if(err){
            console.log(err);
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
    let limits = [0, 30];
    db.getPool().query(sqlGetPosts,limits,  function (err, result) {
        if (err) {
            console.log(err);
            return callback(err)
        }
        return callback(err, result);
    });
}
function getPostById(post_id, user_id, callback){
    "use strict";
    let sqlPayload;
    let sql;
    if(user_id){
        sqlPayload = [user_id, post_id];
        sql = sqlGetPostByIdAndUser;
    }
    else{
        sqlPayload = [post_id];
        sql = sqlGetPostById;
    }
    var query = db.getPool().query(sql, sqlPayload, function (err, result) {
        console.log(query.sql);
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
function getPostByCompany(ticker, user_id, getDetails, callback) {
    "use strict";
    "use strict";
    let sqlPayload;
    let sql;
    if(user_id){
        sqlPayload = [user_id, ticker];
        sql = sqlGetPostsByCompanyAndUser;
    }
    else{
        sqlPayload = [ticker];
        sql = sqlGetPostsByCompany;
    }
    let index = sqlPayload.push((getDetails.sLimit) ? getDetails.sLimit : 0);
    sqlPayload.push((getDetails.eLimit) ? getDetails.eLimit : sqlPayload[index-1]+30)
    var query = db.getPool().query(sql, sqlPayload, function (err, posts) {
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
function getPostBySegment(name, user_id, getDetails, callback) {
    "use strict";
    let sqlPayload;
    let sql;
    if(user_id){
        sqlPayload = [user_id, name];
        sql = sqlGetPostsBySegmentAndUser;
    }
    else{
        sqlPayload = [name];
        sql = sqlGetPostsBySegment;
    }
    let index = sqlPayload.push((getDetails.sLimit) ? getDetails.sLimit : 0);
    sqlPayload.push((getDetails.eLimit) ? getDetails.eLimit : sqlPayload[index-1]+30)
    var query = db.getPool().query(sql, sqlPayload, function (err, posts) {
        console.log(query.sql)
        if(err){
            console.log(err);
            return callback(err);
        }
        return callback(null, posts);
    });
}
function updatePost(post_content, post_id, callback){
    "use strict";
    var query = db.getPool().query(sqlUpdatePost, [post_content,post_id], function (err, result) {
        if(err){
            return callback(err);
        }
        return callback(null, result);
    });
}
function deletePost(post_id, callback){
    "use strict";
    var query = db.getPool().query(sqlDeletePost, post_id, function (err, result) {
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
function getPostByUser(user_id, getDetails, callback) {
    "use strict";
    getDetails.sLimit = (getDetails.sLimit) ? getDetails.sLimit : 0;
    getDetails.eLimit = (getDetails.eLimit) ? getDetails.eLimit : getDetails.sLimit+30;
    var query = db.getPool().query(sqlGetPostsByUser, [user_id, user_id, getDetails.sLimit,getDetails.eLimit], function (err, posts) {
        if(err){
            console.log(err);
            return callback(err);
        }
        console.log(posts);
        return callback(null, posts);
    });
}
module.exports = {
    create: createPost,
    find: getPosts,
    findById : getPostById,
    findByCompany: getPostByCompany,
    findBySegment: getPostBySegment,
    findByUser: getPostByUser,
    update: updatePost,
    delete: deletePost,
    getOgData: getOgDataForPost
};