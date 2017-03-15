import {Link} from 'react-router';
import React, { Component } from 'react';

class Header extends Component{

    createBreadcrumbs(links){
        if(!links) return null;
        //Creates links for breadcrumbs in header
        return links.map((link, i) => {
            // if last item or just one item, don't add /
            let slash = null;
            let out = null;
            console.log(link);
            console.log(links.length);
            //If there are more than two links in the list
            let aboveTwo = links.length > 2;
            //If not the last link, add forward slash
            if(i !== links.length - 1){

                //If there are more than two links, add dots in between slashes
                if(i === 1 && aboveTwo)
                    slash = <span className="link-divider">/... /</span>;
                    //Else if there are less than two links, just add a slash
                else if(!aboveTwo) {
                    slash = <span className="link-divider">/</span>
                }
            }

            //Shorten the title if its longer than a value
            if(link.title && link.title.length > 20){
                link.title = link.title.slice(0,20) + " ..."
            }
            // If there are two or less links, or the first or last link of many, add the link
            let lastLink = i === links.length - 1;
            if(!aboveTwo || i === 0 || lastLink) {

                //If its the last link, this is the current page, and should not be clickable
                if (lastLink)
                    out = (
                            <h2 className="breadcrumb-end">{link.title}</h2>
                    );
                else
                    out = (
                            <Link to={link.url}>{link.title}</Link>
                    );
            }
            return [out, slash];

        })
    }
    render(){
        let icon;
        if(this.props.icon){
            icon = (
                <Link to={this.props.iconLink}>
                    <i className="material-icons head-icon cursor-point">{this.props.icon}</i>
                </Link>
                )
        }
        let links = this.createBreadcrumbs(this.props.links);
        return(
            <div className="second-header flex-center">
                <div className="flex-start flex-center">
                    {links}
                </div>
                {icon}
            </div>
        )
    }
}
export default Header;