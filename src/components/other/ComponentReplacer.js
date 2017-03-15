import {Link} from 'react-router';
import React, { Component } from 'react';

class ComponentReplacer extends Component{

    render(){

        return(
            <div className="message-wrap">
                <Link to={this.props.link}>
                    {this.props.message}
                </Link>
            </div>
        )
    }
}
export default ComponentReplacer;