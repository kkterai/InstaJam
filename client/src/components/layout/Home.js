import React, { Component } from "react";
import {withRouter, Redirect} from 'react-router-dom';
import isEmpty from '../../validation/is-empty'

class Home extends Component {
  
  render() {
    return (
      !isEmpty(localStorage.jwtToken) ?
      (<div className="home">
          <div className="container">
            <div className="stories">
              Followed profile icons - clickthrough to stories
            </div>
            <div className="friend-posts">
              Feed of friends' Posts
            </div>
          </div>
        </div>
      ) : <Redirect to="/login" />
    );
  }
}

export default (withRouter(Home));
  