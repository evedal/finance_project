import React, { Component } from 'react';
import Posts from '../components/posts/Posts';
import Header from '../components/other/Header';

class Home extends Component{
    render(){
        return(
                <div>
                    <Header icon = "" title = "Din forside" />
                    <Posts posts={[]}/>
                </div>
        )
    }
}
export default Home;