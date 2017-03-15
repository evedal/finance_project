import React, { Component } from 'react';
import BasicDropdown from './BasicDropdown';

import { Link } from 'react-router';
class MenuDropdown extends Component{

    render(){
        let links = [
            {url: "/", name: "Hjem"},
            {url: "/segment", name: "Segmenter"},
            {url: "/company", name: "Selskaper"}
        ];
        return <BasicDropdown links={links} {...this.props}/>
    }
}
export default MenuDropdown;