import React, { Component } from 'react';
import HomePosts from '../components/posts/HomePosts';
import Header from '../components/other/Header';
import {get} from '../utils/APImanager';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            posts: []
        }
        this.handleLike = this.handleLike.bind(this)
    }
    componentDidMount(){
        get('/api/post/user/'+1, function (err, posts) {
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({posts: posts})
        }.bind(this));
    }
    handleLike(index){
        let updatedPosts = this.state.posts;
        updatedPosts[index].liked = !updatedPosts[index].liked;
        updatedPosts[index].like_count = updatedPosts[index].liked ? ++updatedPosts[index].like_count : --updatedPosts[index].like_count;
        this.setState({posts : updatedPosts})
    }
    render(){
        let data = {
            links: [{
                title: "Din forside",
            }]
        };
        return(
                <div>
                    <Header {...data} />
                    <HomePosts posts={this.state.posts} handleLike={this.handleLike}/>
                </div>
        )
    }
}
export default Home;