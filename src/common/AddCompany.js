import React, { Component } from 'react';
import Comment from '../components/comments/Comment';
import Header from '../components/other/Header';
import LargeTextField from '../components/forms/LargeTextField';
import Select from '../components/forms/inputs/Select';
import InputField from '../components/forms/inputs/InputField';
import TextArea from '../components/forms/inputs/TextArea';
import FormLayout from '../components/forms/FormLayout';
import SubmitBtn from '../components/forms/buttons/SubmitBtn';
import {get, post} from '../utils/APImanager';
import User from '../models/User';
import Placeholders from '../utils/messages/Placeholder';
import ErrorMessage from '../utils/messages/ErrorMessage';
import APIRoutes from "../utils/messages/APIRoute";
import Path from "../utils/messages/Path";
import Text from "../utils/messages/Text";


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
                selected: "",
                isDisabled: false
            },
            form: {
                showError: false,
                allValid: false,
                segment_isLoading: true,
            },
            user: User.getUser(),
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSegment = this.handleSegment.bind(this);
        this.handleTicker = this.handleTicker.bind(this);
        this.handleValid = this.handleValid.bind(this);
        this.handleInvalid = this.handleInvalid.bind(this);

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
                let form = this.state.form;
                console.log(form)
                form.segment_isLoading = false;
                this.setState({segments: segments, form: form});
            });
        }

        User.on("change", (user) => {
            this.setState({user: user})
        });
    }

    handleValid(){
        let form = this.state.form;
        form.allValid = true;
        this.setState({form: form})
    }
    handleInvalid(){
        let form = this.state.form;
        form.allValid = false;
        this.setState({form: form})
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

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.form.allValid) {
            return;
        }
        post(APIRoutes.company.base, this.state.company, (err, company) => {
            if (err) {
                return alert(err.status === 500 ? ErrorMessage.serverError : ErrorMessage.requestError);
            }
            this.props.router.push(Path.company(company.segment_name, company.ticker));
        });
    }



    dropdownOptions(segments){
        let dropdown = {};
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




        let headerData = {
            links: [
                {
                    title: Text.headers.home,
                    url: Path.companies
                },
                {
                title: Text.headers.addCompany,
            }]
        };
        let tickerField = {
            onChange: this.handleTicker,
            name: "ticker",
            placeholder: Placeholders.company.ticker,
            value: this.state.company.ticker,
            error: {
                isValid: () => {
                    let field = this.state.company.ticker;
                    return field.length > 0 && field.length < 10 && !/[^A-Z0-9]/.test(field)
                },
                message: ErrorMessage.company.wrongTickerFormat
            }
        };

        let nameField = {
            onChange: this.handleName,
            name: "name",
            placeholder: Placeholders.company.name,
            value: this.state.company.name,
            error: {
                isValid: () => {
                    let field = this.state.company.name;
                    return field.length > 0 && field.length < 50;
                },
                message: ErrorMessage.company.wrongNameFormat
            }
        };
        let descField = {
            onChange: this.handleDesc,
            name: "desc",
            placeholder: Placeholders.company.desc,
            value: this.state.company.description,
            error: {
                isValid: () => {
                    let field = this.state.company.description;
                    console.log(field);
                    return field.length > 50 && field.length < 1000;
                },
                message: ErrorMessage.company.wrongDescFormat
            }
        };
        console.log(this.state.form);
        let selectField = {
            onChange: this.handleSegment,
            name: "segment",
            placeholder: Placeholders.company.segment,
            value: this.state.dropdown.selected,
            isLoading: this.state.form.segment_isLoading,
            options: options,
            error: {
                isValid: () => {
                    let field = this.state.dropdown.selected;
                    return this.state.dropdown.selected.value > 0
                },
                message: ErrorMessage.company.wrongDescFormat
            }
        };

        let formValues = {
            onSubmit: this.handleSubmit,
            onValid: this.handleValid,
            onInvalid: this.handleInvalid,
            showError: this.state.form.showError
        };
        return(
            <div className="container">
                <Header {...headerData} />
                <div className="content-wrap">
                    <FormLayout {...formValues} >
                        <InputField {...tickerField} />
                        <InputField {...nameField} />
                        <Select {...selectField} />
                        <TextArea {...descField} />
                        <SubmitBtn value={Placeholders.company.submit} disabled={!this.state.form.allValid}/>
                    </FormLayout>
                </div>
            </div>
        )
    }
}
export default AddCompany;