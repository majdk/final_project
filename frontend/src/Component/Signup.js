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
        // console.log('asdasdsa')
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleUploadImage(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        // data.append('filename', this.fileName.value);


        axios({
            method: 'post',
            url: 'myurl',
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
            });
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
            password: this.state.password,
            username: this.state.username,
            bio: this.state.bio,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
        }
        signup(user, this.uploadInput.files[0]).then(res => {
            if (res !== 'error') {
                this.props.history.push(`/login`)
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
                    <Typography component="h1" variant="h4">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
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
                                    autoFocus
                                    onChange={this.onChange}
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
                                />
                            </Grid>
                            <div>
                                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                            </div>
                            <img src={this.state.imageURL} alt="img" />
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