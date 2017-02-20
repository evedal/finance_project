import React, { Component } from 'react';
import Post from '../components/Post';
import Comments from '../components/Comments'
import Header from '../components/Header';
import {get} from '../utils/APImanager'

class PostLayout extends Component{
    constructor(){
        super();
        this.state = {
            post: {

            },
            company: {

            },
            comments: [

            ]
        };
        this.handleLike = this.handleLike.bind(this);
    }
    handleLike(){
        let updatedPost = this.state.post;
        updatedPost.liked = !this.state.post.liked;
        updatedPost.like_count = updatedPost.liked ? ++updatedPost.like_count : --updatedPost.like_count;
        this.setState({post: updatedPost});
    }
    componentDidMount(){
        console.log(this.props);
        get('/api/post/'+this.props.params.post_id, function (err, post) {
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({post: post[0]})
        }.bind(this));
        get('/api/company/'+this.props.params.company_id, function (err, company) {
            console.log(company);
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({company: company[0]})
        }.bind(this));

    }

    render(){
        let postInfo;
        let header;
        if(this.state.post.post_id){
            postInfo = <Post currentPost= {this.state.post} handleLike={this.handleLike}/>
        }
        if(this.state.company){
            header = <Header icon = "mode_edit" title = { this.state.company.name } titleLink = {"/company/"+this.state.company.company_id}/>
        }

            console.log(this.state.post);
        return(
            <div className="container">
                { header }
                { postInfo }
                <Comments urlParams = {this.props.params} />
            </div>
        )
    }
}
export default PostLayout;