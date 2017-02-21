import React, { Component } from 'react';
import SiteNav from '../components/SiteNav'
class Layout extends Component{
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