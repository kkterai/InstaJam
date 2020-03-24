import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from './components/layout/Navbar';
import SignUp from './components/auth/SignUp.js';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/signup" component={SignUp} />
      </div>
    </Router>
  );
}

export default App;
