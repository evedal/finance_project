
import React, { Component } from 'react';

class Dropdown extends Component{
    render(){
        return(
            <div className="dropdown cursor-point">
                <h4>{this.props.title}</h4>
                <i className="material-icons">expand_more</i>
            </div>
        )
    }
}
export default Dropdown;
