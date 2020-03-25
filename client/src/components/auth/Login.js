import React, { Component } from "react";
import {withRouter} from 'react-router-dom';

import axios from 'axios';
import classnames from "classnames";
import logo from '../../img/Instagram-text.png'
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
      errors: {}
    };

    axios
      .post("/api/users/login", user)
      .then(
        res => {
        
        //Save to localstorage
        const { token } = res.data;
        //set token to ls and local app state
        localStorage.setItem("jwtToken", token);
        this.props.setToken(token);

        //Set token to authheader
        setAuthToken(token);
        
        //Decode token to get the user data
        var decoded = jwt_decode(token);
        
        //TODO: implement Redux to manage global app state
        console.log(decoded);

        this.props.history.push('/home')
      })
      .catch(err => this.setState({errors: err.response.data}));
  }

  render() {
    const { errors } = this.state;
    
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <img className="signin-logo" src={logo} alt="Logo"></img>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
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
                  <input
                    type="password"
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (withRouter(Login));