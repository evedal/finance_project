import Comment from './Comment';
import React, {Component} from 'react';
import { Link } from 'react-router';

class CommentWithFooter extends Component{
    render(){
        let comment = this.props.currentComment;
        let urlParams = this.props.urlParams;

        return(
            <Comment currentComment = {comment} footer = {
                <div className="flex-center comment-footer">
                    <div className="flex-center">
                        <Link to={`/company/${urlParams.company_id}/post/${urlParams.post_id}/comment/${comment.comment_id}`}>
                            <span>Svar</span>
                        </Link>

                        <div className="flex-center comment-like">
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

