import React, { Component } from 'react';

class InputField extends Component{
    constructor(){
        super();
        this.shouldCallEventListener = this.shouldCallEventListener.bind(this);
    }
    shouldCallEventListener(){
        console.log(this.props)
        if(!this.props.wasValid && this.props.error.isValid()){
            this.props.onValid();
        }
        else if(this.props.wasValid && !this.props.error.isValid()) {
            this.props.onInvalid();
        }
        console.log(this.props.wasValid);
    }
    componentWillUpdate(){
        this.shouldCallEventListener();
    }
    render(){
        let onChange;
        let onBlur;
        if(this.props.onChange){
            onChange = this.props.onChange.bind(this);
        }
        if(this.props.onBlur){
            onBlur = this.props.onBlur.bind(this);
        }

        let type = this.props.type ? this.props.type : "text";
        return (
            <input onChange={onChange} onBlur={onBlur} name={this.props.name}
                   placeholder={this.props.placeholder} type={type}
                   className="form-control input-field" value={this.props.value}/>
        )
    }
}
export default InputField;
