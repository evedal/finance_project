import React, { Component } from 'react';
import Posts from '../components/Posts';
import Header from '../components/Header';

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