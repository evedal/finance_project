import {Link} from 'react-router';
import React, { Component } from 'react';

class Header extends Component{
    render(){
        let icon;
        if(this.props.data.icon){
            icon = (
                <Link to={this.props.data.iconLink}>
                    <i className="material-icons head-icon cursor-point">{this.props.data.icon}</i>
                </Link>
                )
        }
        console.log(this.props.data)
        return(
            <div className="second-header flex-center">
                <Link to={this.props.data.titleLink} >
                    <h2>{this.props.data.title}</h2>
                </Link>
                {icon}
            </div>
        )
    }
}
export default Header;