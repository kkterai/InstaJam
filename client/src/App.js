import React, { useState }  from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import {Provider} from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import EditProfile from './components/edit-profile/EditProfile';

import './index.css';
import PrivateRoute from './components/common/PrivateRoute';


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

function App() {
  const existingToken = localStorage.getItem('jwtToken');
  const [token, setToken] = useState(existingToken);

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar token={token} setToken={setToken} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:username" component={Profile} />
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/home" component={Home}/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            <Footer token={token}/>
          </div>
        </Router>
      </Provider>
    );
  
}

export default App;