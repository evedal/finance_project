import Comment from './Comment';
import React, {Component} from 'react';
import { Link } from 'react-router';


class CommentWithFooter extends Component{
    render(){
        let comment = this.props.currentComment;
        let urlParams = this.props.urlParams;
        let children = this.props.childComments;
        console.log("heihei")
        return(
            <Comment currentComment = {comment} childComments = {children} footer = {
                <div className="flex-center comment-footer">
                    <div className="flex-center">
                        <Link to={this.props.basePath}>
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

