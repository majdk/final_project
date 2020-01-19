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

class Post extends Component {
  constructor() {
    super()
    // console.log('Constructor');
  }
  componentDidMount() {
    // console.log(this.props)
    // console.log('Mounting');
  }

  static contextType = UserContext

  render() {
    // const context = React.useContext(UserContext);
    const my_post = (this.context.name === this.props.post.userid)
    const { classes } = this.props;
    return (
        <div className={classes.post_wrapper}>
          <MyCardHeader
              className={classes.user_details}
              avatar={
                <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    src="/static/images/zidane.jpg"
                >
                  R
                </Avatar>
              }
              title="majdk"
              subheader="Majd Khalil"
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
                title={this.props.post.title}
                subheader={dayjs(this.props.post.start_date).format("YYYY-MM-DD") + " - " + dayjs(this.props.post.end_date).format("YYYY-MM-DD")}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.post.content}
              </Typography>
            </CardContent>
            {my_post && (
                <CardActions disableSpacing>
                  <IconButton aria-label="edit post">
                    <EditIcon />
                  </IconButton>
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

