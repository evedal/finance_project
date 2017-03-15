import React, { Component } from 'react';

class SubmitBtn extends Component{

    render(){
        console.log(this.props)
        return (
            <div className="flex-center btn-group">
                <input disabled={this.props.disabled} className= "submit-btn" type="submit" value={this.props.value} />
            </div>
        )
    }
}
export default SubmitBtn;
