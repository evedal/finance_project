import React, { Component } from 'react';
import Comment from './Comment';
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
        get('/api/comment/post/'+this.props.post_id, function (err, comments) {
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
                    <Comment currentComment = {comment}/>
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
