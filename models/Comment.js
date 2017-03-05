
var db = require("../utils/db");
const sqlCreateComment = "INSERT INTO comment SET ?";
const sqlGetCommentById = "SELECT comment.comment_id, comment.content, posted_datetime, post_id, " +
    "comment.user_id, username, parent_comment_id, COUNT(like_id) as like_count " +
    "FROM comment LEFT JOIN user ON user.user_id = comment.user_id LEFT JOIN comment_like " +
    "ON comment_like.comment_id = comment.comment_id WHERE comment.comment_id = ? GROUP BY comment.comment_id;";
const sqlGetCommentsByPost = "SELECT comment.comment_id, comment.content, posted_datetime, post_id, " +
    "comment.user_id, username, parent_comment_id, COUNT(like_id) as like_count " +
    "FROM comment LEFT JOIN user ON user.user_id = comment.user_id LEFT JOIN comment_like " +
    "ON comment_like.comment_id = comment.comment_id WHERE comment.post_id = ? GROUP BY comment.comment_id;";

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
function getCommentById(comment_id, callback) {
    "use strict";
    db.getPool().query(sqlGetCommentById, comment_id, function (err, comment) {
        if (err) {
            console.log(err);
            return callback(err)
        }
        return callback(null, comment);
    });
}
function getCommentsByPost(post_id, callback){
    "use strict";
    db.getPool().query(sqlGetCommentsByPost, post_id, function (err, comments) {
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