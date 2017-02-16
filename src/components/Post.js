import React, { Component } from 'react';

class Post extends Component{
    render(){
        console.log(this.props);
        const post = this.props.currentPost;
        return(
            <div>
                <h3>{ post.header }</h3>
                <span>{ post.created_date }</span>
                <p> { post.content }</p>
            </div>
        )
    }
}
export default Post;