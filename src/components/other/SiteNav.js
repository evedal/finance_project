import User from "../../models/User";
import React, { Component } from 'react';
import Authenticated from '../../auth/Authenticated';
import NotAuthenticated from '../../auth/NotAuthenticated';

import { Link } from 'react-router';
class SiteNav extends Component{
    constructor(){
        super();
        this.state = {
            user: User.getUser()
        };
        this.updateUser = this.updateUser.bind(this);
    }
    componentDidMount(){
        User.on('change', this.updateUser);
    }
    updateUser(user){
        if(user !== this.state.user){
            this.setState({user: user});
        }
    }
    render(){
        return(
            <header className="box-shadow">
                <a href="#" className="white" id="menu_icon">
                    <i className="material-icons">menu</i>
                </a>
                <h1><a href="/">Aksjeprat</a></h1>
                <Authenticated >
                    <Link to="/logout">Logg ut</Link>
                </Authenticated>
                <NotAuthenticated >
                    <Link to="/login">Logg inn</Link>
                </NotAuthenticated>
                <a href="#" className="white" id="more_icon">
                    <i className="material-icons">more_vert</i>
                </a>
            </header>
        )
    }
}
export default SiteNav;