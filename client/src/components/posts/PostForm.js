import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostInput from './PostInput';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      fields: [],
      toggleModal: this.props.toggleModal,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addField = this.addField.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  addField() {
    const fields = this.state.fields.concat(PostInput);
    debugger;
    this.setState({ fields, contents: [...this.state.contents, { content: ''}] });
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      contents: this.state.contents,
      username: user.username,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ contents: [] });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const fields = this.state.fields.map((PostInput, index) => {
      return <PostInput key={ index } index={ index } content={this.state.contents[index].content} />
    });

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
              {fields}
              </div>
              <button onClick={ this.addField }> Add Content </button>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
