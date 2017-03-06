import React, { Component } from 'react';
import CompanyPosts from '../components/posts/CompanyPosts';
import Header from '../components/other/Header';
import Dropdown from '../components/other/Dropdown'
import {get} from '../utils/APImanager'
import Segment from '../components/segment/Segment';

class Segments extends Component{
    constructor() {
        super();
        this.state = {
            segments: []
        };
    }
    /*
        Gets all segments
     */
    componentDidMount(){
        get('/api/segment/', function (err, segments) {
            console.log(segments);
            if(err){
                console.log(err.message);
                return;
            }
            this.setState({segments: segments});
        }.bind(this));

    }
    formatSegments(segments){
        return segments.map((segment, i) => {
            let data = {
                segment: {
                    name: segment.name,
                    desc: segment.description,
                    market_name: segment.market_name,
                    url: "/segment/"+segment.name

                }
            };
            return <Segment {...data} />
        });
    }
    render(){
        let segments = this.formatSegments(this.state.segments);
        let headerData = {
            icon: "add",
            iconLink: "/segment/create",
            links: [{
                title: "Segmenter",
                url: "#"
            }]
        };

        return(
            <div className="container">
                <Header {...headerData}/>
                {segments}
            </div>
        )
    }
}
export default Segments;