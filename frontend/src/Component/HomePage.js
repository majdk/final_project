import React from "react";
import PostsFeed from "./PostsFeed";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
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
}));

export default function HomePage() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [selectedDateStart, setSelectedDateStart] = React.useState(new Date('2014-08-18T21:11:54'));
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChangeStart = date => {
    setSelectedDateStart(date);
  };
  const handleDateChangeEnd = date => {
    setSelectedDateEnd(date);
  };
  return (
    <Grid container className={classes.grid}>
      <Grid item sm={2} xs={12} />
      <Grid item sm={8} xs={12}>
        <div className={classes.addButton}>
          <Button variant="outlined" color="primary" onClick={handleClickOpen} >
            ADD POST
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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
                  fullWidth
              />
              <TextField
                  autoFocus
                  margin="dense"
                  id="desc"
                  label="Description"
                  type="email"
                  fullWidth
                  multiline
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Start date"
                    value={selectedDateStart}
                    onChange={handleDateChangeStart}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                />
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="End date"
                    value={selectedDateEnd}
                    onChange={handleDateChangeEnd}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                />
              </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                ADD
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <PostsFeed />
      </Grid>
      <Grid item sm={2} xs={12} />
    </Grid>
  )
}