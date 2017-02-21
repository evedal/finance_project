import React, { Component } from 'react';
import SiteNav from '../components/other/SiteNav'
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