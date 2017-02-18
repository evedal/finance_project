import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route} from 'react-router';
import Home from './common/Home';
import AddComment from './common/AddComment';
import PostLayout from './common/PostLayout';
import { browserHistory } from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>

        <Route path="/user/:user_id" component={PostLayout}  />
        <Route path="/company/:company_id/post/:post_id" component={PostLayout}  />
        <Route path="/" component={Home} />
        <Route path="/company/:company_id/post/:post_id/comment/:comment_id" component={AddComment} />

    </Router>,
    document.getElementById("root")
);