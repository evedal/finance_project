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
        }
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
            postInfo = <Post currentPost= {this.state.post}/>
        }
        if(this.state.company){
            header = <Header icon = "mode_edit" company_title = { this.state.company.name }/>
        }

            console.log(this.state.post);
        return(
            <div>
                { header }
                { postInfo }
                <Comments urlParams = {this.props.params} />
            </div>
        )
    }
}
export default PostLayout;