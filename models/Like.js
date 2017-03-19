var db = require("../utils/db");

const sqlUpdatePostLike = "INSERT INTO post_like (user_id,post_id,liked) VALUES(?,?,?) ON DUPLICATE KEY UPDATE liked = ?;";
const sqlUpdateCommentLike = "INSERT INTO comment_like (user_id,comment_id,liked) VALUES(?,?,?) ON DUPLICATE KEY UPDATE liked = ?;";

function updatePostLike(like, callback){
    "use strict";
    let query = db.getPool().query(sqlUpdatePostLike, [like.user_id, like.post_id, like.liked, like.liked], function (err, result) {
        console.log(query.sql)
        if(err || !result){

            return callback(err);
        }
        callback(null, result);
    });
}
function updateCommentLike(like, callback){
    "use strict";
    db.getPool().query(sqlUpdateCommentLike, [like.user_id, like.comment_id, like.liked, like.liked], function (err, result) {
        if(err || !result){
            return callback(err);
        }
        callback(null, result);
    });
}

module.exports = {
    putPost: updatePostLike,
    putComment: updateCommentLike
};