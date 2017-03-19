import React, { Component } from 'react';
import { Link } from 'react-router';
import format from '../../utils/format';
import ReactMarkDown from 'react-markdown';
import CommentsRecursive from './CommentsRecursive';
class Comment extends Component{
    render(){
        const comment = this.props.currentComment;
        console.log(comment);
        let timeFormatted = format.timeSincePosted(comment.posted_datetime);
        return(
            <div className="comment">
                <Link to = {'/user/'+comment.user_id} >
                    <h3>av {comment.username} - {timeFormatted} siden</h3>
                </Link>
                <div className="markdown">
                    <ReactMarkDown source={comment.content} escapeHtml = {true} />
                </div>
                {this.props.footer}
                {this.props.childComments}
            </div>
        )
    }
}
export default Comment;
