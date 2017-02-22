import React, {Component} from 'react';
import AddPostHeader from '../components/forms/AddPostHeader'
import Header from '../components/other/Header'
import LargeTextField from '../components/forms/LargeTextField'
import validUrl from 'valid-url';
import { get, post } from '../utils/APImanager';


class AddPost extends Component{
    constructor(){
        super();
        this.state = {
            post: {
                url: "",
                header: "",
                imgUrl: "",
                value: "",
                cancelled: false
            },
            company: {

            },
        }
        this.handleUrlOnBlur = this.handleUrlOnBlur.bind(this);
        this.handleHeaderUpdate = this.handleHeaderUpdate.bind(this);
        this.handleUrlUpdate = this.handleUrlUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImgToggle = this.handleImgToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateValue = this.updateValue.bind(this);

    }

    componentDidMount(){
        let ticker = this.props.params.ticker;
        get('/api/company/'+ticker, function (err, company) {
            console.log(company);
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({company: company[0]})
        }.bind(this));
    }

    // Handlers for markdown
    handleImgToggle(){
        let post = this.state.post;
        post.cancelled = !post.cancelled;
        this.setState({post: post})
    }
    handleUrlOnBlur(){
        let url = this.state.post.url;
        let isValid = validUrl.isUri(url);
        if(isValid){
            get("/api/post/ogdata/"+encodeURIComponent(url), function (err, result){
                if(err){
                    console.log("Fant ikke og:data");
                    return;
                }
                let post = this.state.post;
                if(!post.header){
                    post.header = result.ogTitle
                }
                post.imgUrl = result.ogImage.url;
                console.log(post);

                this.setState({post: post})
            }.bind(this));
        }

    }

    handleHeaderUpdate(event){
        event.preventDefault();
        let post = this.state.post;
        post.header = event.target.value;
        this.setState({post: post});

    }
    handleUrlUpdate(event){
        console.log(event.target.value)
        event.preventDefault();
        let post = this.state.post;
        post.url = event.target.value;
        this.setState({post: post});
    }
    handleChange(event){
        event.preventDefault();
        let post = this.state.post;
        post.value = event.target.value;
        this.setState({post: post});
    }
    updateValue(newValue, callback){
        console.log(newValue);
        this.setState({value: newValue}, callback)
    }

    handleSubmit(event){
        event.preventDefault();
        let _post = this.state.post;
        let params = this.props.params;
        let segmentPath = "/segment/"+params.name;
        let data = {
            header: _post.header,
            content: _post.value,
            image_url: _post.imgUrl,
            link_url: _post.url,
            ticker: this.state.company.ticker,
            user_id: 1, //TODO
        };
        post("/api/post", data, (err, post) => {
            if(err){
                alert(err.message);
                return;
            }
            this.props.router.push(segmentPath+'/company/'+params.ticker+'/post/'+post.post_id);
        })


    }

    render(){
        let header;

        if(this.state.company.company_id){
            let params = this.props.params;
            let titleLink = "/segment/"+params.name+"/company/"+params.ticker;
            let headerData = {
                icon: "",
                iconLink: "",
                title: this.state.company.name,
                titleLink: titleLink
            };
            header = <Header data = {headerData}/>
        }
        let addPostHeaderData = {
            handleImgToggle: this.handleImgToggle,
            url: this.state.post.imgUrl,
            cancelled: this.state.post.cancelled,
            header: this.state.post.header,
            handleUrlOnBlur: this.handleUrlOnBlur,
            handleUrlUpdate: this.handleUrlUpdate,
            handleHeaderUpdate: this.handleHeaderUpdate
        };
        let textInputData = {
            updateValue: this.updateValue,
            handleChange: this.handleChange,
            value: this.state.value,
            placeholder: "Skriv en tekst",
            submitText: "Publiser din post",
        }
        return(
            <div className="container">
                {header}
                <form onSubmit={this.handleSubmit}>
                    <AddPostHeader data={addPostHeaderData}/>
                    <LargeTextField data = {textInputData}/>
                </form>
            </div>
        )
    }
}
export default AddPost;