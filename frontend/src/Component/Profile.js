import React from "react";
import PostsFeed from "./PostsFeed";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Avatar, Typography } from "@material-ui/core";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
    {value === index && <Box p={3} bgcolor="#fafafa" boxShadow={0}>{children}</Box>}
    </Typography>
    
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

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
  basicInfo: {
    width: "90%",
    display: "flex",
    marginTop: "20px",
    marginBottom: "10px",
    marginLeft: "5px"
  },
  avatar: {
    width: "100px",
    height: "100px",
    marginRight: "50px",
    marginLeft: "20px",
    [theme.breakpoints.up("md")]: {
      width: "152px",
      height: "152px",
    }
  },
  info: {

  },
  followers: {
    display: "flex",
    flexWrap: "wrap",
  },
  followButton: {
    padding: "20px"
  },
  userName: {
    marginBottom: "20px",
    marginTop: "5px"
  },
  tabsBar: {
    backgroundColor: "#fafafa"
  }
}));


export default function Profile() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container className={classes.grid}>
      <Grid item sm={2} xs={12} />
      <Grid item sm={8} xs={12}>
        <div className={classes.basicInfo}>
          <Avatar className={classes.avatar} src="/static/images/zidane.jpg" />
          <div className={classes.info}>
            <Typography variant="h4" className={classes.userName}>majdk</Typography>
            <Typography variant="subtitle2">Majd Khalil</Typography>
            <Typography variant="body2">This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like. </Typography>
            <div className={classes.followers}>

              <Typography variant="subtitle2" className={classes.followButton}>125 followers</Typography>
              <Typography variant="subtitle2" className={classes.followButton}>125 following</Typography>
            </div>
          </div>
        </div>
        <AppBar position="static" color="default" elevation="0" className={classes.tabsBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
         className={classes.tabs}
        >
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Followers" {...a11yProps(1)} />
          <Tab label="Following" {...a11yProps(2)} />
          <Tab label="Info" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <PostsFeed />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        </AppBar>
        
      </Grid>
      <Grid item sm={2} xs={12} />
    </Grid>
  );
}
