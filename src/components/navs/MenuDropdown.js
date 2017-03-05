import React, { Component } from 'react';
import BasicDropdown from './BasicDropdown';

import { Link } from 'react-router';
class MenuDropdown extends Component{

    render(){
        let links = [
            {url: "/segments", name: "Segmenter"},
            {url: "/companies", name: "Selskaper"}
        ];
        return <BasicDropdown links={links} toggleDropdown={this.props.toggleDropdown}/>
    }
}
export default MenuDropdown;