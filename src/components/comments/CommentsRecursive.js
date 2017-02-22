import React, { Component } from 'react';
import { Link } from 'react-router';
import CommentWithFooter from './CommentWithFooter'
import Co from 'react-markdown';
;

/*
    Adds new comments recursivly with children
 */
class CommentsRecursive extends Component{
    render(){
        let props = this.props;
        let commentList = null;
        if(props.comments != undefined) {
            commentList = props.comments.map(function (comment) {
                console.log(comment.children);
                return <CommentWithFooter basePath={props.basePath} currentComment={comment.value}
                                          urlParams={props.urlParams}
                                          childComments={<CommentsRecursive comments={comment.children}/>}/>
            });
        }
        console.log(commentList)
        return(
            <div>
                {commentList}
            </div>
        )
    }
}
export default CommentsRecursive;
