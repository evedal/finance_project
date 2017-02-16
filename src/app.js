import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Posts from './components/Posts';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
    render(){
        return(
            <Posts />
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
