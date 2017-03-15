import React, { Component } from 'react';


//Handles validation for first-children, not deeper
class FormLayout extends Component{
    constructor(){
        super();
        this.state = {
            validChildren: [

            ],
            allValid: false
        };
        this.handleValid = this.handleValid.bind(this);
        this.handleInvalid = this.handleInvalid.bind(this)
    }
    componentDidMount(){
        //If an error has been spesified, checks if children are valid from rule
        let validChildren = React.Children.map(this.props.children, (child, i) => {
            return (child.props.error) ? child.props.error.isValid() : true;
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
            console.log("Valid:"+isValid)
            if(!isValid) {
                allValid = false;
                break;
            }
        }
        let newState;
        //If the all inputs in form are valid, call parent eventHandler
        console.log("Allvalid: "+allValid +"Was;"+this.state.allValid)
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
        console.log("Allvalid"+this.state.allValid)
        if(this.state.allValid){
            console.log("Dette skal være riktig")
            this.props.onInvalid();
            this.setState({validChildren: validChildren, allValid: false});

        }
        else this.setState({validChildren: validChildren});
    }
    renderChildren(props, validChildren){
        return React.Children.map(props.children, (child, i) => {
            let newProps;
            console.log(child.props)
            if(child.props.error) {
                newProps = {
                    onValid: this.handleValid.bind(null, i),
                    onInvalid: this.handleInvalid.bind(null, i),
                    wasValid: validChildren[i],
                    showError: this.props.showError
                };
                console.log(validChildren);
            }
            return React.cloneElement(child, newProps)

        })
    }
    render(){
        console.log(this.state);
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="flex-center flex-column">
                    { this.renderChildren(this.props, this.state.validChildren) }
                </div>
            </form>
        )
    }
}
export default FormLayout;