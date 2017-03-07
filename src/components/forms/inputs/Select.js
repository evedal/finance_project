import React, {Component} from 'react';
import Select2 from 'react-select';

class Select extends Component{

    render(){
        let dropdownData = {
            options: this.props.options,
            onChange:this.props.onChange,
            placeholder: this.props.placeholder,
            value: this.props.value,
            autoBlur: true,
            clearable: false,
            className: "form-control input-field company-select",
            isLoading: this.props.isLoading
        };
        console.log(dropdownData)
        return (
            <Select2 {...dropdownData}/>
        )
    }
}
export default Select;