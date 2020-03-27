import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { registerUser } from "../../actions/authActions";
import classnames from 'classnames';
import logo from '../../img/Instagram-text.png';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
        name: '',
        email: '',
        username: '',
        password: '',
        password2: '',
        errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

onChange(e) {
    this.setState({[e.target.name]: e.target.value});
}

onSubmit(e) {
    e.preventDefault();

    const newUser = {
        name: this.state.name,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2
    };
    debugger;
    this.props.registerUser(newUser, this.props.history);
}

componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
}

render() {
    const { errors } = this.state;
    
    return (
        <div className="signup">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <img className="signin-logo" src={logo} alt="Logo"></img>
                <h3 className="display-4 text-center insta">Sign up to see photos and videos from your friends.</h3>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input type="text" 
                    className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name
                        })} 
                    placeholder="Name" 
                    name="name" required 
                    value={this.state.name}
                    onChange={this.onChange}
                    />
                    {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                    )}
                    </div>
                    <div className="form-group">
                    <input type="email" 
                    className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                        })}  
                    placeholder="Email Address" 
                    name="email" 
                    value={this.state.email}
                    onChange={this.onChange}
                    />
                    {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                    )}
                    </div>
                    <div className="form-group">
                    <input type="username" 
                    className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.username
                        })}  
                    placeholder="Username" 
                    name="username" 
                    value={this.state.username}
                    onChange={this.onChange}
                    />
                    {errors.username && (
                        <div className="invalid-feedback">{errors.username}</div>
                    )}
                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                    </div>
                    <div className="form-group">
                    <input type="password" 
                    className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                        })}  
                    placeholder="Password" 
                    name="password" 
                    value={this.state.password}
                    onChange={this.onChange}
                    />
                    {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                    </div>
                    <div className="form-group">
                    <input type="password" 
                    className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password2
                        })} 
                    placeholder="Confirm Password" 
                    name="password2" 
                    value={this.state.password2}
                    onChange={this.onChange}
                    />
                    {errors.password2 && (
                        <div className="invalid-feedback">{errors.password2}</div>
                    )}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
                </div>
            </div>
            </div>
        </div>
    )
  }
}

SignUp.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
  
export default connect(mapStateToProps, { registerUser })(withRouter(SignUp));
  