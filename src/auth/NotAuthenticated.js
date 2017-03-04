import React, { Component } from 'react';
import auth from './authUtils';
import User from '../models/User';


//Component used to show content only avilable to unauthicated users
//Gives access to user object for child components from this.props.user
class NotAuthenticated extends Component{
    constructor(){
        super();
        this.state = {
            user: User.getUser()
        }
    }
    componentDidMount(){
        //Sets event listener for when user is changed
        User.on('change', function (user) {
            this.setState({user: user});
        }.bind(this));

        //Returns false if not authorized, user if is
        auth.isAuthenticated(function(err, user){
            if(err || !user)return;
            this.setState({user: user});
        }.bind(this));


    }

    render(){
        let user = User.getUser();
        return !user ? this.props.children : null;
    }
}
export default NotAuthenticated