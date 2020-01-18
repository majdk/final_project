import React from "react";
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

const useStyles = makeStyles(theme => ({
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
}));

/* <Avatar alt="Profile image" src="/static/images/paella.jpg" className={classes.avatar} />
<Typography variant="h6">
  majdk
</Typography>
<Typography variant="subtitle1">
  Majd Khalil
</Typography> */

let my_post = true;
let notification_on = false;

export default function Post(props) {
  const classes = useStyles();
  const curr_user = React.useContext(UserContext);
  const my_post = (curr_user === props.post.userid)
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
          title={props.post.title}
          subheader={dayjs(props.post.start_date).format("YYYY-MM-DD") + " - " + dayjs(props.post.end_date).format("YYYY-MM-DD")}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.post.content}
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
  );
  // return (
  //   <Card variant="outlined" className={classes.post}>
  //     <div className={classes.details1}>
  //       <Avatar
  //         alt="Remy Sharp"
  //         src="/static/images/paella.jpg"
  //         className={classes.avatar}
  //       />
  //       <Typography component="h5" variant="h5">
  //         John Wick
  //       </Typography>
  //       <Typography component="h6" variant="h6">
  //         John Wick
  //       </Typography>
  //       <Typography variant="subtitle1" color="textSecondary">
  //         Gender: Male
  //       </Typography>
  //       <Typography variant="subtitle1" color="textSecondary">
  //         Age: 24
  //       </Typography>
  //     </div>
  //     <div className={classes.div2}>

  //     </div>

  //     <div className={classes.details2}>
  //       <Typography>Test2</Typography>
  //     </div>
  //   </Card>
  // );
}
