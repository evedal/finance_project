import React, { Component } from 'react';
import Comment from '../components/comments/Comment';
import Header from '../components/other/Header';
import LargeTextField from '../components/forms/LargeTextField';

import {get, post} from '../utils/APImanager';
import User from '../models/User';
import Text from '../utils/messages/Text';

class AddComment extends Component{
    constructor(){
        super();
        this.state = {
            comment: {
            },
            post: {

            },
            user: User.getUser(),
            value: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateValue = this.updateValue.bind(this);

    }

    componentDidMount() {
        if(this.props.params.comment_id) {
            get('/api/comment/' + this.props.params.comment_id, function (err, comment) {
                if (err) {
                    console.log(err.message);
                    return;
                }
                this.setState({comment: comment[0]})
            }.bind(this));
        }
        get('/api/post/' + this.props.params.post_id, function (err, post) {
            if (err) {
                console.log(err.message);
                return;
            }
            this.setState({post: post[0]})
        }.bind(this));
        User.on("change", (user) => {
            this.setState({user: user})
        });

    }
    componentWillUnmount(){
        User.removeAllListeners('change')
    }
    handleChange(event){
        event.preventDefault();
        this.setState({value: event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        let state = this.state;
        let params = this.props.params;
        let redirectPath = "/segment/"+params.name+"/company/"+params.ticker+"/post/"+params.post_id;
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
    render(){
        let comment;
        let headerPost;
        let params = this.props.params;
        let postData = {
            post_id: "",
            parent_comment_id: "",
            user_id: 1 //todo: change to dynamic
        };
        if(this.state.comment.comment_id){
            comment = <Comment urlParams = {params} currentComment = {this.state.comment}/>
            postData.parent_comment_id = this.state.comment.comment_id;
        }

        if(this.state.post.post_id){
            let postLink = "/segment/"+params.name+"/company/"+params.ticker+"/post/"+params.post_id;
            let headerData = {
                icon: "",
                iconLink: "",
                links: [
                    {
                        title: this.state.post.header,
                        url: postLink
                    },
                    {
                        title: Text.headers.addComment
                    }

                ]
            };
            headerPost = <Header {...headerData}/>
        }

        let textInputData = {
            updateValue: this.updateValue,
            handleChange: this.handleChange,
            value: this.state.value,
            placeholder: "Skriv en kommentar",
            submitText: "Publiser ditt svar",
        }
        return(
            <div className="container">
                {headerPost}
                <div className="content-wrap">
                    {comment}
                    <form onSubmit={this.handleSubmit}>
                        <LargeTextField data = {textInputData} />
                    </form>
                </div>
            </div>
        )
    }
}
export default AddComment;