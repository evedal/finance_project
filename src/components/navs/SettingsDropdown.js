import React, { Component } from 'react';
import BasicDropdown from './BasicDropdown';
import { Link } from 'react-router';
class SettingsDropdown extends Component{

    render(){
        let links = [
            {url: "/login", name: "Logg inn", notAuth: true},
            {url: "/register", name: "Registrer deg", notAuth: true},
            {url: "/logout", name: "Logg ut", auth: true}
        ];
        return <BasicDropdown links={links} toggleDropdown={this.props.toggleDropdown}/>
    }
}
export default SettingsDropdown;