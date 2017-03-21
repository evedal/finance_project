import React, { Component } from 'react';
import { Link } from 'react-router';
import format from '../../utils/format';
class Post extends Component{
/*
    Basepath is generated as more components are called.
    Top components generate path for segment and segment_name
    Posts adds company and ticker to path
    Post finally adds post_id and slug to the path
 */
    render(){
        console.log(this.props);
        const post = this.props.currentPost;
        let timePresentation = format.timeSincePosted(post.created_date);
        let content;
        let likeContent;
        let encodedHeader = format.formatUrl(post.header);
        let contentPath = this.props.basePath+"/post/"+post.post_id+"/"+encodedHeader;
        if(post.image_url){
            content = (
                <Link to = {contentPath } >
                    <img src={post.image_url} />
                    <h5>{post.header}</h5>
                </Link>
            );
        }
        else{
            content = (
                <Link to = {contentPath } >
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
                {this.props.header}
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