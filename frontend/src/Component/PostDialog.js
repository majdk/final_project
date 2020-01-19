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
import SimpleDialogDemo from "./Test";
import jwt_decode from "jwt-decode";
import ReactLeafletSearch from "react-leaflet-search";
// import {
//     SimpleButton,
//     MapComponent,
//     NominatimSearch
// } from '@terrestris/react-geo';

// const useStyles = theme => ({
//     root: {
//         display: "flex"
//     },
//     content: {
//         display: "flex"
//     },
//     content1: {
//         flexGrow: 1,
//         padding: theme.spacing(3)
//     },
//     grid: {
//         marginTop: 80
//     },
//     addButton: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         marginBottom: "10px"
//     }
// });

// export const addPost = post => {
//     axios.defaults.withCredentials = true;
//     return axios
//         .post('http://127.0.0.1:5000/user/addpost', post)
//         .then(response => {
//             return response.data
//         })
//         .catch(err => {
//             console.log(err)
//             return 'error'
//         })
// }



class PostDialog extends Component {
    constructor() {
        super()
        this.state = {
            start_date: new Date('2014-08-18T21:11:54'),
            end_date: new Date('2014-08-18T21:11:54'),
            post_title: '',
            post_content: '',
            long: '',
            lat: '',
        }

        // console.log('asdasdsa')
        this.onChange = this.onChange.bind(this)
        this.updateLocation = this.updateLocation.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.post) {
            console.log('In post dialog')
            console.log(this.props.post.longitude)
            console.log(this.props.post.latitude)
            this.setState( {
                start_date: new Date(this.props.post.start_date),
                end_date: new Date(this.props.post.end_date),
                post_title: this.props.post.title,
                post_content: this.props.post.content,
                long: this.props.post.longitude,
                lat: this.props.post.latitude,
            })
        }
    }

    createPost() {
        const post = {
          title: this.state.post_title,
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          latitude: this.state.lat,
          longitude: this.state.long,
          content: this.state.post_content,
        }
        return post
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        e.preventDefault();
        // console.log('asdasdsa');
    }

    handleDateChangeStart = date => {
        this.setState({ start_date: date });
        // setSelectedDateStart(date);
    };
    handleDateChangeEnd = date => {
        this.setState({ end_date: date });
        // setSelectedDateEnd(date);
    };
    updateLocation(lat, long) {
        this.setState({
            lat: lat,
            long: long,
        })
    };
    render() {
        // console.log('asdasdsa');
        const { classes } = this.props;
        return (
            <Dialog open={this.props.open} onClose={() => {this.props.handleClose(false)}} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{this.props.edit ? "Edit post" : "Add a Post"}</DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/}
                    {/*  To subscribe to this website, please enter your email address here. We will send updates*/}
                    {/*  occasionally.*/}
                    {/*</DialogContentText>*/}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="email"
                        name="post_title"
                        fullWidth
                        onChange={this.onChange}
                        value={this.state.post_title}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="desc"
                        label="Description"
                        type="email"
                        name="post_content"
                        fullWidth
                        multiline
                        onChange={this.onChange}
                        value={this.state.post_content}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Start date"
                            value={this.state.start_date}
                            onChange={this.handleDateChangeStart}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            // value={this.state.start_date}
                        />
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="End date"
                            value={this.state.end_date}
                            onChange={this.handleDateChangeEnd}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            // value={this.state.end_date}
                        />
                    </MuiPickersUtilsProvider>
                    <SimpleDialogDemo latlng={[this.state.lat, this.state.long]} updateLocation={this.updateLocation}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.handleClose(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.handleClose(true, this.createPost())} color="primary">
                        {this.props.edit ? "EDIT" : "ADD"}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default (PostDialog)