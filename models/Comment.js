
var db = require("../utils/db");
const sqlCreateComment = "INSERT INTO comment SET ?";
const sqlGetCommentById = "SELECT comment.comment_id, comment.content, posted_datetime, post_id, " +
    "comment.user_id, username, parent_comment_id, IFNULL(like_count,0) as like_count, " +
    "FROM comment LEFT JOIN user ON user.user_id = comment.user_id LEFT JOIN (SELECT comment_id, SUM(liked) as like_count " +
    "FROM comment_like GROUP BY comment_id) as cl " +
    "ON cl.comment_id = comment.comment_id WHERE comment.comment_id = ? GROUP BY comment.comment_id;";

const sqlGetCommentByIdAndUser = "SELECT comment.comment_id, comment.content, posted_datetime, post_id, " +
    "comment.user_id, username, parent_comment_id, IFNULL(like_count,0) as like_count, " +
    "IF((select count(*) from comment_like cl WHERE cl.comment_id = comment.comment_id AND user_id = ? AND liked = 1) = 1, true, false) as liked " +
    "FROM comment LEFT JOIN user ON user.user_id = comment.user_id LEFT JOIN (SELECT comment_id, SUM(liked) as like_count " +
    "FROM comment_like GROUP BY comment_id) as cl " +
    "ON cl.comment_id = comment.comment_id WHERE comment.comment_id = ? GROUP BY comment.comment_id;";

const sqlGetCommentsByPost = "SELECT comment.comment_id, comment.content, posted_datetime, post_id, " +
    "comment.user_id, username, parent_comment_id, IFNULL(like_count,0) as like_count " +
    "FROM comment LEFT JOIN user ON user.user_id = comment.user_id LEFT JOIN (SELECT comment_id, SUM(liked) as like_count " +
    "FROM comment_like GROUP BY comment_id) as cl " +
    "ON cl.comment_id = comment.comment_id WHERE comment.post_id = ? GROUP BY comment.comment_id;";

const sqlGetCommentsByPostAndUser = "SELECT comment.comment_id, comment.content, posted_datetime, post_id, " +
    "comment.user_id, username, parent_comment_id, IFNULL(like_count,0) as like_count, " +
    "IF((select count(*) from comment_like cl WHERE cl.comment_id = comment.comment_id AND user_id = ? AND liked = 1) = 1, true, false) as liked " +
    "FROM comment LEFT JOIN user ON user.user_id = comment.user_id LEFT JOIN (SELECT comment_id, SUM(liked) as like_count " +
    "FROM comment_like GROUP BY comment_id) as cl " +
    "ON cl.comment_id = comment.comment_id WHERE comment.post_id = ? GROUP BY comment.comment_id;";


function createComment(comment_data, callback){
    "use strict";
    db.getPool().query(sqlCreateComment, comment_data, function (err, result) {
        if (err) {
            console.log(err);
            return callback(err)
        }
        comment_data['insert_id'] = result.insertId;
        return callback(null, comment_data);
    });
}
function getCommentById(comment_id, user_id, callback) {
    "use strict";
    let sqlPayload;
    let sql;
    if(user_id){
        sqlPayload = [user_id, comment_id];
        sql = sqlGetCommentByIdAndUser;
    }
    else{
        sqlPayload = [comment_id];
        sql = sqlGetCommentById;
    }
    db.getPool().query(sql, sqlPayload, function (err, comment) {
        if (err) {
            console.log(err);
            return callback(err)
        }
        return callback(null, comment);
    });
}
function getCommentsByPost(post_id, user_id, callback){
    "use strict";
    let sqlPayload;
    let sql;
    if(user_id){
        sqlPayload = [user_id, post_id];
        sql = sqlGetCommentsByPostAndUser;
    }
    else{
        sqlPayload = [post_id];
        sql = sqlGetCommentsByPost;
    }
    var query = db.getPool().query(sql, sqlPayload, function (err, comments) {
        console.log(query.sql)
        if(err){
            console.log(err);
            return callback(err);
        }
        return callback(null, comments);
    })
}

module.exports = {
    create: createComment,
    findById: getCommentById,
    findByPost: getCommentsByPost
};