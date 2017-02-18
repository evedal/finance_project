import React, { Component } from 'react';
import { Link } from 'react-router';
function getTimeSincePosted (datePosted){
    "use strict";
    let t = datePosted.replace("T"," ");
    t = t.replace("Z","");
    t = t.split(/[- :]/);
    let postedDate = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    let timeDiffMillis = Date.now() - postedDate.getTime();
    let timeDiffMin = Math.round(timeDiffMillis/(1000*60));

    return([Math.floor(timeDiffMin/60), timeDiffMin])

}
class Post extends Component{
    render(){
        console.log(this.props);
        const post = this.props.currentPost;
        console.log(post);
        let timeSincePosted = getTimeSincePosted(post.created_date);
        let timePresentation;
        if(timeSincePosted[0] > 0){
            timePresentation = timeSincePosted[0] + " timer";
        }
        else{
            timePresentation = timeSincePosted[1] + " minutter";
        }
        return(
            <div>
                <Link to = {'/user/'+post.user_id} >
                    <div>
                        <h4>av {post.username}</h4>
                    </div>
                </Link>
                <Link to={'/company/'+post.company_id + "/post/" +post.post_id }>
                    <div>
                        <h3>{ post.header }</h3>
                        <p> { post.content }</p>
                    </div>
                    <div>
                        <span>Postet for { timePresentation } siden</span>
                        <span>{post.comment_count} <i className="material-icons">comment</i></span>
                        <span>{post.like_count} <i className="material-icons">thumb_up</i></span>
                    </div>
                </Link>
            </div>
        )
    }
}
export default Post;