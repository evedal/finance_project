import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './common/AppRoutes';

window.onload = () => {
    ReactDOM.render(<AppRoutes/>, document.getElementById('root'));
};