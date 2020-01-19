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


let notification_on = false;

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
      }
    }
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
    // const post = {
    //   title: this.state.post_title,
    //   start_date: this.state.start_date,
    //   end_date: this.state.end_date,
    //   latitude: '38.8976989',
    //   longitude: '-77.036553192281',
    //   content: this.state.post_content,
    // }
    // console.log(post);
    console.log(post)
    if (submit) {
    //   // TODO: check for errors.
      editPost(this.props.post.id, post).then(res => {
        console.log(post)
        if (res !== 'error') {
          this.setState({
            post: post,
          })
          // this.setState({
          //   posts_feed: [...this.state.posts_feed, post]
          // })
        } else {

        }
      })
    }
    this.setState({ edit_post_open: false });
  };

  handleClickEdit = () => {
    this.setState({ edit_post_open: true });
  };

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
                    R
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
                        <IconButton size="small" aria-label="settings">
                          {notification_on ? (
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
                  <IconButton aria-label="delete post">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
            )}
          </Card>
        </div>
    )
  }
}

export default withStyles(styles)(Post)

