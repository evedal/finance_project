import React, { Component } from 'react';
import SiteNav from '../components/navs/SiteNav'
class Layout extends Component{
    constructor(){
        super();
        this.state = {
            user: ""
        }
    }
    render(){

        return(
            <div>
                <SiteNav />
                {this.props.children}
            </div>
        )
    }
}
export default Layout;