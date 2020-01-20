import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import {Paper} from "@material-ui/core";
import Link from "react-router-dom/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: '50%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        marginLeft: "auto",
        marginRight: "auto",
    },
}));

export default function FollowList(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    // const empty_list = (props.list.length > 0);
    return (
        props.list.length > 0 &&
        <Paper className={classes.root}>
        <List dense>
            {props.list.map(value => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                    // <a href={"/profile/" + (props.following ? value.followed_id : value.follower_id)}>
                    <ListItem key={value} button component={Link} to={"/profile/" + (props.following ? value.followed_id : value.follower_id)}>
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar n°${value + 1}`}
                                src={"/static/images/" + (props.following ? value.followed_image : value.follower_image)}
                            />
                        </ListItemAvatar>
                        <ListItemText id={labelId}
                                      primary={props.following ? value.followed_username : value.follower_username}/>
                    </ListItem>
                    // </a>
                );
            })}
        </List>
    </Paper>
    );
}