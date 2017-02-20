import React, { Component } from 'react';
import Posts from '../components/Posts';
import Header from '../components/Header';
import Dropdown from '../components/Dropdown'
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
    componentDidMount(){
        let companyId = this.props.params.company_id;
        get('/api/post/company/'+companyId, function (err, posts) {
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({posts: posts})
        }.bind(this));
        get('/api/company/'+companyId, function (err, company) {
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
        if(this.state.posts.length > 0){
            posts = <Posts posts = {this.state.posts} handleLike={this.handleLike}/>
        }
        if(this.state.company.company_id){
            header = <Header icon = "add" title = {this.state.company.name} titleLink = {"/company/"+this.state.company.company_id}/>
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