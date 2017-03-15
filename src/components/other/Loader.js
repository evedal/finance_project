
import React, { Component } from 'react';

class Loader extends Component{
    render(){
        let out;
        if(this.props.isLoaded == false){
            return (
                <div className="flex-center center-item">
                    <div className="typing_loader"></div>
                </div>
            )
        }
        else{
            return (
                <div>
                    {this.props.children}
                </div>
            )
        }
    }
}
export default Loader;
