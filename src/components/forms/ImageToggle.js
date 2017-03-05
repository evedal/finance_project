import React, { Component } from 'react';

class ImageToggle extends Component{
    render(){
        let image = null;
        let data = this.props.data;
        if(data.url){
            if(data.cancelled){
                image = (
                    <button className="flex-center icon-button" type="button" onClick={data.handleImgToggle}>
                        <p className="">Bruk bildet?</p>
                        <i className="material-icons">add</i>
                    </button>
                )
            }
            else{
                image = (
                    <div className="flex-center">
                        <img src={data.url}/>
                        <button className="flex-center icon-button" type="button" onClick={data.handleImgToggle}>
                            <p className="">Fjern bildet?</p>
                            <i className="material-icons">clear</i>
                        </button>
                    </div>

            )
            }
        }
        return image;
    }
}
export default ImageToggle
