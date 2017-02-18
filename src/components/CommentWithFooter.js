import Comment from './Comment';
import React, {Component} from 'react';
import { Link } from 'react-router';

class CommentWithFooter extends Component{
    render(){
        let comment = this.props.currentComment;
        let urlParams = this.props.urlParams;

        return(
            <Comment currentComment = {comment} footer = {
                <div>
                    <Link to={`/company/${urlParams.company_id}/post/${urlParams.post_id}/comment/${comment.comment_id}`}>
                        <span>Svar</span>
                    </Link>
                    <span>{comment.like_count} <i className="material-icons">thumb_up</i></span>
                    <span>Merk som spam</span>
                </div>
            } />
        )
    }
}
export default CommentWithFooter;

