import React, { Component } from 'react';
import CompanyPosts from '../components/posts/CompanyPosts';
import Header from '../components/other/Header';
import Dropdown from '../components/other/Dropdown'
import {get} from '../utils/APImanager'
import Loader from '../components/other/Loader';
class CompanyLayout extends Component{
    constructor(){
        super();
        this.state = {
            posts: [

            ],
            post_loaded: false,
            company: {

            },
            company_loaded: false
        };
        this.handleLike = this.handleLike.bind(this)
    }
    /*
        Gets data for company for header and dropdown.
        Gets posts from relevant company
     */
    componentDidMount(){
        let ticker = this.props.params.ticker;
        get('/api/post/company/'+ticker, function (err, posts) {
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({posts: posts, post_loaded: true})
        }.bind(this));
        get('/api/company/'+ticker, function (err, company) {
            console.log(company);
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({company: company[0], company_loaded: true})
        }.bind(this));

    }
    handleLike(index){
        let updatedPosts = this.state.posts;
        updatedPosts[index].liked = !updatedPosts[index].liked;
        updatedPosts[index].like_count = updatedPosts[index].liked ? ++updatedPosts[index].like_count : --updatedPosts[index].like_count;
        this.setState({posts : updatedPosts})
    }

    render(){
        let header;
        let posts;
        let params = this.props.params;
        let basePath = "/segment/"+params.name;
        if(this.state.posts.length > 0){
            posts = <CompanyPosts basePath={basePath} posts = {this.state.posts} handleLike={this.handleLike}/>
        }
        if(this.state.company.ticker){
            let segmentPath = "/segment/"+params.name;
            let headerData = {
                icon: "add",
                iconLink: segmentPath+"/company/"+params.ticker+"/post",
                links: [
                    {
                    title: params.name,
                    url: segmentPath
                    }, {
                    title: params.ticker,
                    }
                ]
            };
            header = <Header {...headerData}/>
        }
        return(
            <div className="container">
                <Loader isLoaded={this.state.company_loaded}>
                {header}
                </Loader>
                <Loader isLoaded={this.state.post_loaded}>
                    {posts}
                </Loader>
            </div>
        )
    }
}
export default CompanyLayout;