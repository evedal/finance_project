import React, {Component} from 'react';
import InputHeaderPopup from './InputHeaderPopup';

class InputHeader extends Component {


    render(){
        let navigation;
        if(this.props.writeTab){
            navigation = (
                <nav>
                    <button id="write"type="button" className="active icon-button" onClick={this.props.handleTabChange}
                    >Skriv</button><button id="prev" type="button" className="icon-button" onClick={this.props.handleTabChange}>Forhåndsvis</button>
                </nav>
            )
        }
        else{
            navigation = (
                <nav>
                    <button id="write"type="button" className="icon-button" onClick={this.props.handleTabChange}
                    >Skriv</button><button className="active icon-button" id="prev" type="button" onClick={this.props.handleTabChange}>Forhåndsvis</button>
                </nav>
            )
        }
        return(
            <div className="input-header flex-center">
                {navigation}
                <div className="flex-center format-buttons">
                    <div >
                        <InputHeaderPopup popup = {this.props.popup} isOpen = {this.props.popup} handlePopup = {this.props.handlePopup} handleHeaders={this.props.handleHeaders} />
                        <button type="button" className="icon-button" onClick={this.props.handleBold}>
                            <i className="material-icons">format_bold</i>
                        </button>
                        <button type="button" className="icon-button" onClick={this.props.handleItalic}>
                            <i className="material-icons">format_italic</i>
                        </button>
                    </div>
                    <div>
                        <button type="button" className="icon-button" onClick={this.props.handleLink}>
                            <i className="material-icons">insert_link</i>
                        </button>
                    </div>
                    <div>
                        <button type="button" className="icon-button" onClick={this.props.handleBulleted}>
                            <i className="material-icons">format_list_bulleted</i>
                        </button>
                        <button type="button" className="icon-button" onClick={this.props.handleNumbered}>
                            <i className="material-icons">format_list_numbered</i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default InputHeader;