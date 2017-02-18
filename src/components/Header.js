/**
 * Created by evend on 2/16/2017.
 */
import React, { Component } from 'react';

class Header extends Component{
    render(){
        console.log(this.props);
        return(
            <div>
                <span>
                    <h4>{ this.props.company_title }</h4>
                    <i className="material-icons">{ this.props.icon }</i>
                </span>
            </div>
        )
    }
}
export default Header;