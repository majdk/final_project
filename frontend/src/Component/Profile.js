import React, {Component} from "react";
import PostsFeed from "./PostsFeed";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Avatar, Typography, Button } from "@material-ui/core";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import jwt_decode from "jwt-decode";
import axios from "axios";
import {getPostsFeed} from "./HomePage";
import FollowList from "./FollowList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
    {value === index && <Box p={3} bgcolor="#fafafa" boxShadow={0}>{children}</Box>}
    </Typography>
    
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

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
  },
  basicInfo: {
    width: "90%",
    display: "flex",
    marginTop: "20px",
    marginBottom: "10px",
    marginLeft: "5px"
  },
  avatar: {
    width: "100px",
    height: "100px",
    marginRight: "50px",
    marginLeft: "20px",
    [theme.breakpoints.up("md")]: {
      width: "152px",
      height: "152px",
    }
  },
  info: {
    minWidth: "70%",
  },
  followers: {
    display: "flex",
    flexWrap: "wrap",
  },
  followButton: {
    padding: "20px"
  },
  userName: {
    marginBottom: "20px",
    marginTop: "5px",
    flexGrow: 1,
  },
  tabsBar: {
    backgroundColor: "#fafafa"
  },
  // tabs: {
  //   alignCenter: "true",
  // },
  follow_line: {
    display: "flex",
  },
  follow_btn: {
    height: "fit-content",
    marginRight: "10px",
    marginTop: "10px",
  }
});
// const token = localStorage.usertoken;
// var decoded=0;
// if (token) {
//   decoded = jwt_decode(token);
// }
export const getPosts = user_id => {
  axios.defaults.withCredentials = true;
  return axios
      .get('http://127.0.0.1:5000/user/posts/' + user_id)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}

export const getUserInfo = user_id => {
  axios.defaults.withCredentials = true;
  return axios
      .get('http://127.0.0.1:5000/user/' + user_id)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}

export const followUser = user_id => {
  axios.defaults.withCredentials = true;
  return axios
      .post('http://127.0.0.1:5000/user/follow/' + user_id)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}

export const unfollowUser = user_id => {
  axios.defaults.withCredentials = true;
  return axios
      .delete('http://127.0.0.1:5000/user/follow/' + user_id)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}


export const getFollowers = user_id => {
  axios.defaults.withCredentials = true;
  return axios
      .get('http://127.0.0.1:5000/user/followers/' + user_id)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}

export const getFollowing = user_id => {
  axios.defaults.withCredentials = true;
  return axios
      .get('http://127.0.0.1:5000/user/following/' + user_id)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      tab_index: 0,
      posts: [],
      user_info: {
        username: '',
        first_name: '',
        last_name: '',
        bio: '',
        followers: 0,
        following: 0,
      },
      my_profile: true,
      is_followed: false,
      followers: [],
      following: [],
      user_info_ready: false,
    }
    // console.log('Constructor');
    this.onFollow = this.onFollow.bind(this)
  }

  handleChange = (event, newValue) => {
    this.setState({tab_index: newValue});
  }

  onFollow() {
    let user_id = this.props.match.params.id;
    if (!this.state.is_followed) {
      followUser(user_id).then(res => {
        if (res !== 'error') {
          this.setState({
            is_followed: true
          })
          // console.log(res);
        } else {

        }
      })
    } else {
      unfollowUser(user_id).then(res => {
        if (res !== 'error') {
          this.setState({
            is_followed: false
          })
          // console.log(res);
        } else {

        }
      })
    }
  }

  componentDidMount() {
    let user_id = this.props.match.params.id;
    const token = localStorage.usertoken;
    var decoded=0;
    if (token) {
      decoded = jwt_decode(token);
    }
    let curr_user = decoded.identity.id;
    if (!user_id)
      user_id = curr_user;
    // console.log(user_id, curr_user)
    this.setState({my_profile: (curr_user == user_id)})
    getUserInfo(user_id).then(res => {
      if (res !== 'error') {
        this.setState({
          user_info: res,
          is_followed: res.isfollowing,
          user_info_ready: true,
        })
        console.log(res)
        // console.log(res);
      } else {
        this.props.history.push('/err')
      }
    })
    getPosts(user_id).then(res => {
      if (res !== 'error') {
        // console.log('My posts:')
        // console.log(res)
        this.setState({
          posts: res
        })
      } else {

      }
    });
    getFollowers(user_id).then(res => {
      if (res !== 'error') {
        console.log('My followers:')
        console.log(res)
        this.setState({
          followers: res
        })
      } else {

      }
    });
    getFollowing(user_id).then(res => {
      if (res !== 'error') {
        console.log('My following:')
        console.log(res)
        this.setState({
          following: res
        })
      } else {

      }
    });

  }

  render() {
    const { classes } = this.props;
    return (
        <Grid container className={classes.grid}>
          <Grid item sm={2} xs={12} />
          <Grid item sm={8} xs={12}>
            <div className={classes.basicInfo}>
              <Avatar className={classes.avatar} src={"/static/images/" + this.state.user_info.image} />
              <div className={classes.info}>
                <div className={classes.follow_line}>
                  <Typography variant="h4" className={classes.userName}>{this.state.user_info.username}</Typography>
                  {!this.state.my_profile && this.state.user_info_ready &&
                  (<Button
                      className={classes.follow_btn}
                      variant="contained"
                      color={this.state.is_followed ? "default" : "primary"}
                      onClick={this.onFollow}
                  >
                        {this.state.is_followed ? "Unfollow" : "Follow"}
                  </Button>)
                  }

                </div>
                <Typography variant="subtitle2">{this.state.user_info.first_name + " " + this.state.user_info.last_name}</Typography>
                <Typography variant="body2"> {this.state.user_info.bio} </Typography>
                <div className={classes.followers}>

                  <Typography variant="subtitle2" className={classes.followButton}>{this.state.user_info.followers} followers</Typography>
                  <Typography variant="subtitle2" className={classes.followButton}>{this.state.user_info.followed} following</Typography>
                </div>
              </div>

            </div>
            {(this.state.is_followed || this.state.my_profile) &&
            (<AppBar position="static" color="default" elevation="0" className={classes.tabsBar}>
              <Tabs
                  value={this.state.tab_index}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                  className={classes.tabs}
              >
                <Tab label="Posts" {...a11yProps(0)} />
                <Tab label="Followers" {...a11yProps(1)} />
                <Tab label="Following" {...a11yProps(2)} />
                {/*<Tab label="Info" {...a11yProps(3)} />*/}
              </Tabs>
              <TabPanel value={this.state.tab_index} index={0}>
                <PostsFeed posts={this.state.posts}/>
              </TabPanel>
              <TabPanel value={this.state.tab_index} index={1}>
               <FollowList list={this.state.followers} following={false} />
              </TabPanel>
              <TabPanel value={this.state.tab_index} index={2}>
                <FollowList list={this.state.following} following={true}/>
              </TabPanel>
            </AppBar>)
            }

          </Grid>
          <Grid item sm={2} xs={12} />
        </Grid>
    )
  }
}

export default withStyles(styles)(Profile)