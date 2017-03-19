import React, { Component } from 'react';
import DetailedPost from '../components/posts/DetailedPost';
import Comments from '../components/comments/Comments'
import Header from '../components/other/Header';
import {get, put} from '../utils/APImanager'
import User from '../models/User';
import APIRoute from '../utils/messages/APIRoute';
import helpers from '../utils/helpers';
import Text from '../utils/messages/Text';
class PostLayout extends Component{
    constructor(){
        super();
        this.state = {
            post: {

            },
            company: {

            },
            comments: [

            ],
            user: User.getUser()
        };
        this.handleLike = this.handleLike.bind(this);
    }

    handleLike(){
        if(this.state.user && this.state.user.user_id){
            let updatedPost = this.state.post;
            updatedPost.liked = !this.state.post.liked;
            updatedPost.like_count = updatedPost.liked ? ++updatedPost.like_count : --updatedPost.like_count;
            this.setState({post: updatedPost}, () => {
                let reversedPost = this.state.post;
                helpers.handleLike(reversedPost.post_id, reversedPost.liked, (err, result) => {
                    if (err) {
                        reversedPost.liked = !this.state.post.liked;
                        reversedPost.like_count = reversedPost.liked ? ++reversedPost.like_count : --reversedPost.like_count;
                        return this.setState({post: reversedPost});
                    }
                    console.log(result);
                });
            });
        }
        else alert("You need to be logged in");
    }
    componentDidMount(){
        console.log(this.props.params)
        let params = this.props.params;
        get('/api/post/'+params.post_id, function (err, post) {
            if(err){
                console.log(err.message);
                return;
            }
            let encodedSlug = encodeURI(post[0].header);
            let pathname = this.props.location.pathname;
            console.log(post[0])
            if(!params.slug){
                if(pathname.slice(-1) != "/") pathname += "/";
                let pathWithSlug = this.props.location.pathname+encodedSlug;
                this.props.router.push(pathWithSlug);
            }
            this.setState({post: post[0]});

        }.bind(this));
        //Get company, set state and add slug to path

        get('/api/company/'+this.props.params.ticker, function (err, company) {
            console.log(company);
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({company: company[0]})

        }.bind(this));

        //Set eventlistener for userchanges
        User.on('change', (user) => {
            this.setState({user: user});
        })
    }
    componentWillUnmount(){
        //remove eventlistener for user
        User.removeAllListeners('change');
    }

    render(){
        let postInfo;
        let header;
        let params = this.props.params;
        let basePath = "/segment/"+params.name+"/company/"+params.ticker;
        let post = this.state.post;
        let comments;

        if(this.state.post.post_id){
            postInfo = <DetailedPost basePath={basePath} post= {post} handleLike={this.handleLike}/>
            let detailedBasePath = basePath+"/post/"+post.post_id+"/"+encodeURI(post.header);
            comments = <Comments basePath = {detailedBasePath} params = {params} />

        }
        if(this.state.company && post.post_id){
            let headerData = {
                icon: "mode_edit",
                iconLink: basePath+"/post/"+params.post_id+"/comment",
                links: [
                    {
                        title: params.ticker,
                        url: basePath
                    },
                    {
                        title: post.header
                    }

                ]
            };
            header = <Header {...headerData}/>
        }
        return(
            <div className="container">
                { header }
                { postInfo }
                { comments }
            </div>
        )
    }
}
export default PostLayout;