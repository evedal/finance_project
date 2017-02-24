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
        get('/api/comment/post/'+this.props.params.post_id, function (err, comments) {
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({comments: comments})
        }.bind(this));

    }

    render(){
        let commentList;
        let params = this.props.params;

        let basePath = "/segment/"+params.name+"/company/"+params.ticker+"/post/"+params.post_id;

        if(this.state.comments.length > 0) {
            let sorted = commentSort(this.state.comments);
            commentList = (
                    <CommentsRecursive basePath={basePath} comments={sorted}/>
            )
        }

        return(
            <div className="all-comments">
                { commentList }
            </div>
        )
    }
}
export default Comments;
