import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PrimarySearchAppBar from './NavBar'
import SignIn from './Login'
import SignUp from './Signup'
import SimpleExample from "./DiscoverMap";
import Profile from "./Profile";
import HomePage from "./HomePage";
import { Switch } from "react-router-dom";

import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    display: "flex"
  },
  content1: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  grid: {
    marginTop: 80
  }
});

function isLoggedIn() {
  if (localStorage.usertoken) {
    return true
  }
  return false
}

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router>
            <PrimarySearchAppBar />
            <Route exact path="/" render={(props) => (
                  !isLoggedIn() ? (
                      <Redirect to="/login"/>) : (<HomePage {...props} />)
              )}/>
              <Route exact path="/register" render={(props) => (
                  isLoggedIn() ? (
                      <Redirect to="/"/>) : (<SignUp {...props} />)
              )}/>
              <Route exact path="/login" render={(props) => (
                  isLoggedIn() ? (
                      <Redirect to="/"/>) : (<SignIn {...props} />)
              )}/>
              <Route exact path="/discover" render={(props) => (
                  !isLoggedIn() ? (
                      <Redirect to="/login"/>) : (<SimpleExample {...props} />)
              )}/>
              <Route exact path="/profile" render={(props) => (
                  !isLoggedIn() ? (
                      <Redirect to="/login"/>) : (<Profile {...props} />)
              )}/>
        </Router>
      </div>
    )
  }
}


export default withStyles(styles)(App);
