import React, { Component } from 'react';
import { Link } from 'react-router';
import { timeSincePosted } from '../utils/format'
class Comment extends Component{
    render(){
        console.log(this.props);
        const comment = this.props.currentComment;
        let timeFormatted = timeSincePosted(comment.posted_datetime);
        return(
            <div>
                <Link to = {'/user/'+comment.user_id} >
                    <div>
                        <h4>av {comment.username} - {timeFormatted} siden</h4>
                    </div>
                </Link>
                <div>
                    <p>{ comment.content }</p>
                </div>
                <div>
                    <Link to="/">
                        <span>Svar</span>
                    </Link>
                    <span>{comment.like_count} <i className="material-icons">thumb_up</i></span>
                    <span>Merk som spam</span>
                </div>
            </div>
        )
    }
}
export default Comment;
