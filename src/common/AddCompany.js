import React, { Component } from 'react';
import Comment from '../components/comments/Comment';
import Header from '../components/other/Header';
import LargeTextField from '../components/forms/LargeTextField';
import Dropdown from 'react-dropdown';

import {get, post} from '../utils/APImanager';
import User from '../models/User';

class AddCompany extends Component{
    constructor(){
        super();
        this.state = {
            company: {
                ticker: "",
                name: "",
                description: "",
                segment_id: "",
            },
            dropdown: {
                segments: [],
                selected: {
                    value: null,
                    label: null
                },
                isDisabled: false
            },
            user: User.getUser(),
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSegment = this.handleSegment.bind(this);
        this.handleTicker = this.handleTicker.bind(this);

    }
    //Possible to add segment as prop, then the dropdown will be disabled and that segment will be default value
    //Default is stored as the first element in segments state
    componentDidMount() {
        if(this.props.segment && this.props.segment.segment_id) {
            this.setState({segments: [this.props.segment], dropdownDisabled: true})
        }
        else {
            get("/api/segment", (err, segments) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.setState({segments: segments});
            });
        }

        User.on("change", (user) => {
            this.setState({user: user})
        });
    }

    handleSegment(option){
        let dropdown = this.state.dropdown;
        let company = this.state.company;
        dropdown.selected = option;
        company.segment_id = option.value;
        this.setState({company: company, dropdown: dropdown});
    }
    handleTicker(e){
        e.preventDefault();
        let company = this.state.company;
        company.ticker = e.target.value;
        this.setState({company: company});
    }
    handleName(e){
        e.preventDefault();
        let company = this.state.company;
        company.name = e.target.value;
        this.setState({company: company});

    }
    handleDesc(e){
        e.preventDefault();
        let company = this.state.company;
        company.description = e.target.value;
        this.setState({company: company});
    }

    handleSubmit(e){
        e.preventDefault();
        let state = this.state;
        let params = this.props.params;
        if(state.value != ""){
            let data = {
                content: state.value,
                post_id: state.post.post_id,
                user_id: state.user.user_id,
                parent_comment_id: state.comment.comment_id
            };
            console.log(this.state.user);
            post("/api/comment", data, (err, post) => {
                if(err){
                    alert(err.message);
                    return;
                }
                console.log(post);
                this.props.router.push(redirectPath);
            })
        }
        else{
            alert("Du må skrive inn noe tekst")
        }
    }

    updateValue(newValue, callback){
        this.setState({value: newValue}, callback)
    }

    dropdownOptions(segments){
        let dropdown = {options: [], defaultOption: null};
        if(!segments || segments.length < 1) {
            return dropdown;
        }
        dropdown.options = segments.map((segment) => {
            return {value: segment.segment_id, label: segment.name}
        });
        dropdown.defaultOption = dropdown.options[0];
        return dropdown;
    }
    render(){
        let comment;
        let headerPost;
        let params = this.props.params;

        const dropdown = this.dropdownOptions(this.state.segments);
        const options = dropdown.options;
        const defaultOption = dropdown.defaultOption;

        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <Dropdown options={options} onChange={this.handleSegment}
                              value={this.state.dropdown.selected} placeholder="Velg ett segment"/>
                </form>
            </div>
        )
    }
}
export default AddCompany;