export default {
    company: {
        base: "/api/company"
    },
    post: {
        like: (post_id) => {
            return "/api/like/post/"+post_id;
        },
        post: (post_id) => {
            "use strict";
            if (post_id){
                return "/api/post"+post_id;
            }
            return "/api/post";
        }
    },
    comment: {
        like: (comment_id) => {
            return "/api/like/comment/"+comment_id;
        }
    }
}