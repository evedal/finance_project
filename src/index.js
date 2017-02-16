import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route} from 'react-router';
import Home from './common/Home';
import PostLayout from './common/PostLayout';

import { browserHistory } from 'react-router'


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Home} >
        <Route path="company" component={Home} />
            <Route path="/company_id:" component={Home} >
                <Route path="comments/post_id:" component={PostLayout}/>
            </Route>
        </Route>
        <Route path="segment" component={Home}>
            <Route path="/segment_id:"/>
        </Route>
    </Router>,
    document.getElementById("root")
);