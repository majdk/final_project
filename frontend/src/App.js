import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './Component/Navbar'
import Landing from './Component/Landing'
import SignIn from './Component/Login'
import SignUp from './Component/Signup'

import {Redirect} from "react-router-dom";


function isLoggedIn() {
  if (localStorage.usertoken) {
    return true
  }
  return false
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" render={(props) => (
                !isLoggedIn() ? (
                    <Redirect to="/login"/>) : (<Landing {...props} />)
            )}/>
          <div className="container">
            <Route exact path="/register" render={(props) => (
                isLoggedIn() ? (
                    <Redirect to="/"/>) : (<SignUp {...props} />)
            )}/>
            <Route exact path="/login" render={(props) => (
                isLoggedIn() ? (
                    <Redirect to="/"/>) : (<SignIn {...props} />)
            )}/>
          </div>
        </div>
      </Router>
    )
  }
}


export default App;
