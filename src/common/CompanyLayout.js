import React, { Component } from 'react';
import CompanyPosts from '../components/posts/CompanyPosts';
import Header from '../components/other/Header';
import Dropdown from '../components/other/Dropdown'
import {get} from '../utils/APImanager'
class CompanyLayout extends Component{
    constructor(){
        super();
        this.state = {
            posts: [

            ],
            company: {

            }
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
            this.setState({posts: posts})
        }.bind(this));
        get('/api/company/'+ticker, function (err, company) {
            console.log(company);
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({company: company[0]})
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
                title: params.name,
                titleLink: segmentPath
            };
            header = <Header data = {headerData}/>
        }
        return(
            <div className="container">
                {header}
                <Dropdown title="Selskapsinformasjon"/>
                {posts}
            </div>
        )
    }
}
export default CompanyLayout;