import React, { Component } from 'react';
import SegmentPosts from '../components/posts/SegmentPosts';
import Header from '../components/other/Header';
import Dropdown from '../components/other/Dropdown'
import {get} from '../utils/APImanager';
import Loader from '../components/other/Loader';
class SegmentLayout extends Component{
    constructor(){
        super();
        this.state = {
            posts: [

            ],
            posts_loaded: false,
            segment: {

            },
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

    }
    /*
        Sets post like to the opposite of its previous state.
        Index: the posts index in the list of posts
     */
    handleLike(index){
        let updatedPosts = this.state.posts;
        updatedPosts[index].liked = !updatedPosts[index].liked;
        updatedPosts[index].like_count = updatedPosts[index].liked ? ++updatedPosts[index].like_count : --updatedPosts[index].like_count;
        this.setState({posts : updatedPosts})
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
                <Dropdown title="Segment-informasjon"/>
                <Loader isLoaded={this.state.posts_loaded}>
                {posts}
                </Loader>
            </div>
        )
    }
}
export default SegmentLayout;
