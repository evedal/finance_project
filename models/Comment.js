var pool = require("../utils/db").pool;
const sqlCreateComment = "INSERT INTO comment SET ?";
const sqlGetCommentById = "SELECT * FROM comment WHERE comment_id = ?";
const sqlGetCommentsByPost = "SELECT * FROM comment WHERE post_id = ?";

function createComment(comment_data, callback){
    "use strict";
    pool.query(sqlCreateComment, comment_data, function (err, result) {
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
    pool.query(sqlGetCommentById, comment_id, function (err, comment) {
        if (err) {
            console.log(err);
            return callback(err)
        }
        return callback(null, comment);
    });
}
function getCommentsByPost(post_id, callback){
    "use strict";
    pool.query(sqlGetCommentsByPost, post_id, function (err, comments) {
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