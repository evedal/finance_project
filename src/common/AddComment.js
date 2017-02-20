import React, { Component } from 'react';
import Comment from '../components/Comment';
import Header from '../components/Header';
import TextInput from '../components/TextInput';

import {get, post} from '../utils/APImanager';

class AddComment extends Component{
    constructor(){
        super();
        this.state = {
            comment: {
            },
            post: {

            },
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateValue = this.updateValue.bind(this);

    }

    componentDidMount() {
        console.log(this.props) ;
        get('/api/comment/' + this.props.params.comment_id, function (err, comment) {
            if (err) {
                console.log(err.message);
                return;
            }
            this.setState({comment: comment[0]})
        }.bind(this));
        get('/api/post/' + this.props.params.post_id, function (err, post) {
            if (err) {
                console.log(err.message);
                return;
            }
            this.setState({post: post[0]})
        }.bind(this));
    }

    handleChange(event){
        event.preventDefault();
        this.setState({value: event.target.value});
        console.log(event.target.value)
    }
    handleSubmit(event){
        event.preventDefault();
        let state = this.state;
        if(state.value != ""){
            let data = {
                content: state.value,
                post_id: state.post.post_id,
                user_id: state.post.user_id,
                parent_comment_id: state.post.parent_comment_id
            };
            post("/api/comment", data, (err, post) => {
                if(err){
                    alert(err.message);
                    return;
                }
                console.log(post);
                this.props.router.push('/company/'+state.post.company_id+'/post/'+state.post.post_id);
            })
        }
        else{
            alert("Du må skrive inn noe tekst")
        }
    }
    updateValue(newValue, callback){
        this.setState({value: newValue}, callback())
    }



    render(){
        let comment;
        let headerPost;
        let postData = {
            post_id: "",
            parent_comment_id: "",
            user_id: 1 //todo: change to dynamic
        };
        if(this.state.comment.comment_id){
            comment = <Comment urlParams = {this.props.params} currentComment = {this.state.comment}/>
            postData.parent_comment_id = this.state.comment.comment_id;
        }
        if(this.state.post.post_id){
            headerPost = <Header title = {this.state.post.header} titleLink = {"/company/"+this.state.post.company_id+"/post/"+this.state.post.post_id}/>
            postData.post_id = this.state.post.post_id;
        }
        return(
            <div className="container">
                {headerPost}
                {comment}
                <TextInput updateValue = {this.updateValue} handleChange = {this.handleChange} handleSubmit = {this.handleSubmit } value = {this.state.value} placeholder = "Skriv en kommentar" submitText = "Publiser ditt svar" postData = {postData}/>
            </div>
        )
    }
}
export default AddComment;