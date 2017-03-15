export default {
    company: {
        base: "/api/company"
    },
    post: {
        like: (post_id, user_id) => {
            return "api/post/"+post_id+"/user/"+user_id;
        }
    }
}