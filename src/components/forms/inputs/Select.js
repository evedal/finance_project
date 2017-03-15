import React, {Component} from 'react';
import Select2 from 'react-select';
import classNames from 'classnames';


class Select extends Component{
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
            this.props.onInvalid();
        }
    }
    componentWillUpdate(){
        this.shouldCallEventListener();
    }
    onBlur(){
        if(!this.state.showFieldStatus)
            this.setState({showFieldStatus: true});
    }
    render(){
        //Props error tells if an error is defined, state showFieldStatus tells if the field has been
        // blurred(should show error or valid)
        let shouldShowError = this.props.error && this.state.showFieldStatus;

        // If error should not be showed, there is no need to calculate whether it's valid, and
        // we set default to false
        let isValid = shouldShowError ? this.props.error.isValid() : false;

        let dropdownData = {
            options: this.props.options,
            onChange:this.props.onChange,
            placeholder: this.props.placeholder,
            value: this.props.value,
            onBlur: this.onBlur,
            autoBlur: true,
            clearable: false,
            isLoading: this.props.isLoading,
            className: classNames({
                "form-control": true,
                "input-field": true,
                "company-select": true,
                'error': shouldShowError && !isValid,
                'valid': shouldShowError && isValid
            })
        };
        console.log(dropdownData);
        return (
            <div className="input-container">
                <Select2 {...dropdownData}/>
            </div>
        )
    }
}
export default Select;