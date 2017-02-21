import React, { Component } from 'react';

class InputHeaderPopup extends Component {
    render() {

        let optionHeader;
        if (this.props.popup) {
            optionHeader = (
                <div id="option-headers" className="option-content show">
                    <button onClick={this.props.handleHeaders} data-prefix="#" type="button">Header</button>
                    <button onClick={this.props.handleHeaders} data-prefix="##" type="button">Header</button>
                    <button onClick={this.props.handleHeaders} data-prefix="###" type="button">Header</button>
                </div>)
        }
        else {
            optionHeader = (
                <div id="option-headers" className="option-content">
                    <button className="icon-button" onClick={this.props.handleHeaders} data-prefix="#" type="button">Header</button>
                    <button className="icon-button" onClick={this.props.handleHeaders} data-prefix="##" type="button">Header</button>
                    <button className="icon-button" onClick={this.props.handleHeaders} data-prefix="###" type="button">Header</button>
                </div>)
        }
        return (
                <div className="pop-up-option">
                    <button className="icon-button" id="header-button" type="button" onClick={this.props.handlePopup}>
                        <i className="material-icons">text_fields</i>
                    </button>
                    {optionHeader}
                </div>
                );

    }
}
export default InputHeaderPopup