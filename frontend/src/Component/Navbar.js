import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from "axios";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
});

class Navbar extends Component {
  state ={
    current_user: 0,
    username:'',
    search_msg:'Search for a user'
  }
 logOut(e) {
      e.preventDefault()
      axios.defaults.withCredentials = true;
      axios.get('http://127.0.0.1:5000/logout').then(response => {
          localStorage.removeItem('usertoken')
          this.props.history.push(`/`)
      })
        .catch(err => {
          console.log(err)
        })
  }
  render() {
    const { classes } = this.props;
    const loginRegLink = (
      <Toolbar className={classes.toolbar}>
      <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
        Traveler
      </Typography>
      </Toolbar>)
    const userLink = (
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Traveler
        </Typography>
        <Button onClick={this.logOut.bind(this)} color="inherit" className={classes.link}>
          Logout
        </Button>
      </Toolbar>
    )
    return (
      <AppBar position="static">
          {localStorage.usertoken ? userLink : loginRegLink}
    </AppBar>
    )   
  }
}

export default withRouter(withStyles(useStyles)(Navbar))

// export default function Navbar() {
//     const classes = useStyles();
//     const loginRegLink = (
//       <Toolbar className={classes.toolbar}>
//       <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
//         Traveler
//       </Typography>
//       </Toolbar>)
//     const userLink = (
//       <Toolbar className={classes.toolbar}>
//         <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
//           Traveler
//         </Typography>
//         <Button onClick={this.logOut.bind(this)} color="inherit" className={classes.link}>
//           Logout
//         </Button>
//       </Toolbar>
//     )
//     return (
//       <AppBar position="static">
//           {localStorage.usertoken ? userLink : loginRegLink}
//     </AppBar>
//     )   
// }