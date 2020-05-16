import React, { Component } from 'react'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

export default class PostInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { index } = this.props;
    console.log(index)
    return (
      <div>
        <TextAreaFieldGroup
          placeholder="Your media here"
          name="content"
          value={this.state.content}
          onChange={this.onChange}
          error={errors.content}
        />
      </div>
    )
  }
  
}
