
import React, { Component } from 'react';

class SiteNav extends Component{
    render(){
        return(
            <header className="box-shadow">
                <a href="#" className="white" id="menu_icon">
                    <i className="material-icons">menu</i>
                </a>
                <h1><a href="/">Aksjeprat</a></h1>
                <a href="#" className="white" id="more_icon">
                    <i className="material-icons">more_vert</i>
                </a>
            </header>
        )
    }
}
export default SiteNav;