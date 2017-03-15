import React, { Component } from 'react';
import CommentsRecursive from './CommentsRecursive';
import {get} from '../../utils/APImanager'
import commentSort from '../../utils/commentSort';
import Loader from '../other/Loader';

class Comments extends Component{
    constructor(){
        super();
        this.state = {
            comments: [

            ],
            isLoaded: false
        }
    }
    componentDidMount(){
        get('/api/comment/post/'+this.props.params.post_id, function (err, comments) {
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({comments: commentSort(comments), isLoaded: true})
        }.bind(this));

    }

    render(){
        let commentList;
        let params = this.props.params;

        let basePath = "/segment/"+params.name+"/company/"+params.ticker+"/post/"+params.post_id;

        if(this.state.comments.length > 0) {
            commentList = (
                    <CommentsRecursive basePath={basePath} comments={this.state.comments}/>
            )
        }

        return(
            <Loader isLoaded={this.state.isLoaded}>
                <div className="all-comments">
                    { commentList }
                </div>
            </Loader>

        )
    }
}
export default Comments;
