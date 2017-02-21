import {Link} from 'react-router';
import React, { Component } from 'react';

class Header extends Component{
    render(){
        let icon;
        if(this.props.icon){
            icon = <i className="material-icons head-icon cursor-point">{this.props.icon}</i>
        }
        return(
            <div className="second-header flex-center">
                <Link to={this.props.titleLink} >
                    <h2>{this.props.title}</h2>
                </Link>
                {icon}
            </div>
        )
    }
}
export default Header;