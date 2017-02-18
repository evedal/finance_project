import React, { Component } from 'react';
import CommentWithFooter from './CommentWithFooter';
import {get} from '../utils/APImanager'

class Comments extends Component{
    constructor(){
        super();
        this.state = {
            comments: [

            ]
        }
    }
    componentDidMount(){
        console.log(this.props);
        get('/api/comment/post/'+this.props.urlParams.post_id, function (err, comments) {
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({comments: comments})
        }.bind(this));

    }
    render(){
        const commentList = this.state.comments.map((comment, i) => {
            console.log(comment);
            return(
                <div>
                    <CommentWithFooter currentComment = {comment} urlParams = {this.props.urlParams}/>
                </div>
            )
        });
        return(
            <div>
                { commentList }
            </div>
        )
    }
}
export default Comments;
