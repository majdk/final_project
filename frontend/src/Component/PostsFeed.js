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
    this.state = {
      posts: [],
    }
    this.deleteFunc = this.deleteFunc.bind(this);
    // console.log('Constructor');
  }
  componentDidMount() {
    this.setState({
      posts: this.props.posts,
    })
    console.log('PROPS:')
    console.log(this.props)
    // console.log('Mounting');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.posts !== this.props.posts) {
      this.setState({
        posts: this.props.posts,
      })
    }
    // console.log('PROPS:')
    // console.log(this.props)
    // console.log('Mounting');
  }

  deleteFunc(post_id) {
    this.setState(prevState => ({
      posts: prevState.posts.filter(post => post.id != post_id)
    }));
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.posts)
    return (
      <div className={classes.root}>
      {this.state.posts.slice(0).reverse().map((post) =>
          <Post post={post} key={post.id} deleteFunc={this.deleteFunc} />
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
