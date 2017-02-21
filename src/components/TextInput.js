/**
 * Created by evend on 2/16/2017.
 */
import React, { Component } from 'react';

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
        this.setState({popup : !this.state.popup})
    }
    handleSimpleMarkdown(event, pattern, numbs, wrapText, link){
        let textArea = document.getElementById("textarea");
        let value = this.props.value;
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
        this.props.updateValue(newValue, ()=>{
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
        let popupOptions;
        if(this.state.popup){
            popupOptions = (
                <div className="pop-up-option">
                    <button id = "header-button" type="button" onClick={this.handlePopup}>
                        <i className="material-icons">text_fields</i>
                    </button>
                    <div id="option-headers" className="option-content show">
                        <button onClick={this.handleHeaders} data-prefix = "#" type="button">Header</button>
                        <button onClick={this.handleHeaders} data-prefix = "##" type="button">Header</button>
                        <button onClick={this.handleHeaders} data-prefix = "###" type="button">Header</button>
                    </div>
                </div>
            )
        }
        else{
            popupOptions = (
                <div className="pop-up-option">
                    <button type="button" onClick={this.handlePopup}>
                        <i className="material-icons">text_fields</i>
                    </button>
                    <div id="option-headers" className="option-content">
                        <button onClick={this.handleHeaders} data-prefix = "#" type="button">Header</button>
                        <button onClick={this.handleHeaders} data-prefix = "##" type="button">Header</button>
                        <button onClick={this.handleHeaders} data-prefix = "###" type="button">Header</button>
                    </div>
                </div>
            )
        }
        return(
            <form onSubmit={this.props.handleSubmit}>
                <div className="input-header flex-center">
                    <nav>
                        <button type="button" className="active">Skriv</button><button type="button">Forhåndsvis</button>
                    </nav>
                    <div className="flex-center format-buttons">
                        <div >
                            {popupOptions}
                            <button type="button" onClick={this.handleBold}>
                                <i className="material-icons">format_bold</i>
                            </button>
                            <button type="button" onClick={this.handleItalic}>
                                <i className="material-icons">format_italic</i>
                            </button>
                        </div>
                        <div>
                            <button type="button" onClick={this.handleLink}>
                                <i className="material-icons">insert_link</i>
                            </button>
                        </div>
                        <div>
                            <button type="button" onClick={this.handleBulleted}>
                                <i className="material-icons">format_list_bulleted</i>
                            </button>
                            <button type="button" onClick={this.handleNumbered}>
                                <i className="material-icons">format_list_numbered</i>
                            </button>
                        </div>
                    </div>
                </div>
                <textarea id="textarea" className="form-control comment-textarea" placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.handleChange}></textarea>
                <div className="flex-center btn-group">
                    <input className= "submit-btn" type="submit" value={this.props.submitText} />
                </div>
            </form>
        );
    }
}

export default TextInput;