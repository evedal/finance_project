import React, {Component} from 'react';
import User from '../../models/User';
class Logout extends Component{

    componentWillMount(){
        User.clear();
        console.log()
        this.props.router.push("/");
    }

    render(){
        return null;
    }
}
export default Logout;