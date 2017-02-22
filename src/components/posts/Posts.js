import React, { Component } from 'react';
import Post from './Post';
import {get} from '../../utils/APImanager'
class Posts extends Component{

    render(){
        const postList = this.props.posts.map((post, i) => {
            let basePath = this.props.basePath+"/company/"+post.ticker;
            return(
                <div>
                    <Post basePath={basePath} currentPost = {post} handleLike = {this.props.handleLike.bind(null, i)} />
                </div>
            )
        });
        return(
            <div>
                { postList }
            </div>
        )
    }
}
export default Posts;