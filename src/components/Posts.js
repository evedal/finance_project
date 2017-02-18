import React, { Component } from 'react';
import Post from './Post';
import {get} from '../utils/APImanager'
class Posts extends Component{
    constructor(){
        super();
        this.state = {
            posts: [

            ]
        }
    }
    componentDidMount(){
        get('/api/post/segment/'+1, function (err, posts) {
            if(err){
                alert(err);
                return;
            }
            this.setState({posts: posts})

        }.bind(this));
    }
    render(){
        const postList = this.state.posts.map((post, i) => {
            console.log(post);
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