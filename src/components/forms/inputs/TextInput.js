/**
 * Created by evend on 2/16/2017.
 */
import React, { Component } from 'react';
import TextInputPreview from '../markdown/TextInputPreview';
import InputHeader from '../markdown/InputHeader';
import SubmitBtn from '../buttons/SubmitBtn'

class TextInput extends Component{
    constructor(){
        super();
        this.state = {
            popup: false
        };

        this.handleHeaders = this.handleHeaders.bind(this);
        this.handleBold = this.handleBold.bind(this);
        this.handleItalic = this.handleItalic.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.handleBulleted = this.handleBulleted.bind(this);
        this.handleNumbered = this.handleNumbered.bind(this);
        this.handleSimpleMarkdown = this.handleSimpleMarkdown.bind(this);
        this.handlePopup = this.handlePopup.bind(this);
    }
    setCaretPosition(elemId, selectionStart, selectionEnd) {
        let elem = document.getElementById(elemId);
        if(elem != null) {

            console.log("her er jeg");
            elem.focus();
            window.setTimeout(function() {
                elem.setSelectionRange(selectionStart, selectionEnd);
            }, 0);

        }
    }
    handlePopup(){
        console.log(this.state.popup);
        this.setState({popup : !this.state.popup})
    }
    handleSimpleMarkdown(event, pattern, numbs, wrapText, link){
        let textArea = document.getElementById("textarea");
        let value = this.props.data.value;
        let newValue;
        if(wrapText) {
             newValue = value.slice(0, textArea.selectionStart) + pattern +
                value.slice(textArea.selectionStart, textArea.selectionEnd) + pattern + value.slice(textArea.selectionEnd, -1);
        }
        else if(link){
            newValue = value.slice(0, textArea.selectionStart) + pattern +
                value.slice(textArea.selectionStart, textArea.selectionEnd) + link + value.slice(textArea.selectionEnd, -1);
        }
        else{
            newValue = value.slice(0, textArea.selectionStart) + pattern +
                value.slice(textArea.selectionStart, -1)
        }
        let newEnd = textArea.selectionEnd + numbs;
        let newStart = textArea.selectionStart + numbs;
        this.props.data.updateValue(newValue, ()=>{
            this.setCaretPosition("textarea", newStart, newEnd)
        });
    }

    handleBold(event) {
        this.handleSimpleMarkdown(event, "**", 2, true)
    }
    handleHeaders(event){
        let prefix = event.target.dataset.prefix;
        this.handleSimpleMarkdown(event, prefix + " ", prefix.length + 1 , false);

        this.handlePopup();
    }
    handleItalic (event){
        this.handleSimpleMarkdown(event, "_", 1, true)
    }
    handleLink(event) {
        this.handleSimpleMarkdown(event, "[", 1, false, "](url)")
    }
    handleBulleted(){
        this.handleSimpleMarkdown(event, "- ", 2, false, false, true);
    }
    handleNumbered(){
        this.handleSimpleMarkdown(event, "1. ", 3);
    }





    render(){
        let tabPresentation;
        console.log(this.props.data.writeTab)
        let headerData = {
            handleBold : this.handleBold,
            handleItalic: this.handleItalic,
            handleHeaders: this.handleHeaders,
            handleLink: this.handleLink,
            handleBulleted: this.handleBulleted,
            handleNumbered: this.handleNumbered,
            handlePopup: this.handlePopup,
            popup: this.state.popup,
            handleTabChange: this.props.data.handleTabChange,
            writeTab: this.props.data.writeTab
        }
        if(!this.props.data.writeTab){
            tabPresentation = (
                <div>
                    <InputHeader {...headerData} />
                    <TextInputPreview text={this.props.data.value} />
                </div>
            )
        }
        else{
            tabPresentation = (
                <div>
                    <InputHeader {...headerData} />
                    <textarea id="textarea" className="form-control comment-textarea" placeholder={this.props.data.placeholder} value={this.props.data.value} onChange={this.props.data.handleChange} />
                </div>
            )
        }


        return(
            <div>
                {tabPresentation}
                <SubmitBtn submitText={this.props.data.submitText} />
            </div>
        );
    }
}

export default TextInput;