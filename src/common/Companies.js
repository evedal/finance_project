import React, { Component } from 'react';
import CompanyPosts from '../components/posts/CompanyPosts';
import Header from '../components/other/Header';
import Dropdown from '../components/other/Dropdown'
import {get} from '../utils/APImanager'
import Company from '../components/company/Company';
import Loader from '../components/other/Loader'

class Companies extends Component{
    constructor() {
        super();
        this.state = {
            companies: [],
            comp_isloaded: false
        };
    }
    /*
     Gets data for company with segment name.
     */
    componentDidMount(){
        get('/api/company/', function (err, companies) {
            console.log(companies);
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({companies: companies, comp_isloaded: true});
        }.bind(this));

    }

    render(){
        let companies = this.state.companies.map((company) => {
            let desc;
            if(company.description.length > 400){
                desc = company.description.slice(0,400) + "...";
            }
            else{
                desc = company.description;
            }
            let data = {
                company: {
                    ticker: company.ticker,
                    name: company.name,
                    url: "/segment/"+company.segment_name+"/company/"+company.ticker,
                    description: desc
                },
                segment: {
                    name: company.segment_name
                }
            };
            return <Company {...data}/>
        });
        let headerData = {
            icon: "add",
            iconLink: "/company/create",
            links: [{
                title: "Selskaper",
                url: "#"
            }]
        };
        return(
            <div className="container">
                <Header {...headerData}/>
                <Loader isLoaded={this.state.comp_isloaded}>
                {companies}
                </Loader>
            </div>
        )
    }
}
export default Companies;