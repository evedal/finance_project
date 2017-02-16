import React, { Component } from 'react';

class PostLayout extends Component{
    constructor(){
        super();
        this.state = {
            post: {

            },
            company: {

            }
        }
    }
    componentDidMount(){
        url = location.pathname.split("/");
        fetch('./api/post/'+url[-1])//post id
            .then(function (response) {
                if(response.ok){
                    response.json().then((postJson) => {
                        this.setState({post: postJson[0]})
                    })
                }
            }.bind(this));
        fetch('./api/post/'+url[-3])//company id
            .then(function (response) {
                if(response.ok){
                    response.json().then((postJson) => {
                        this.setState({company: postJson[0]})
                    })
                }
            }.bind(this))
    }
    render(){
        return(
            <div>
                <Header icon = "mode_edit" company_title = { this.state.company.company_title }/>
                <Post currentPost = { this.state.post }/>

            </div>
        )
    }
}
export default PostLayout;