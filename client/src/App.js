import React, { useState }  from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Provider} from 'react-redux';

import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';

import './index.css';

// // - If not logged in, /home should redirect to /login
// // - If logged in, /login should redirect to /home
// // - When a user signs up, they should be logged in AND redirect to /home instead of having to sign up and then login

function App() {
  const existingToken = localStorage.getItem('jwtToken');
  const [token, setToken] = useState(existingToken);

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar token={token} setToken={setToken} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login">
                <Login setToken={setToken} />               
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
            <Footer token={token}/>
          </div>
        </Router>
      </Provider>
    );
  
}

export default App;