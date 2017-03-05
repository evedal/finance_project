import React, { Component } from 'react';
import ImageToggle from './ImageToggle'
import InputField from './inputs/InputField';

class AddPostHeader extends Component{
    render(){
        let data = this.props.data;
        console.log(data);
        let imageData = {
            handleImgToggle: data.handleImgToggle,
            url: data.imgUrl,
            cancelled: data.cancelled
        };
        return (
            <div className="flex-center flex-column">
                <InputField onChange={data.handleUrlUpdate} onBlur={data.handleUrlOnBlur}
                            placeholder="Link til artikkel, bloggpost e.l." name="url" value={data.url} />
                <ImageToggle data = {imageData}/>
                <InputField onChange={data.handleHeaderUpdate} value={data.header}
                            placeholder="Legg inn overskrift" name="header" />
            </div>
            );
    }
}
export default AddPostHeader
