import React, { Component } from 'react';
import { Link } from 'react-router';
class Segment extends Component{

    render(){
        const segment = this.props.segment;
        let header;
        let content;
        if(segment && segment.name){
            header = (
                    <div className="post-head">
                        <h3>{segment.market_name}</h3>
                    </div>
                );
            content = (
                <Link to = {segment.url } >
                    <h5>{segment.name}</h5>
                    <p>{segment.desc}</p>
                </Link>
            )
        }
        console.log(this.props.segment);
        return(
            <div className="post">
                {header}
                <div className="post-content">
                    {content}
                </div>
            </div>
        )
    }
}
export default Segment;