import {put} from './APImanager';
import APIRoute from './messages/APIRoute';
export default {
    handleLike: (post_id, liked, callback) => {
        let payload = {
            liked: liked
        };
        put(APIRoute.post.like(post_id),
            payload, (err, result) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, result)
            });
    }
}