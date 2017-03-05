import User from "../../models/User";
import React, { Component } from 'react';
import Authenticated from '../../auth/Authenticated';
import NotAuthenticated from '../../auth/NotAuthenticated';
import MenuDropdown from './MenuDropdown';
import SettingsDropdown from './SettingsDropdown';

import { Link } from 'react-router';
class SiteNav extends Component{
    constructor(){
        super();
        this.state = {
            user: User.getUser(),
            dropdown: {
                menu: false,
                settings: false
            }
        };
        this.updateUser = this.updateUser.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleSettings = this.toggleSettings.bind(this);

    }
    componentDidMount(){
        User.on('change', this.updateUser);
    }
    updateUser(user){
        if(user !== this.state.user){
            this.setState({user: user});
        }
    }
    toggleMenu(e){
        let dropdown = this.state.dropdown;
        dropdown.menu = !dropdown.menu;
        if(dropdown.settings) dropdown.settings = false;
        this.setState({dropdown: dropdown});
    }
    toggleSettings(e){
        let dropdown = this.state.dropdown;
        dropdown.settings = !dropdown.settings;
        if(dropdown.menu) dropdown.menu = false;
        this.setState({dropdown: dropdown});
    }
    render(){
        let menuDropdown = null;
        let settingsDropdown = null;
        if(this.state.dropdown.menu){
            menuDropdown = <MenuDropdown toggleDropdown={this.toggleMenu}/>
        }
        if(this.state.dropdown.settings){
            settingsDropdown = <SettingsDropdown toggleDropdown={this.toggleSettings}/>
        }
        return(
            <div>
                <header className="box-shadow">
                    <a href="#" className="white" id="menu_icon" onClick={this.toggleMenu}>
                        <i className="material-icons">menu</i>
                    </a>
                    <h1><a href="/">Aksjeprat</a></h1>

                    <a onClick={this.toggleSettings} href="#" className="white" id="more_icon">
                        <i className="material-icons">more_vert</i>
                    </a>
                </header>
                {menuDropdown}
                {settingsDropdown}
            </div>

        )
    }
}
export default SiteNav;