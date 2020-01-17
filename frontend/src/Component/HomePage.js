import React from "react";
import PostsFeed from "./PostsFeed";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


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
  }
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <Grid container className={classes.grid}>
      <Grid item sm={2} xs={12} />
      <Grid item sm={8} xs={12}>
        <PostsFeed />
      </Grid>
      <Grid item sm={2} xs={12} />
    </Grid>
  )
}