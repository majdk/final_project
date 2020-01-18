import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";


const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  snackbar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.dark,
  },
});

export const login = user => {
  axios.defaults.withCredentials = true;
  return axios
      .post('http://127.0.0.1:5000/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        localStorage.setItem('usertoken', response.data)
        return response.data
      })
      .catch(err => {
        console.log(err)
        return 'error'
      })
}

//export const login = user => {
//  // return 'error'
//  if (user.email == 'Majd' && user.password == '123') {
//    localStorage.setItem('usertoken', '123456789');
//    return 'pass'  
//  } 
//  return 'error'
//}

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: '',
      },
      invalid: 0

    };
    // console.log('asdasdsa')
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
    // console.log('asdasdsa');
  }


  onSubmit(e) {
    e.preventDefault();
    this.setState({invalid: 0});
    // localStorage.setItem('user', 'majd');
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    login(user).then(res => {
      if (res !== 'error') {
        this.props.history.push(`/`)
      }
      else {
        this.setState({invalid: 1});
        }
      })
  } 
// export default function SignIn() {
  render() {
    // console.log('asdasdsa');
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            {this.state.invalid >0 &&  
              <SnackbarContent
              className={classes.snackbar}
              message={'Invalid username or password'}/> }
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onChange} 
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChange} 
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    )
  }
}

export default withStyles(useStyles)(SignIn)