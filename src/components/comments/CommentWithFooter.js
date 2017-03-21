import Comment from './Comment';
import React, {Component} from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';


class CommentWithFooter extends Component{
    render(){
        let comment = this.props.currentComment;
        let children = this.props.childComments;
        let iconClasses = classNames({
            "flex-center": true,
            "comment-like": true,
            "liked": comment.liked
        });
        console.log(this.props.handleLike);
        return(
            <Comment currentComment = {comment} childComments = {children} footer = {
                <div className="flex-center comment-footer">
                    <div className="flex-center">
                        <Link to={this.props.basePath+"/comment/"+comment.comment_id}>
                            <span>Svar</span>
                        </Link>

                        <div className={iconClasses} onClick={this.props.handleLike} data-id={comment.comment_id}>
                            <span>{comment.like_count}</span>
                            <i className="material-icons">thumb_up</i>
                        </div>
                    </div>
                    <span>Merk som spam</span>
                </div>
            } />
        )
    }
}

export default CommentWithFooter;

