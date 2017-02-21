import React, { Component } from 'react';
import ImageToggle from './ImageToggle'
class AddPostHeader extends Component{
    render(){
        let data = this.props.data;
        console.log(data)
        let imageData = {
            handleImgToggle: data.handleImgToggle,
            url: data.url,
            cancelled: data.cancelled
        }
        return (
            <div className="flex-center flex-column">
                <input onChange={data.handleUrlUpdate} name="url" type="text" className="form-control input-field" onBlur={data.handleUrlOnBlur}/>
                <ImageToggle data = {data}/>
                <input onChange={data.handleHeaderUpdate} name="header" type="text" className="form-control input-field" value={data.header}/>
            </div>
            );
    }
}
export default AddPostHeader
