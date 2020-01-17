import React from "react";
import { fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Link from "react-router-dom/Link";
import axios from "axios";
import { withRouter } from 'react-router-dom';

// const useStyles = makeStyles(theme => ({
//   grow: {
//     flexGrow: 1
//   },
//   menuButton: {
//     marginRight: theme.spacing(2)
//   },
//   title: {
//     display: "none",
//     [theme.breakpoints.up("sm")]: {
//       display: "block"
//     }
//   },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: fade(theme.palette.common.white, 0.25)
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(3),
//       width: "auto"
//     }
//   },
//   searchIcon: {
//     width: theme.spacing(7),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   inputRoot: {
//     color: "inherit"
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 7),
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: 200
//     }
//   },
//   sectionDesktop: {
//     display: "none",
//     [theme.breakpoints.up("md")]: {
//       display: "flex"
//     }
//   },
//   sectionMobile: {
//     display: "flex",
//     [theme.breakpoints.up("md")]: {
//       display: "none"
//     }
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1
//   },
//   dropdown: {
//     margin: theme.spacing(1),
//     width: theme.spacing(40),
//     height: theme.spacing(60),
//     position: "absolute",
//     top: "45px",
//     right: "60px"
//   },
//   toolbar: theme.mixins.toolbar
// }));

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    "& a": {
      color: "inherit",
      textDecoration: "inherit"
    }
  },
  dropdown: {
    margin: theme.spacing(1),
    width: theme.spacing(40),
    height: theme.spacing(60),
    position: "absolute",
    top: "45px",
    right: "60px"
  },
  toolbar: theme.mixins.toolbar
});

class PrimarySearchAppBar extends React.Component {
  constructor() {
    super();
    this.state = {
      show_notifications: false
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  logOut(e) {
    e.preventDefault()
    axios.defaults.withCredentials = true;
    axios.get('http://127.0.0.1:5000/logout').then(response => {
      localStorage.removeItem('usertoken')
      this.props.history.push(`/`)
    })
        .catch(err => {
          console.log(err)
        })
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.state.show_notifications
    ) {
      this.setState({ show_notifications: false });
    }
  }
  render() {
    const { classes } = this.props;
    // const classes = useStyles();
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    // // const isMenuOpen = Boolean(anchorEl);
    // // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // const handleProfileMenuOpen = event => {
    //   setAnchorEl(event.currentTarget);
    // };
    const showNotifications = event => {
      this.setState({ show_notifications: !this.state.show_notifications });
    };
    return (
      <div className={classes.grow}>
        <AppBar position="fixed" elevation={0} className={classes.appBar}>
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              component={Link}
              to="/"
            >
              Material-UI
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit" component={Link} to="/">
                <HomeIcon />
              </IconButton>
              <Button
                color="inherit"
                component={Link}
                to="/discover"
                startIcon={<ExploreIcon />}
              >
                Discover
              </Button>
              <div ref={this.setWrapperRef}>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={showNotifications}
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                {this.state.show_notifications ? (
                  <Paper
                    className={classes.dropdown}
                    id="notifications-dropdown"
                  />
                ) : null}
              </div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
                component={Link}
                to="/profile"
              >
                <AccountCircle />
              </IconButton>
              <Button onClick={this.logOut.bind(this)} color="inherit" className={classes.link}>
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(PrimarySearchAppBar));
// export default function PrimarySearchAppBar() {
//   const classes = useStyles();

//   const showNotifications = event => {};
//   return (
//     <div className={classes.grow}>
//       <AppBar position="fixed" elevation="0" className={classes.appBar}>
//         <Toolbar>
//           <Typography className={classes.title} variant="h6" noWrap>
//             Material-UI
//           </Typography>
//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput
//               }}
//               inputProps={{ "aria-label": "search" }}
//             />
//           </div>
//           <div className={classes.grow} />
//           <div className={classes.sectionDesktop}>
//             <IconButton color="inherit">
//               <HomeIcon />
//             </IconButton>
//             <Button color="inherit" startIcon={<ExploreIcon />}>
//               Discover
//             </Button>
//             <div>
//               <IconButton
//                 aria-label="show 17 new notifications"
//                 color="inherit"
//                 onClick={showNotifications}
//               >
//                 <Badge badgeContent={17} color="secondary">
//                   <NotificationsIcon />
//                 </Badge>
//               </IconButton>
//               <Paper className={classes.dropdown} id="notifications-dropdown" />
//             </div>
//             <IconButton
//               edge="end"
//               aria-label="account of current user"
//               aria-haspopup="true"
//               color="inherit"
//             >
//               <AccountCircle />
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
