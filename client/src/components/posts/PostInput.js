import React, { Component } from 'react'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

export default class PostInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // content: this.props.content,
      errors: {}
    }

  }


  render() {
    const { errors } = this.state;
 
    return (
      <div>
        <TextAreaFieldGroup
          placeholder="Your media here"
          name="content"
          value={this.props.content}
          onChange={this.props.updateContent}
          error={errors.content}
        />
      </div>
    )
  }
  
}
