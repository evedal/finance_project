import React, { Component } from 'react';
import CommentsRecursive from './CommentsRecursive';
import {get} from '../../utils/APImanager'
import commentSort from '../../utils/commentSort';

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
        let commentList;
        let basePath = "/segment/";

        if(this.state.comments.length > 0) {
            let sorted = commentSort(this.state.comments);
            commentList = <CommentsRecursive basePath={basePath} comments={sorted}/>
        }

        return(
            <div>
                { commentList }
            </div>
        )
    }
}
export default Comments;
