import React, { Component } from 'react';
import { Link } from 'react-router';
import { timeSincePosted } from '../utils/format'
class Comment extends Component{
    render(){
        const comment = this.props.currentComment;
        console.log(comment);

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
                {this.props.footer}
            </div>
        )
    }
}
export default Comment;
