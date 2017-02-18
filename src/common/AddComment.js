import React, { Component } from 'react';
import Comment from '../components/Comment';
import {get} from '../utils/APImanager';

class AddComment extends Component{
    constructor(){
        super();
        this.state = {
            comment: {

            }
        }
    }

    componentDidMount() {
        console.log(this.props);
        get('/api/comment/' + this.props.params.comment_id, function (err, comment) {
            if (err) {
                console.log(err.message);
                return;
            }
            this.setState({comment: comment[0]})
        }.bind(this));
    }

    render(){
        let comment = null;
        if(this.state.comment.comment_id){
            comment = <Comment urlParams = {this.props.params} currentComment = {this.state.comment}/>
        }


        return(
            comment
        )
    }
}
export default AddComment;