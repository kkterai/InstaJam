import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostInput from './PostInput';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      toggleModal: this.props.toggleModal,
      errors: {}
    };

    this.updateContent = this.updateContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addField = this.addField.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  addField() {
    this.setState({ fields: [...this.state.fields, { content: ''}] });
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      contents: this.state.fields,
      username: user.username,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ fields: [] });
  }

  updateContent(index) {
    return (e) => {
      console.log(e.target.value)
      const newField = {content: e.target.value}
      this.setState({fields: [...this.state.fields.slice(0,index), newField, ...this.state.fields.slice(index+1)]})
    }
  }

  render() {
    const { errors } = this.state;
    const fields = this.state.fields.map((field, index) => {
      return <PostInput key={ index } updateContent={this.updateContent(index)} content={field.content} />
    });

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
              {fields}
              </div>
              <button type="button" onClick={ this.addField }> Add Content </button>
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
