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
            }
        };
        this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
        this.handleFirstNameUpdate = this.handleFirstNameUpdate.bind(this);
        this.handleLastNameUpdate = this.handleLastNameUpdate.bind(this);
        this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);
        this.handlePassUpdate = this.handlePassUpdate.bind(this);
        this.handlePassReUpdate = this.handlePassReUpdate.bind(this);

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
            title: "Registrer deg",
            titleLink: "#"
        };


        return(
            <div>
                <Header data={headerData}/>
                <FormLayout onSubmit={this.handleSubmit}>

                    <InputField onChange={this.handleUsernameUpdate} placeholder="Brukernavn" name="username"
                                value={this.state.user.username} type="text"/>
                    <InputField onChange={this.handleFirstNameUpdate} placeholder="Fornavn" name="firstName"
                                value={this.state.user.firstName} type="text"/>
                    <InputField onChange={this.handleLastNameUpdate} placeholder="Etternavn" name="lastName"
                                value={this.state.user.lastName} type="text"/>
                    <InputField onChange={this.handleEmailUpdate} placeholder="Email" name="email"
                                value={this.state.user.email} type="email"/>
                    <InputField onChange={this.handlePassUpdate} placeholder="Passord" name="password"
                                value={this.state.user.password} type="password"/>
                    <InputField onChange={this.handlePassReUpdate} placeholder="Skriv passord igjen" name="passwordRe"
                                value={this.state.user.passwordRe} type="password"/>
                    <SubmitBtn submitText="Registrer deg" />
                </FormLayout>
                <p>Har du allerede en bruker?<Link to="/login"> Logg inn</Link></p>

            </div>
        );
    }
}

export default Register;