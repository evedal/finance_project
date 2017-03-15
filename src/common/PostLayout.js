import React, { Component } from 'react';
import DetailedPost from '../components/posts/DetailedPost';
import Comments from '../components/comments/Comments'
import Header from '../components/other/Header';
import {get, post} from '../utils/APImanager'
import User from '../models/User';
import APIRoute from '../utils/messages/APIRoute';
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
        let updatedPost = this.state.post;
        updatedPost.liked = !this.state.post.liked;
        updatedPost.like_count = updatedPost.liked ? ++updatedPost.like_count : --updatedPost.like_count;
        this.setState({post: updatedPost}, () => {
            post(APIRoute.post.like(this.state.post.post_id, this.state.user.user_id),
                {liked: this.state.post.liked}, (err, result) => {
                    if (err) {
                        let reversedPost = this.state.post;
                        reversedPost.liked = !this.state.post.liked;
                        reversedPost.like_count = reversedPost.liked ? ++reversedPost.like_count : --reversedPost.like_count;
                        return this.setState({post: reversedPost});
                    }
                    console.log(result);
                });
        });


    }
    componentDidMount(){
        console.log(this.props.params)
        let params = this.props.params;
        get('/api/post/'+params.post_id, function (err, post) {
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({post: post[0]});
            let encodedSlug = encodeURI(post[0].header);
            let pathname = this.props.location.pathname;
            if(!params.slug){
                if(pathname.slice(-1) != "/") pathname += "/";
                let pathWithSlug = this.props.location.pathname+encodedSlug;
                this.props.router.push(pathWithSlug);
            }

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