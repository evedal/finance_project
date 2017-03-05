import React, { Component } from 'react';

class FormLayout extends Component{
    render(){
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="flex-center flex-column">
                    { this.props.children }
                </div>
            </form>
        )
    }
}
export default FormLayout;