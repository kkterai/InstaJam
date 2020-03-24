import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';

import './index.css';

function App() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Footer />
        </div>
      </Router>
    );
  
}

export default App;
