
import React, { Component } from 'react';
import Post from './Post';
import { Link } from 'react-router';
class HomePosts extends Component{

    render(){
        const postList = this.props.posts.map((post, i) => {
            let basePath = "/segment/"+post.name+"/company/"+post.ticker;
            return(
                <div>
                    <Post basePath={basePath} currentPost = {post} handleLike = {this.props.handleLike.bind(null, i)} header = {
                        (<Link to = {basePath} >
                            <div className="post-head">
                                <h3>{post.ticker}</h3>
                            </div>
                        </Link>)
                    }/>
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
export default HomePosts;