import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Home from './common/Home';
import AddComment from './common/AddComment';
import PostLayout from './common/PostLayout';
import Layout from './common/Layout';
import CompanyLayout from './common/CompanyLayout';

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={Home}/>
        <Route path="user/:user_id" component={PostLayout}  />
        <Route path="company/:company_id" component={CompanyLayout}  />
        <Route path="company/:company_id/post/:post_id" component={PostLayout}  />
        <Route path="company/:company_id/post/:post_id/comment/:comment_id" component={AddComment} />
    </Route>
);

export default routes;

