import React, { Component } from 'react';
import Post from './Post';
import {get} from '../../utils/APImanager'
class Posts extends Component{

    render(){
        const postList = this.props.posts.map((post, i) => {
            return(
                <div>
                    <Post currentPost = {post} handleLike = {this.props.handleLike.bind(null, i)} />
                </div>
            )
        });
        console.log(postList);
        return(
            <div>
                { postList }
            </div>
        )
    }
}
export default Posts;