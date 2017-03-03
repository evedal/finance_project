/**
 * Created by evend on 2/16/2017.
 */
import React, { Component } from 'react';
import InputField from '../components/forms/inputs/InputField';
import Header from '../components/other/Header';
import FormLayout from '../components/forms/FormLayout';
import SubmitBtn from '../components/forms/buttons/SubmitBtn';
import { post } from '../utils/APImanager';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: ""
        };
        this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
        this.handlePassUpdate = this.handlePassUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }
    handleEmailUpdate(e){
        e.preventDefault();
        this.setState({email: e.target.value});
    }
    handlePassUpdate(e){
        e.preventDefault();
        this.setState({password: e.target.value});

    }
    handleSubmit(e){
        e.preventDefault();
        if(!this.state.email || !this.state.password) {
            console.log("Må skrive inn passord og email");
            return;
        }
        let payload = {
            email: this.state.email,
            password: this.state.password
        };
        post("/api/auth/login", payload, function (err, result) {
            if(err) return console.log(err);
            console.log(result)

        })


    }

    render(){
        let headerData = {
            title: "Logg inn",
            titleLink: "#"
        };


        return(
            <div>
                <Header data={headerData}/>
                <FormLayout onSubmit={this.handleSubmit}>
                    <InputField onChange={this.handleEmailUpdate} placeholder="Email" name="email"
                                value={this.state.email} type="text"/>
                    <InputField onChange={this.handlePassUpdate} placeholder="Passord" name="password"
                                value={this.state.password} type="password"/>
                    <SubmitBtn submitText="Logg inn" />
                </FormLayout>
            </div>
        );
    }
}

export default Login;