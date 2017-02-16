import React, { Component } from 'react';
import Post from './Post';
import 'whatwg-fetch';

class Posts extends Component{
    constructor(){
        super();
        this.state = {
            posts: [

            ]
        }
    }
    componentDidMount(){
        fetch('./api/post/segment/'+1)//this.props.segment)
            .then(function (response) {
                if(response.ok){
                    response.json().then((postJson) => {
                        this.setState({posts: postJson})
                    })
                }
            }.bind(this))
    }
    render(){
        console.log(this.state.posts);
        const postList = this.state.posts.map((post, i) => {
            return(
                <div>
                    <Post currentPost = {post}/>
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