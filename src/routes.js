import React from 'react';
import {Route, IndexRoute} from 'react-router';
import auth from './auth/authUtils';
import Home from './common/Home';
import AddComment from './common/AddComment';
import PostLayout from './common/PostLayout';
import Layout from './common/Layout';
import AddPost from './common/AddPost';
import Login from './common/UserAdmin/Login';
import Logout from './common/UserAdmin/Logout';
import Register from './common/UserAdmin/Register';

import CompanyLayout from './common/CompanyLayout';
import SegmentLayout from './common/SegmentLayout';

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={Home}/>
        <Route path="login" component={Login} onEnter={auth.requireNotAuth} />
        <Route path="logout" component={Logout} onEnter={auth.requireAuth} />
        <Route path="register" component={Register} onEnter={auth.requireNotAuth} />

        <Route path="user/:user_id" component={PostLayout}  />
        <Route path="segment/:name" component={SegmentLayout}  />
        <Route path="segment/:name/company/:ticker" component={CompanyLayout}  />
        <Route path="segment/:name/company/:ticker/post" component={AddPost} onEnter = {auth.requireAuth} />
        <Route path="segment/:name/company/:ticker/post/:post_id(/:slug)/comment(/:comment_id)" component={AddComment} onEnter={auth.requireAuth}/>
        <Route path="segment/:name/company/:ticker/post/:post_id(/:slug)" component={PostLayout}  />
/*
        <Route path="company/:ticker" component={CompanyLayout}  />
        <Route path="company/:ticker/post" component={AddPost}  />
        <Route path="company/:ticker/post/:post_id" component={PostLayout}  />
        <Route path="company/:ticker/post/:post_id/comment/:comment_id" component={AddComment} />*/
    </Route>
);

export default routes;

