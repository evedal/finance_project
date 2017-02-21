import React, { Component } from 'react';
import TextInput from './TextInput';

class LargeTextField extends Component{
    constructor(){
        super();
        this.state = {
            writeTab : true
        };
        this.handleTabChange = this.handleTabChange.bind(this);

    }
    handleTabChange(event){
        console.log(event.target.id);
        let writeTab = true;
        if(event.target.id === "prev"){
            writeTab = false;
        }
        this.setState({writeTab : writeTab})
    }

    render(){
        let textInputData = {
            writeTab: this.state.writeTab,
            updateValue: this.props.data.updateValue,
            handleChange: this.props.data.handleChange,
            handleSubmit: this.props.data.handleSubmit,
            value: this.props.data.value,
            placeholder: "Skriv en tekst",
            submitText: "Publiser",
            handleTabChange: this.handleTabChange
        }
        return <TextInput data = {textInputData} />;
    }
}
export default LargeTextField;