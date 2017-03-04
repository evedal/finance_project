import React, { Component } from 'react';
import auth from './authUtils';
import enforceRootElement from '../utils/enforceRootElement';
import User from '../models/User';


//Component used to hide content only avilable to authenticated users
//Gives access to user object for child components from this.props.user
class Authenticated extends Component{
    constructor(){
        super();
        this.state = {
            user: User.getUser()
        }
    }
    componentDidMount(){
        console.log("HIEHEI")
        //Sets event listener for when user is changed
        User.on('change', function (user) {
            console.log("WIll change")
            this.setState({user: user});
        }.bind(this))

        //Returns false if not authorized, user if is
        auth.isAuthenticated(function(err, user){
            if(err || !user)return;
            console.log("Is authenticated");
            this.setState({user: user});
        }.bind(this));


    }

    render(){
        let user = User.getUser();
        return user ? this.props.children : null;
    }
}
export default Authenticated