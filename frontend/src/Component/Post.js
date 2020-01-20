import React, {Component} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import CardActions from "@material-ui/core/CardActions";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import DeleteIcon from "@material-ui/icons/Delete";
import dayjs from 'dayjs'
import { UserContext } from "./UserContext"
import PostDialog from "./PostDialog";
import {addPost} from "./HomePage";
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const MyCardHeader = withStyles({
  avatar: {
    marginRight: 0,
    marginBottom: 10
  }
})(CardHeader);

const styles = theme => ({
  post: {
    marginLeft: theme.spacing(2),
    width: "100%",

    maxWidth: 900,
    overflow: "hidden"
  },
  post_wrapper: {
    margin: theme.spacing(1),
    display: "flex"
  },
  details1: {
    float: "left",
    minWidth: 250,
    alignItems: "center",
    flexDirection: "column"
  },
  details2: {
    float: "right"
  },
  avatar: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: theme.palette.primary.light
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  div2: {},
  user_details: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    width: 100
  }
});


// let notification_on = true;

export const editPost = (id, newPost) => {
  axios.defaults.withCredentials = true;
  return axios
      .put('http://127.0.0.1:5000/user/post/' + id, newPost)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}

export const deletePost = (id) => {
  axios.defaults.withCredentials = true;
  return axios
      .delete('http://127.0.0.1:5000/user/post/' + id)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}

export const subPost = (id) => {
  axios.defaults.withCredentials = true;
  return axios
      .post('http://127.0.0.1:5000/user/subscribe/' + id)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}

export const unsubPost = (id) => {
  axios.defaults.withCredentials = true;
  return axios
      .delete('http://127.0.0.1:5000/user/subscribe/' + id)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}

class Post extends Component {
  constructor() {
    super()
    this.state = {
      edit_post_open: false,
      post: {
        title: '',
        start_date: new Date(),
        end_date: new Date(),
        content: '',
        isSub: false,
      },
      delete_post_open: false,
    }
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleCloseDeletePost = this.handleCloseDeletePost.bind(this);
    this.handleSub = this.handleSub.bind(this);

    // console.log('Constructor');
  }
  componentDidMount() {
    this.setState({
      post: this.props.post,
    })
    // console.log(this.props)
    // console.log('Mounting');
  }

  static contextType = UserContext

  handleClose = (submit, post) => {
    // console.log(post)
    if (submit) {
    //   // TODO: check for errors.
      editPost(this.props.post.id, post).then(res => {
        // console.log(post)
        if (res !== 'error') {
          this.setState({
            post: post,
          })
        } else {

        }
      })
    }
    this.setState({ edit_post_open: false });
  };

  handleClickEdit = () => {
    this.setState({ edit_post_open: true });
  };

  handleClickDelete = () => {
    // console.log('Deleting '+ this.props.post.id)
    this.setState({
      delete_post_open: true,
    })
    // this.props.deleteFunc(this.props.post.id)
  }

  handleSub = () => {
    if (this.state.post.isSub) {
      unsubPost(this.props.post.id).then(res => {
        if (res !== 'error') {
          this.setState({
            post: {...this.state.post, isSub: !this.state.post.isSub}
          })
        }
      })
    } else {
      subPost(this.props.post.id).then(res => {
        if (res !== 'error') {
          this.setState({
            post: {...this.state.post, isSub: !this.state.post.isSub}
          })
        }
      })
    }
  }

  handleCloseDeletePost = (confirm) => {
    if (confirm) {
      deletePost(this.props.post.id).then(res => {
        // console.log(post)
        if (res !== 'error') {
          this.props.deleteFunc(this.props.post.id)
        } else {

        }
      })
      //
    }
    this.setState({
      delete_post_open: false,
    })
  }

  render() {
    // const context = React.useContext(UserContext);
    const my_post = (this.context.name === this.props.post.userid)
    const { classes } = this.props;
    return (
        <div className={classes.post_wrapper}>
          <MyCardHeader
              className={classes.user_details}
              avatar={
                <a href={"/profile/" + this.props.post.userid}>
                  <Avatar
                      aria-label="recipe"
                      className={classes.avatar}
                      src={"/static/images/" + this.props.post.profile_pic}
                  >

                  </Avatar>
                </a>
              }
              title={this.props.post.username}
          />
          <Card variant="outlined" className={classes.post}>
            <CardHeader
                action={
                  <div>
                    {!my_post && (
                        <IconButton size="small" aria-label="settings" onClick={this.handleSub}>
                          {!this.state.post.isSub ? (
                              <NotificationsActiveIcon />
                          ) : (
                              <NotificationsOffIcon />
                          )}
                        </IconButton>
                    )}
                  </div>
                }
                title={this.state.post.title}
                subheader={dayjs(this.state.post.start_date).format("YYYY-MM-DD") + " - " + dayjs(this.state.post.end_date).format("YYYY-MM-DD")}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.state.post.content}
              </Typography>
            </CardContent>
            {my_post && (
                <CardActions disableSpacing>
                  <IconButton aria-label="edit post" onClick={this.handleClickEdit}>
                    <EditIcon />
                  </IconButton>
                  <PostDialog
                      edit={true}
                      post={this.props.post}
                      open={this.state.edit_post_open}
                      handleClose={this.handleClose.bind(this)}
                  />
                  <IconButton aria-label="delete post" onClick={this.handleClickDelete}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
            )}
            <Dialog
                open={this.state.delete_post_open}
                onClose={() => this.handleCloseDeletePost(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete the post?"}</DialogTitle>
              <DialogActions>
                <Button onClick={() => this.handleCloseDeletePost(false)} color="primary">
                  No
                </Button>
                <Button onClick={() => this.handleCloseDeletePost(true)} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </div>
    )
  }
}

export default withStyles(styles)(Post)

