/**
 * Created by evend on 2/16/2017.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import InputField from '../../components/forms/inputs/InputField';
import Header from '../../components/other/Header';
import FormLayout from '../../components/forms/FormLayout';
import SubmitBtn from '../../components/forms/buttons/SubmitBtn';
import { post } from '../../utils/APImanager';
import Placeholder from '../../utils/messages/Placeholder';
import ErrorMessage from '../../utils/messages/ErrorMessage';
import Text from '../../utils/messages/Text';

class Register extends Component{
    constructor(){
        super();
        this.state = {
            user: {
                email: "",
                username: "",
                firstName: "",
                lastName: "",
                password: "",
                passwordRe: ""
            },
            allValid: false
        };
        this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
        this.handleFirstNameUpdate = this.handleFirstNameUpdate.bind(this);
        this.handleLastNameUpdate = this.handleLastNameUpdate.bind(this);
        this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);
        this.handlePassUpdate = this.handlePassUpdate.bind(this);
        this.handlePassReUpdate = this.handlePassReUpdate.bind(this);
        this.onValid = this.onValid.bind(this);
        this.onInvalid = this.onInvalid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }
    handleEmailUpdate(e){
        e.preventDefault();
        let user = this.state.user;
        user.email = e.target.value;
        this.setState({user: user});
    }
    handleUsernameUpdate(e){
        e.preventDefault();
        let user = this.state.user;
        user.username = e.target.value;
        this.setState({user: user});
    }
    handleFirstNameUpdate(e){
        e.preventDefault();
        let user = this.state.user;
        user.firstName = e.target.value;
        this.setState({user: user});
    }
    handleLastNameUpdate(e){
        e.preventDefault();
        let user = this.state.user;
        user.lastName = e.target.value;
        this.setState({user: user});
    }
    handlePassUpdate(e){
        e.preventDefault();
        let user = this.state.user;
        user.password = e.target.value;
        this.setState({user: user});
    }
    handlePassReUpdate(e){
        e.preventDefault();
        let user = this.state.user;
        user.passwordRe = e.target.value;
        this.setState({user: user});
    }
    onValid(){
        if(!this.state.allValid){
            this.setState({allValid: true});
        }
    }
    onInvalid(){
        if(this.state.allValid){
            this.setState({allValid: false});
        }
    }
    handleSubmit(e){
        e.preventDefault();
        let user = this.state.user;
        console.log(user);
        if(!user.email || !user.username || !user.password || !user.passwordRe){
            return alert("Du må fylle inn feltene først");
        }
        if(user.password !== user.passwordRe){
            return alert("Passordene matcher ikke")
        }
        if(user.password.length < 8){
            return alert("Passordet må være minimum 8 karakterer");
        }
        let payload = {
            email: user.email,
            username: user.username,
            first_name: user.first_name ? user.first_name : "",
            last_name: user.last_name ? user.last_name : "",
            password: user.password
        };
        //Sends call to api, gets back token or error
        post("/api/user", payload, function (err, result) {
            if(err) return alert(err);
            this.props.router.push("/login");
        }.bind(this))


    }

    render(){
        let headerData = {
            links: [{
                title: Text.headers.home,
                url: "/"
            }, {
                title: Text.headers.register,
            }]
        };
        let usernameData = {
            onChange: this.handleUsernameUpdate,
            placeholder: Placeholder.register.username,
            name: "username",
            value: this.state.user.username,
            error: {
                isValid: () => {
                    let field = this.state.user.username;
                    return field.length > 4 && field.length < 100;
                },
                message: ErrorMessage.missingInput()
            }
        }
        let firstNameData = {
            onChange: this.handleFirstNameUpdate,
            placeholder: Placeholder.register.firstName,
            name: "firstName",
            value: this.state.user.firstName,
        }
        let lastNameData = {
            onChange: this.handleLastNameUpdate,
            placeholder: Placeholder.register.lastName,
            name: "lastName",
            value: this.state.user.lastName,
        }
        let emailData = {
            onChange: this.handleEmailUpdate,
            placeholder: Placeholder.register.email,
            name: "email",
            value: this.state.user.email,
            type: "email",
            error: {
                isValid: () => {
                    let field = this.state.user.email;
                    //TODO: ADD EMAIL REGEX
                    return field.length > 4 && field.length < 300;
                },
                message: ErrorMessage.missingInput()
            }
        }
        let passwordData = {
            onChange: this.handlePassUpdate,
            placeholder: Placeholder.register.password,
            name: "password",
            value: this.state.user.password,
            type: "password",
            error: {
                isValid: () => {
                    let field = this.state.user.password;
                    return field.length > 7 && field.length < 200;
                },
                message: ErrorMessage.userAdmin.password
            }
        }
        let passwordReData = {
            onChange: this.handlePassReUpdate,
            placeholder: Placeholder.register.passwordRe,
            name: "passwordRe",
            value: this.state.user.passwordRe,
            type: "password",
            error: {
                isValid: () => {
                    let field = this.state.user.passwordRe;
                    console.log("passRE",field,"Pass",this.state.user.password)

                    return field === this.state.user.password;
                },
                message: ErrorMessage.userAdmin.passwordRe
            }
        }


        return(
            <div className="container">
                <Header {...headerData}/>
                <div className="content-wrap">
                    <FormLayout onSubmit={this.handleSubmit} onValid={this.onValid} onInvalid={this.onInvalid}>
                        <InputField {...usernameData}/>
                        <InputField {...firstNameData}/>
                        <InputField {...lastNameData} />
                        <InputField {...emailData}/>
                        <InputField {...passwordData}/>
                        <InputField {...passwordReData}/>
                        <SubmitBtn value={Placeholder.register.submit} />
                    </FormLayout>
                    <p>{Text.register.loginLabel}<Link to="/login"> {Text.register.loginLink}</Link></p>
                </div>
            </div>
        );
    }
}

export default Register;