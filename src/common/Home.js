import React, { Component } from 'react';
import HomePosts from '../components/posts/HomePosts';
import Header from '../components/other/Header';
import {get} from '../utils/APImanager';
import User from '../models/User';
import helpers from '../utils/helpers';
import Path from '../utils/messages/Path';


class Home extends Component{
    constructor(){
        super();
        this.state = {
            posts: [],
            user: User.getUser()
        };
        this.handleLike = this.handleLike.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }
    componentDidMount(){
        this.fetchData();
        User.on("change", (user) => {
            this.setState({user: user})
        })
    }
    fetchData(){
        let user = this.state.user;
        if(user.user_id) {
            get('/api/post/user/'+user.user_id, function (err, posts) {
                if (err) {
                    console.log(err.message);
                    return;
                }
                this.setState({posts: posts})
            }.bind(this));
        }
        else{
            get('/api/post/', function (err, posts) {
                if (err) {
                    console.log(err.message);
                    return;
                }
                this.setState({posts: posts})
            }.bind(this));
        }
    }
    componentWillUnmount(){
        User.removeAllListeners('change');
    }

    handleLike(index){
        console.log(this.state.user)
        if(this.state.user && this.state.user.user_id){
            let posts = this.state.posts;
            let updatedPost = posts[index];
            updatedPost.liked = !updatedPost.liked;
            updatedPost.like_count = updatedPost.liked ? ++updatedPost.like_count : --updatedPost.like_count;
            posts[index] = updatedPost;
            this.setState({posts: posts}, () => {
                let reversedPost = this.state.posts[index];
                helpers.handleLike(reversedPost.post_id, reversedPost.liked, (err, result) => {
                    if (err) {
                        let posts = this.state.posts;
                        reversedPost.liked = !reversedPost.liked;
                        reversedPost.like_count = reversedPost.liked ? ++reversedPost.like_count : --reversedPost.like_count;
                        posts[index] = reversedPost;
                        return this.setState({posts: posts});
                    }
                    console.log(result);
                });
            });
        }
        else alert("You need to be logged in");
    }
    render(){
        let data = {
            links: [{
                title: "Din forside",
            }]
        };
        return(
                <div className="container">
                    <Header {...data} />
                    <HomePosts posts={this.state.posts} handleLike={this.handleLike}/>
                </div>
        )
    }
}
export default Home;