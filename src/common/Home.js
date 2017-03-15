import React, { Component } from 'react';
import HomePosts from '../components/posts/HomePosts';
import Header from '../components/other/Header';
import {get} from '../utils/APImanager';
import User from '../models/User';


class Home extends Component{
    constructor(){
        super();
        this.state = {
            posts: [],
            user: User.getUser()
        };
        this.handleLike = this.handleLike.bind(this)
    }
    componentDidMount(){
        let user = this.state.user;
        if(this.state.user.user_id) {
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
        User.on("change", (user) => {
            this.setState({user: user})
        })
    }
    componentWillUnmount(){
        User.removeAllListeners('change');
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