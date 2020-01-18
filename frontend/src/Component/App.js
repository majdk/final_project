import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PrimarySearchAppBar from './NavBar'
import SignIn from './Login'
import SignUp from './Signup'
import SimpleExample from "./DiscoverMap";
import Profile from "./Profile";
import HomePage from "./HomePage";
// import { Switch } from "react-router-dom";

import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import { UserContext } from "./UserContext"

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
  constructor() {
    super();
    this.state = {
      signed_in_user: '',
    }
  }
  componentDidMount() {
    const token = localStorage.usertoken;
    var decoded=0;
    if (token) {
      decoded = jwt_decode(token);
      let curr_user = decoded.identity.id;
      this.setState({signed_in_user: curr_user});
    }

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <UserContext.Provider value={this.state.signed_in_user}>
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
                <Route exact path="/profile/:id" render={(props) => (
                    !isLoggedIn() ? (
                        <Redirect to="/login"/>) : (<Profile {...props} />)
                )}/>
          </Router>
        </UserContext.Provider>
      </div>
    )
  }
}


export default withStyles(styles)(App);
