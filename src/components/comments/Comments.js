import React, { Component } from 'react';
import CommentsRecursive from './CommentsRecursive';
import {get, put} from '../../utils/APImanager'
import APIRoute from '../../utils/messages/APIRoute';
import commentSort from '../../utils/commentSort';
import Loader from '../other/Loader';
import ComponentReplacer from '../other/ComponentReplacer';
import Text from '../../utils/messages/Text';
import authUtils from '../../auth/authUtils';
import helpers from '../../utils/helpers';
import traverse from 'traverse';

class Comments extends Component{
    constructor(){
        super();
        this.state = {
            comments: [

            ],
            isLoaded: false
        };
        this.handleLike = this.handleLike.bind(this);
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
    updateComments(comments, targetId){

        for(let i = 0; i<comments.length; ++i) {
            console.log(targetId)

            console.log(comments[i].value)
            if (comments[i].value.comment_id == targetId) {
                comments[i].value.liked = !comments[i].value.liked;
                comments[i].value.like_count = comments[i].value.liked ? ++comments[i].value.like_count : --comments[i].value.like_count;
                return comments[i];
            }
            if (comments[i].children && comments[i].children.length > 0) {
                let targetComment = this.updateComments(comments[i].children, targetId);
                if(targetComment) return targetComment;
            }
        }
        return false;
    }
    handleLike(event){
        authUtils.isAuthenticated((err, user) => {
            if(err) return alert(err);
            if(user) {
                let comments = this.state.comments;
                let targetId = event.currentTarget.dataset.id;
                let comment = this.updateComments(comments, targetId);
                console.log(comment)
                if(comment) {
                    let editedComment = comment.value;
                    this.setState({comments: comments}, () => {
                        put(APIRoute.comment.like(editedComment.comment_id),
                            {liked: editedComment.liked}, (err, result) => {
                                if(err){
                                    let revertedComments = this.state.comments;
                                    this.updateComments(revertedComments, targetId);
                                    this.setState({comments: revertedComments});
                                }
                                console.log(result)
                            })
                    });
                }
            }
            else alert("Du er ikke logget inn");
        })
    }

    render(){
        let commentList;
        let params = this.props.params;

        let basePath = "/segment/"+params.name+"/company/"+params.ticker+"/post/"+params.post_id;

        if(this.state.comments.length > 0) {
            commentList = (
                    <CommentsRecursive basePath={basePath} comments={this.state.comments} handleLike={this.handleLike}/>
            )
        }
        else {
            let replaceData = {
                message: Text.messages.noComments,
                link: basePath + "/comment"
            }
            commentList = <ComponentReplacer {...replaceData}/>
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
