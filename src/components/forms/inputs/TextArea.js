import React, {Component} from 'react'
import classNames from 'classnames';

class TextArea extends Component{
    constructor() {
        super();
        this.state = {
            showFieldStatus: false
        };
        this.onBlur = this.onBlur.bind(this);
    }
    shouldCallEventListener(){
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
    onBlur(){
        console.log("FIELDSTATUS"+this.state.showFieldStatus)
        if(!this.state.showFieldStatus)
            this.setState({showFieldStatus: true});
    }

    render(){
        //Props error tells if an error is defined, state showFieldStatus tells if the field has been
        // blurred(should show error or valid)
        let shouldShowError = this.props.error && this.state.showFieldStatus && this.props.value;

        // If error should not be showed, there is no need to calculate whether it's valid, and
        // we set default to false
        let isValid = shouldShowError ? this.props.error.isValid() : false;

        let classes = classNames({
            'form-control': true,
            'comment-textarea': true,
            'error': shouldShowError && !isValid,
            'valid': shouldShowError && isValid
        });
        console.log(this.props.error)
        console.log(this.props)
        console.log(this.state.showFieldStatus)

        let textAreaData = {
            className: classes,
            placeholder: this.props.placeholder,
            value: this.props.value,
            onChange: this.props.onChange,
            onBlur: this.onBlur
        };
        let errorMessage = null;
        if(shouldShowError && !isValid && this.props.error && this.props.error.message){
            errorMessage = (
                <p className="error-message">{this.props.error.message}</p>
            )
        }
        return (
            <div className="input-container">
                <textarea {...textAreaData} />
                {errorMessage}
            </div>
        )
    }
}
export default TextArea;