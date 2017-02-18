/**
 * Created by evend on 2/16/2017.
 */
import React, { Component } from 'react';

class Header extends Component{
    render(){
        console.log(this.props);
        return(
            <div>
                    <span>{ this.props.company_title }</span>
                    <i className="material-icons">{ this.props.icon }</i>
            </div>
        )
    }
}
export default Header;