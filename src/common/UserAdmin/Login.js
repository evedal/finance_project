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
import User from '../../models/User';
import auth from '../../auth/authUtils';
import Placeholder from '../../utils/messages/Placeholder';
import ErrorMessage from '../../utils/messages/ErrorMessage';
import Text from '../../utils/messages/Text';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            allValid: false
        };
        this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
        this.handlePassUpdate = this.handlePassUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onValid = this.onValid.bind(this);
        this.onInvalid = this.onInvalid.bind(this);


    }
    handleEmailUpdate(e){
        e.preventDefault();
        this.setState({email: e.target.value});
    }
    handlePassUpdate(e){
        e.preventDefault();
        this.setState({password: e.target.value});

    }
    onValid(){
        if(!this.state.allValid)
            this.setState({allValid: true});
    }
    onInvalid(){
        if(this.state.allValid)
            this.setState({allValid: false});
    }
    handleSubmit(e){
        e.preventDefault();
        if(!this.state.allValid){
            return
        }
        let payload = {
            email: this.state.email,
            password: this.state.password
        };

        //Sends call to api, gets back token or error
        post("/api/auth/login", payload, function (err, result) {
            if(err) return alert(err);
            if(!result.success){
                return alert("Brukernavn eller passord var feil")
            }
            User.setToken(result.token);
            auth.isAuthenticated(function (err, user) {
                if(err || !user) return console.log("Fant ikke bruker til token");
                User.setUser(user);
            });
            this.props.router.push("/");
        }.bind(this))


    }

    render(){
        let headerData = {
            title: "Logg inn",
            titleLink: "#"
        };

        let emailData = {
            onChange: this.handleEmailUpdate,
            placeholder: Placeholder.login.email,
            name: "email",
            value: this.state.email,
            type: "email",
            error: {
                isValid: () => {
                    let field = this.state.email;
                    //TODO: ADD EMAIL REGEX
                    return field.length > 5 && field.length < 100;
                },
                message: ErrorMessage.missingInput(),
            }
        };
        let passData = {
            onChange: this.handlePassUpdate,
            placeholder: Placeholder.login.password,
            name: "password",
            value: this.state.password,
            type: "password",
            error: {
                isValid: () => {
                    let field = this.state.password;
                    return field.length > 0;
                },
                message: ErrorMessage.missingInput(),
            }
        };

        return(
            <div>
                <Header data={headerData} />
                <FormLayout onSubmit={this.handleSubmit} onValid={this.onValid} onInvalid={this.onInvalid}>
                    <InputField {...emailData} />
                    <InputField {...passData} />
                    <SubmitBtn value={Placeholder.login.submit} disabled={!this.state.allValid}/>
                </FormLayout>
                <p>{Text.login.registerLabel}<Link to="/register"> {Text.login.registerLink}</Link></p>
            </div>
        );
    }
}

export default Login;