import React, { Component } from 'react';


//Handles validation for first-children, not deeper
class FormLayout extends Component{
    constructor(){
        super();
        this.state = {
            validChildren: [

            ],
            allValid: false
        }
    }
    componentDidMount(){
        let validChildren = React.Children.map(this.props.children, (child, i) => {
            console.log(child.props);
            return !child.props.error ? true : child.props.error.isValid;
            }
        );
        this.setState({validChildren: validChildren});
    }
    //handles when a child is updated to valid input
    handleValid(i){
        let validChildren = this.state.validChildren;
        validChildren[i] = true;
        let allValid = true;
        //Checks wether all children now are valid
        for(let isValid of validChildren){
            if(!isValid) {
                allValid = false;
                break;
            }
        }
        let newState;
        //If the all inputs in form are valid, call parent eventHandler
        if(allValid && allValid !== this.state.allValid) {
            newState = {allValid: true, validChildren: validChildren};
            this.props.onValid();
        }
        else newState = {validChildren: validChildren};
        this.setState(newState);
    }

    handleInvalid(i){
        let validChildren = this.state.validChildren;
        validChildren[i] = false;
        let newState;
        if(this.state.allValid){
            newState = {validChildren: validChildren, allValid: false};
            this.props.onInvalid();
        }
        else newState = {validChildren: validChildren};
        this.setState({newState})
    }
    renderChildren(props){
        React.Children.forEach(this.props.children, (child, i) => {
            let newProps = {
                onValid: this.handleIsValid.bind(null, i),
                onInvalid: this.handleInvalid.bind(null, i),
                wasValid: this.state.validChildren[i]
            };
            return React.cloneElement(child, newProps)
        })
    }
    render(){
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="flex-center flex-column">
                    { this.props.children }
                </div>
            </form>
        )
    }
}
export default FormLayout;