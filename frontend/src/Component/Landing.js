import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import jwt_decode from "jwt-decode";
import axios from "axios";

const useStyles = theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
});


class Landing extends Component {
  state={
      username: '',
      email: '',
      image_file: '',
      postsFlag: 1,
      aboutFlag:0,
      followingFlag:0,
      followersFlag:0,
      isFollowing: false,
      isFollowingMe: false,
      current_user:0,
      followers_amount:0,
      followed_amount:0
  }

  componentDidMount() {
        const token = localStorage.usertoken;
        console.log("before decode");
        var decoded=0;
        if (token) {
            decoded = jwt_decode(token);
        }
        // console.log(decoded.identity.id);
        axios.defaults.withCredentials = true;
        // console.log('http://127.0.0.1:5000/users/' + decoded.identity.id);
        axios.get('http://127.0.0.1:5000/users/' + decoded.identity.id).then((response) => {
                console.log(response.data);
                this.setState({
                   username: response.data.username,
                })
            }).catch(err => {
                console.log('aaaa')
                console.log(err)
            });

  }

  render() {
    console.log(this.state);
    const { classes } = this.props;
    return (
      <Container maxWidth="sm" className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome {this.state.username}
            </Typography>
      </Container>
    )
  }
}

export default withStyles(useStyles)(Landing)