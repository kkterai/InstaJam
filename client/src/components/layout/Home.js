import React, { Component } from "react";

class Home extends Component {
  
  render() {
    return (
      <div className="home">
        <div className="container">
          <div className="stories">
            Followed profile icons - clickthrough to stories
          </div>
          <div className="friend-posts">
            Feed of friends' Posts
          </div>
        </div>
      </div>
    );
  }
}

export default Home;