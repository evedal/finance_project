import React, { Component } from 'react';
import { Link } from 'react-router';
import CommentWithFooter from './CommentWithFooter'


/*
    Adds new comments recursivly with children
 */
class CommentsRecursive extends Component{
    render(){
        let props = this.props;
        let commentList = null;
        if(props.comments != undefined) {
            commentList = props.comments.map((comment) => {
                console.log(comment.children);
                return <CommentWithFooter basePath={props.basePath} currentComment={comment.value}
                                          key={comment.value.comment_id}
                                          handleLike={props.handleLike}
                                          childComments={<CommentsRecursive comments={comment.children}
                                          basePath = {props.basePath} handleLike={props.handleLike}/>}/>
            });
        }
        return(
            <div className="comments">
                {commentList}
            </div>
        )
    }
}
export default CommentsRecursive;
