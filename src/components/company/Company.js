import React, { Component } from 'react';
import { Link } from 'react-router';
class Company extends Component{

    render(){
        console.log(this.props);
        const company = this.props.company;
        const segment = this.props.segment;
        let header;
        let content;
        if(segment && segment.name){
            header = (
                <Link to = {"/segment/"+segment.name} >
                    <div className="post-head">
                        <h3>{segment.name}</h3>
                    </div>
                </Link>)
        }
        if(company && company.ticker){
            content = (
                <Link to = {company.url } >
                    <h5>{company.ticker}</h5>
                    <p>{company.description}</p>
                </Link>
            )
        }
        return(
            <div className="post">
                {header}
                <div className="post-content">
                    {content}
                </div>
            </div>
        )
    }
}
export default Company;