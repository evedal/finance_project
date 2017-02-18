import React, { Component } from 'react';
import { Link } from 'react-router';
import {timeSincePosted} from '../utils/format'
class Post extends Component{
    render(){
        console.log(this.props);
        const post = this.props.currentPost;
        console.log(post);
        let timePresentation = timeSincePosted(post.created_date);
        return(
            <div>
                <Link to = {'/user/'+post.user_id} >
                    <div>
                        <h4>av {post.username}</h4>
                    </div>
                </Link>
                <Link to={'/company/'+post.company_id + "/post/" +post.post_id }>
                    <div>
                        <h3>{ post.header }</h3>
                        <p> { post.content }</p>
                    </div>
                    <div>
                        <span>Postet for { timePresentation } siden</span>
                        <span>{post.comment_count} <i className="material-icons">comment</i></span>
                        <span>{post.like_count} <i className="material-icons">thumb_up</i></span>
                    </div>
                </Link>
            </div>
        )
    }
}
export default Post;