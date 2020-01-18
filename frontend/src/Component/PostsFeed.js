import React, {Component} from "react";
import { withStyles} from "@material-ui/core/styles";
import Post from "./Post";


const styles = theme => ({
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
});

class PostsFeed extends Component {
  constructor() {
    super()
    console.log('Constructor');
  }
  componentDidMount() {
    console.log('Mounting');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      {this.props.posts.map((post) =>
          <Post post={post} key={post.title} />
      )}
        {/*<Post />*/}
        {/*<Post />*/}
        {/*<Post />*/}
        {/*<Post />*/}
        {/*<Post />*/}
        {/*<Post />*/}
        {/*<Post />*/}
        {/*<Post />*/}
      </div>
    )
  }
}

export default withStyles(styles)(PostsFeed)
