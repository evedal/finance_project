import React, {Component} from 'react'

class TextArea extends Component{

    shouldCallEventListener(){
        console.log("was"+this.props.wasValid+"is"+this.props.error.isValid());

        if(!this.props.wasValid && this.props.error.isValid()){
            this.props.onValid();
        }

        else if(this.props.wasValid && !this.props.error.isValid()) {
                console.log("was"+this.props.wasValid+"is"+this.props.error.isValid());
                this.props.onInvalid();
        }
    }
    componentDidUpdate(){
        this.shouldCallEventListener();
    }

    render(){
        return <textarea className="form-control comment-textarea"
                  placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange} />

    }
}
export default TextArea;