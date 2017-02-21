import React, { Component } from 'react';
import { Link } from 'react-router';
import {timeSincePosted} from '../utils/format'
class Post extends Component{

    render(){
        console.log(this.props);
        const post = this.props.currentPost;
        let timePresentation = timeSincePosted(post.created_date);
        let content;
        let likeContent;
        if(post.image_url){
            content = (
                <Link to = {'/company/'+post.company_id + "/post/" +post.post_id } >
                    <img src={post.image_url}/>
                    <h5>{post.header}</h5>
                </Link>
            );
        }
        else{
            content = (
                <Link to = {'/company/'+post.company_id + "/post/" +post.post_id } >
                    <h5>{post.header}</h5>
                    <p>{post.content}</p>
                </Link>
            )
        }
        if(post.liked){
            likeContent = (
                <div className="post-likes flex-center cursor-point liked" onClick={this.props.handleLike}>
                    <span>{post.like_count}</span>
                    <i className="material-icons ">thumb_up</i>
                </div>
            );
        }
        else{
            likeContent = (
                <div className="post-likes flex-center cursor-point" onClick={this.props.handleLike}>
                    <span>{post.like_count}</span>
                    <i className="material-icons ">thumb_up</i>
                </div>
            )
        }
        return(
            <div className="post">
                <Link to = {'/user/'+post.user_id} >
                    <div className="post-head">
                        <h3>av {post.username}</h3>
                    </div>
                </Link>
                <div className="post-content">
                    {content}
                    <div className="post-footer flex-center">
                        <span>Postet for {timePresentation} siden</span>
                        <div className="footer-icons flex-center">
                            <div className="post-comments flex-center">
                                <span>{post.comment_count}</span>
                                <i className="material-icons ">chat</i>
                            </div>
                            {likeContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Post;