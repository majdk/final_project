import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Post from "./Post";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    // alignItems: "center",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    // width: "75%",
    // marginLeft: 100,
    // marginRight: 100,
    marginBottom: 50
  }
}));

export default function PostsFeed() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
