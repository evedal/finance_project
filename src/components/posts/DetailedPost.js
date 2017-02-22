import React, { Component } from 'react';
import { Link } from 'react-router';
import Post from './Post';

class DetailedPost extends Component {

    render() {
        let post = this.props.post;
        let encodedHeader = encodeURI(post.header);
        let header = (
            <Link to={'/user/' + post.user_id}>
                <div className="post-head">
                    <h3>av {post.username}</h3>
                </div>
            </Link>
        );
        let contentPath = this.props.basePath + "/post/" + post.post_id + "/" + encodedHeader;
        return <Post basePath={contentPath} currentPost={post} handleLike={this.props.handleLike}
                     header={header}/>
    }
}
export default DetailedPost;