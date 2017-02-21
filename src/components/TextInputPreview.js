import React, { Component } from 'react';
import ReactMarkDown from 'react-markdown';

class TextInputPreview extends Component{
    render(){
        let textPresented = this.props.text ? this.props.text : "### Du må skrive noe i tekstfeltet for å bruke forhåndsvisning";
        return (
            <div className="markdown">
                <ReactMarkDown source={textPresented} escapeHTML = {true} />
            </div>
        );
    }
}

export default TextInputPreview