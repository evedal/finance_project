import React, { Component } from 'react';

class SubmitBtn extends Component{

    render(){
        return (
            <div className="flex-center btn-group">
                <input className= "submit-btn" type="submit" value={this.props.submitText} />
            </div>
        )
    }
}
export default SubmitBtn;