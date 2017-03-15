import React, { Component } from 'react';
import classNames from 'classnames';

class InputField extends Component{
    constructor(){
        super();

        //If component is blurred
        this.state = {
            showFieldStatus: false
        };
        this.shouldCallEventListener = this.shouldCallEventListener.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    shouldCallEventListener(){
        console.log(this.props);
        if(this.props.error) {
            if (!this.props.wasValid && this.props.error.isValid()) {
                this.props.onValid();
            }
            else if (this.props.wasValid && !this.props.error.isValid()) {
                this.props.onInvalid();
            }
            console.log(this.props.wasValid);
        }
    }
    componentWillUpdate(){
        this.shouldCallEventListener();
    }
    onBlur(){
        if(this.props.onBlur){
            this.props.onBlur(this);
        }
        console.log(this.state);
        if(this.props.value && !this.state.showFieldStatus)
            this.setState({showFieldStatus: true});
    }
    render(){
        let onChange;
        if(this.props.onChange){
            onChange = this.props.onChange.bind(this);
        }
        //Props error tells if an error is defined, state showFieldStatus tells if the field has been
        // blurred(should show error or valid)
        let shouldShowError = this.props.error && this.state.showFieldStatus && this.props.value;

        // If error should not be showed, there is no need to calculate whether it's valid, and
        // we set default to false
        let isValid = shouldShowError ? this.props.error.isValid() : false;
        let classes = classNames({
            'form-control': true,
            'input-field': true,
            'error': shouldShowError && !isValid,
            'valid': shouldShowError && isValid
        });
        let errorMessage = null;
        if(shouldShowError && !isValid && this.props.error && this.props.error.message){
            errorMessage = (
                <p className="error-message">{this.props.error.message}</p>
            )
        }
        //Set default type to text if type is not defined
        let type = this.props.type ? this.props.type : "text";
        return (
            <div className="input-container">
                <input onChange={onChange} onBlur={this.onBlur} name={this.props.name}
                       placeholder={this.props.placeholder} type={type}
                       className={classes} value={this.props.value}/>
                {errorMessage}
            </div>
        );
    }
}
export default InputField;
