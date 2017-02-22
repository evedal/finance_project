
import React, { Component } from 'react';
import Post from './Post';
import { Link } from 'react-router';
class CompanyPosts extends Component{

    render(){
        const postList = this.props.posts.map((post, i) => {
            let basePath = this.props.basePath+"/company/"+post.ticker;
            return(
                <div>
                    <Post basePath={basePath} currentPost = {post} handleLike = {this.props.handleLike.bind(null, i)} header = {
                        (<Link to = {'/user/'+post.user_id} >
                            <div className="post-head">
                                <h3>av {post.username}</h3>
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
export default CompanyPosts;