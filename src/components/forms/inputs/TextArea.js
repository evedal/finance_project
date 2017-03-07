import React, {Component} from 'react'

class TextArea extends Component{
    render(){
        return <textarea className="form-control comment-textarea"
                  placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange} />

    }
}
export default TextArea;