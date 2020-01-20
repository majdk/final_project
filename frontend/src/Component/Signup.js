import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import SnackbarContent from "@material-ui/core/SnackbarContent";


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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    snackbar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.error.dark,
    },
});

export const signup = (user, file) => {
    axios.defaults.withCredentials = true;
    const data = new FormData();
    data.append('file', file);
    data.append('user', JSON.stringify(user))
    // data.append('filename', this.fileName.value);
    return axios({
        method: 'post',
        url: 'http://127.0.0.1:5000/user',
        data: data,
        headers: {'Content-Type': 'multipart/form-data' }
    })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
            return 'error'
        });
    // axios.defaults.withCredentials = true;
    // return axios
    //     .post('http://127.0.0.1:5000/user', user)
    //     .then(response => {
    //         return response.data
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         return 'error'
    //     })
}

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            username: '',
            bio: '',
            firstname: '',
            lastname: '',
            imageURL: '',
            errors: {
                email: '',
                password: '',
                username: '',
                bio: '',
                firstname: '',
                lastname: '',
            },
            invalid: 0

        };
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            errors: {
                ...this.state.errors, [e.target.name]: false
            }
        })
        e.preventDefault();
        // console.log('asdasdsa');
    }

    validateInput() {
        let not_valid = (this.state.username.length === 0 ||
                    this.state.firstname.length === 0 ||
                    this.state.lastname.length === 0  ||
                    this.state.email.length === 0     ||
                    this.state.password.length === 0    )
        this.setState({
           errors: {
               username: (this.state.username.length === 0),
               firstname: (this.state.firstname.length === 0),
               lastname: (this.state.lastname.length === 0),
               email: (this.state.email.length === 0),
               password: (this.state.password.length === 0),
           }
       })
        return !not_valid
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({invalid: 0});
        // localStorage.setItem('user', 'majd');
        const user = {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
            bio: this.state.bio,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
        }
        if (this.validateInput()) {
            signup(user, this.uploadInput.files[0]).then(res => {
                if (res !== 'error') {
                    this.props.history.push(`/login`)
                } else {
                    this.setState({invalid: 1});
                }
            })
        }
    }
// export default function SignIn() {
    render() {
        // console.log('asdasdsa');
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        Sign Up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {this.state.invalid >0 &&
                                <SnackbarContent
                                    className={classes.snackbar}
                                    message={'Used username or email'}/> }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="user_name"
                                    label="Username"
                                    name="username"
                                    autoComplete="user_name"
                                    onChange={this.onChange}
                                    autoFocus
                                    error={this.state.errors.username}
                                    size={"small"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={this.onChange}
                                    error={this.state.errors.firstname}
                                    size={"small"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastname"
                                    autoComplete="lname"
                                    onChange={this.onChange}
                                    error={this.state.errors.lastname}
                                    size={"small"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={this.onChange}
                                    error={this.state.errors.email}
                                    size={"small"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.onChange}
                                    error={this.state.errors.password}
                                    size={"small"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="outlined-textarea"
                                    label="Bio"
                                    multiline
                                    name="bio"
                                    variant="outlined"
                                    onChange={this.onChange}
                                    size="small"
                                    multiline
                                    rowsMax="3"
                                    rows="3"
                                    inputProps={{ maxLength: 150 }}
                                />
                            </Grid>
                            <div>
                                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                            </div>
                            {/*<div>*/}
                            {/*    <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />*/}
                            {/*</div>*/}
                            {/*<br />*/}
                            {/*<div>*/}
                            {/*    <button>Upload</button>*/}
                            {/*</div>*/}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.onSubmit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

export default withStyles(useStyles)(SignUp)