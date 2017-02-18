import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route} from 'react-router';
import Home from './common/Home';
import PostLayout from './common/PostLayout';
import reactRouterToArray from 'react-router-to-array';
import pathToRegexp from 'path-to-regexp';
import { browserHistory } from 'react-router';
let re = pathToRegexp("/company/:company_id/post/:post_id", [{name : 'company_id'}, {name : 'post_id'}]);
console.log(re.exec("/company/1/post/12"));
console.log(reactRouterToArray(
    <Router history={browserHistory}>
        <Route path="/user/:user_id" component={PostLayout}  />
        <Route path="/company/:company_id/post/:post_id" component={PostLayout}  />
        <Route path="/" component={Home} >
            <Route path="/company" component={Home} >
                <Route path="/:company_id" component={Home} >
                    <Route path="/post/:post_id" component={Home} />
                </Route>
            </Route>
            <Route path="/segment" component={Home}>
                <Route path="/:segment_id"/>
            </Route>
            <Route path="/user" component={Home}>
                <Route path="/:segment_id"/>
            </Route>
        </Route>
    </Router>
));
ReactDOM.render(
    <Router history={browserHistory}>

        <Route path="/user/:user_id" component={PostLayout}  />
        <Route path="/company/:company_id/post/:post_id" component={PostLayout}  />
        <Route path="/" component={Home} />


    </Router>,
    document.getElementById("root")
);