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
import auth from '../../auth/authUtils'

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
            })
            this.props.router.push("/");
        }.bind(this))


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
                <p>Har du ikke bruker?<Link to="/register"> Registrer deg</Link></p>
            </div>
        );
    }
}

export default Login;