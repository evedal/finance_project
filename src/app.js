import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Posts from './components/Posts';
class App extends Component {
    render(){
        return(
            <Posts />
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
