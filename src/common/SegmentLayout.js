import React, { Component } from 'react';
import SegmentPosts from '../components/posts/SegmentPosts';
import Header from '../components/other/Header';
import Dropdown from '../components/other/Dropdown'
import {get} from '../utils/APImanager';
import Loader from '../components/other/Loader';
import Text from '../utils/messages/Text';
import Path from '../utils/messages/Path';
import User from '../models/User';
class SegmentLayout extends Component{
    constructor(){
        super();
        this.state = {
            posts: [

            ],
            posts_loaded: false,
            segment: {

            },
            user: User.getUser()
        };
        this.handleLike = this.handleLike.bind(this)
    }
    /*
        Gets data for header, segment information and posts
     */
    componentDidMount(){
        let segmentName = this.props.params.name;
        get('/api/post/segment/'+segmentName, function (err, posts) {
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({posts: posts, posts_loaded: true})
        }.bind(this));
        get('/api/segment/'+segmentName, function (err, segment) {
            console.log(segment);
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({segment: segment[0]})
        }.bind(this));

        //Listen for user changes
        User.on('change', (user) => {
            this.setState({user: user})
        })

    }
    componentWillUnmount(){
        User.removeAllListeners('change');
    }
    /*
        Sets post like to the opposite of its previous state.
        Index: the posts index in the list of posts
     */
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
    /*
        Renders header, dropdown and posts, and adds information to children and links
     */
    render(){
        let header;
        let posts;
        let pathname = "/segment/"+this.props.params.name;
        console.log(this.state);
        if(this.state.posts.length > 0){
            posts = <SegmentPosts basePath = {pathname} posts = {this.state.posts} handleLike={this.handleLike}/>
        }
        if(this.state.segment){
            let headerData = {
                links: [
                    {
                        title: Text.headers.segments,
                        url: Path.segments
                    },
                    {
                        title: this.state.segment.name,
                        url: pathname
                    }
                ]
            };
            header = <Header {...headerData}/>
        }
        return(
            <div className="container">
                {header}
                <Loader isLoaded={this.state.posts_loaded}>
                {posts}
                </Loader>
            </div>
        )
    }
}
export default SegmentLayout;
