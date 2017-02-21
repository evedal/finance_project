import React, { Component } from 'react';
import Post from '../components/posts/Post';
import Comments from '../components/comments/Comments'
import Header from '../components/other/Header';
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
        if(this.state.company && this.state.post.post_id){
            let company = this.state.company;
            let headerData = {
                icon: "mode_edit",
                iconLink: "/company/"+company.company_id+"/post/"+this.state.post.post_id+"/comment",
                title: company.name,
                titleLink: "/company/"+company.company_id
            };
            header = <Header data = {headerData}/>
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