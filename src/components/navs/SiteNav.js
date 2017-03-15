import User from "../../models/User";
import React, { Component } from 'react';
import MenuDropdown from './MenuDropdown';
import SettingsDropdown from './SettingsDropdown';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactDOM from 'react-dom';

class SiteNav extends Component{
    constructor(){
        super();
        this.state = {
            user: User.getUser(),
            dropdown: {
                menu: false,
                settings: false,
            }
        };
        this.updateUser = this.updateUser.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleSettings = this.toggleSettings.bind(this);
        this.handleDocumentClickMenu = this.handleDocumentClickMenu.bind(this);
        this.handleDocumentClickSettings = this.handleDocumentClickSettings.bind(this);


    }
    componentDidMount(){
        User.on('change', this.updateUser);
    }
    updateUser(user) {
        if (user !== this.state.user) {
            this.setState({user: user});
        }
    }

    toggleMenu(e){
        e.stopPropagation();
        let dropdown = this.state.dropdown;
        dropdown.menu = !dropdown.menu;
        dropdown.inAnimation = !dropdown.menu;
        if(dropdown.settings) dropdown.settings = false;
        this.setState({dropdown: dropdown});
    }
    toggleSettings(e){
        e.stopPropagation();
        let dropdown = this.state.dropdown;
        dropdown.settings = !dropdown.settings;
        dropdown.inAnimation = !dropdown.settings;
        if(dropdown.menu) dropdown.menu = false;
        this.setState({dropdown: dropdown});
    }

    //Handles document click when dropdown is open
    handleDocumentClickMenu(event){
        if (!ReactDOM.findDOMNode(this).contains(event.target) || document.getElementById("overlay") === event.target) {
            this.toggleMenu(event);
        }
    }
    handleDocumentClickSettings(event){
        if (!ReactDOM.findDOMNode(this).contains(event.target.parentNode) && event.target.parentNode ||
            document.getElementById("overlay") === event.target) {
            this.toggleSettings(event);

        }
    }
    render(){
        let menuDropdown = null;
        let settingsDropdown = null;
        let menuIcon;
        if(this.state.dropdown.menu){
            let menuData = {
                handleDocumentClick: this.handleDocumentClickMenu,
                toggleDropdown: this.toggleMenu,
            }
            menuDropdown = <MenuDropdown {...menuData}/>;
            menuIcon = (
                <div className="icon-container" >
                    <div className="hamburger-menu" onClick={this.toggleMenu}>
                        <div className="bar animate"></div>
                    </div>
                </div>
            )
        }
        else{
            menuIcon = (
                <div className="icon-container">
                    <div className="hamburger-menu" onClick={this.toggleMenu}>
                        <div className="bar"></div>
                    </div>
                </div>
            )
        }

        let overlay;
        if(this.state.dropdown.menu || this.state.dropdown.settings){
            overlay = (
                <div className="overlay" id="overlay"></div>
            )
        }
        let settingsIcon;
        if(this.state.dropdown.settings){
            let settingsData = {
                handleDocumentClick: this.handleDocumentClickSettings,
                toggleDropdown: this.toggleSettings,
            };
            settingsDropdown = <SettingsDropdown {...settingsData}/>
            settingsIcon = (
                <a onClick={this.toggleSettings} href="#" className="white" id="more_icon">
                    <i className="material-icons settings-icon settings-animate">more_vert</i>
                </a>
            )

        }
        else {
            settingsIcon = (
                <a onClick={this.toggleSettings} href="#" className="white"
                   id="more_icon">
                    <i className="material-icons settings-icon">more_vert</i>
                </a>
            )
        }
        let transitionData = {
            transitionName: "menu",
            transitionEnterTimeout: 300,
            transitionLeaveTimeout: 300
        };
        let transitionOverlayData = {
            transitionName: "overlay",
            transitionEnterTimeout: 300,
            transitionLeaveTimeout: 300
        };
        console.log(this.state.dropdown);
        return(
            <div>
                <header className="box-shadow">
                    {menuIcon}
                    <h1><a href="/">Aksjeprat</a></h1>
                    {settingsIcon}

                </header>
                <ReactCSSTransitionGroup {...transitionData}>
                    {menuDropdown}
                    {settingsDropdown}
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup {...transitionOverlayData}>
                    {overlay}
                </ReactCSSTransitionGroup>
            </div>

        )
    }
}
export default SiteNav;