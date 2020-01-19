import React, {Component} from "react";
import PostsFeed from "./PostsFeed";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import jwt_decode from "jwt-decode";
import PostDialog from "./PostDialog";


const useStyles = theme => ({
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
  addButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px"
  }
});

export const addPost = post => {
  axios.defaults.withCredentials = true;
  return axios
      .post('http://127.0.0.1:5000/user/addpost', post)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}

export const getPostsFeed = post => {
  const token = localStorage.usertoken;
  var decoded=0;
  if (token) {
    decoded = jwt_decode(token);
  }
  let user_id = decoded.identity.id;
  axios.defaults.withCredentials = true;
  return axios
      .get('http://127.0.0.1:5000/user/postfeed')
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}
// export default function HomePage() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//
//   const handleClose = (submit) => {
//     // const post = {
//     //   email: this.state.email,
//     //   password: this.state.password,
//     //   username: this.state.username,
//     //   bio: this.state.bio,
//     //   firstname: this.state.firstname,
//     //   lastname: this.state.lastname,
//     // }
//     // if (submit) {
//     //   // TODO: check for errors.
//     //   signup(post).then(res => {
//     //     if (res != 'error') {
//     //
//     //     }
//     //   })
//     // }
//     setOpen(false);
//     console.log(submit);
//   };
//   const [selectedDateStart, setSelectedDateStart] = React.useState(new Date('2014-08-18T21:11:54'));
//   const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date('2014-08-18T21:11:54'));
//
//   const handleDateChangeStart = date => {
//     setSelectedDateStart(date);
//   };
//   const handleDateChangeEnd = date => {
//     setSelectedDateEnd(date);
//   };
//
// }

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      add_post_open: false,
      // start_date: new Date('2014-08-18T21:11:54'),
      // end_date: new Date('2014-08-18T21:11:54'),
      // post_title: '',
      // post_content: '',
      posts_feed: [],
    };
    // console.log('asdasdsa')
    // this.onChange = this.onChange.bind(this)
    // this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    // TODO: Check errors.
    getPostsFeed().then(res => {
      if (res !== 'error') {
        console.log('POSTS:')
        console.log(res);
        this.setState({
          posts_feed: res
        })
      } else {

      }
    })
  }

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  //   e.preventDefault();
  //   // console.log('asdasdsa');
  // }

  // handleDateChangeStart = date => {
  //   this.setState({ start_date: date });
  //   // setSelectedDateStart(date);
  // };
  // handleDateChangeEnd = date => {
  //   this.setState({ end_date: date });
  //   // setSelectedDateEnd(date);
  // };

  handleClickOpen = () => {
    this.setState({ add_post_open: true });
  };

  handleClose = (submit, post) => {
    // const post = {
    //   title: this.state.post_title,
    //   start_date: this.state.start_date,
    //   end_date: this.state.end_date,
    //   latitude: '38.8976989',
    //   longitude: '-77.036553192281',
    //   content: this.state.post_content,
    // }
    console.log(post);
    if (submit) {
      // TODO: check for errors.
      addPost(post).then(res => {
        if (res !== 'error') {
          this.setState({
            posts_feed: [...this.state.posts_feed, post]
          })
        } else {

        }
      })
    }
    this.setState({ add_post_open: false });
  };

  render() {
    // console.log('asdasdsa');
    const { classes } = this.props;
    return (
        <Grid container className={classes.grid}>
          <Grid item sm={2} xs={12} />
          <Grid item sm={8} xs={12}>
            <div className={classes.addButton}>
              <Button variant="outlined" color="primary" onClick={this.handleClickOpen} >
                ADD POST
              </Button>
              <PostDialog
                open={this.state.add_post_open}
                handleClose={this.handleClose.bind(this)}
              />
            </div>
            <PostsFeed posts={this.state.posts_feed} />
          </Grid>
          <Grid item sm={2} xs={12} />
        </Grid>
    )
  }
}

export default withStyles(useStyles)(HomePage)