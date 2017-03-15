import React, { Component } from 'react';
import Authenticated from '../../auth/Authenticated';
import NotAuthenticated from '../../auth/NotAuthenticated';
import { Link } from 'react-router';

class BasicDropdown extends Component{

    /*
        Input:
            links - Links to be displayed in dropdown
                url: url link should send to
                name: displayname for link
                * auth: should it be displayed only to authenticated users?
                * notAuth: should it be displayed only to unauthenticated users?
        * Means not required, will be showed to all users
     */



    componentDidMount () {
        document.addEventListener('click', this.props.handleDocumentClick, false)
    }
    componentWillUnmount () {
        document.removeEventListener('click', this.props.handleDocumentClick, false)
    }


    render(){
        let links = this.props.links.map((link) => {
            if(link.auth){
                return (
                    <Authenticated>
                        <Link key={link.url} to={link.url} onClick={this.props.toggleDropdown}>{link.name}</Link>
                    </Authenticated>
                )
            }
            else if (link.notAuth){
                return (
                    <NotAuthenticated>
                        <Link to={link.url} key={link.url} onClick={this.props.toggleDropdown}>{link.name}</Link>
                    </NotAuthenticated>
                )
            }
            return <Link to={link.url} key={link.url} onClick={this.props.toggleDropdown}>{link.name}</Link>

        });
        return(
                <nav className="navDropdown box-shadow">
                    <li className="flex-center flex-column">
                        {links}
                    </li>
                </nav>

        )
    }
}
export default BasicDropdown;