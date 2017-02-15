import React, { Component } from 'react';
import Post from './Post';
import fetch from 'fetch';

class Posts extends Component{
    constructor(){
        super();
        this.state = {
            posts: {

            }
        }
    }
    componentDidMount(){
        fetch('./api/post/segment/'+1)//this.props.segment)
            .then(function (response) {
                if(response.ok){
                    this.state.posts = response.json();
                }
            })
    }
    render(){
        const postList = this.state.posts.map((post, i) => {
            return(
                <div>
                    <Post currentPost = {post}/>
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