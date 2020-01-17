import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles2 = makeStyles(theme => ({
  card: {
    display: "flex",
    width: "100%"
  },
  details: {
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  details2: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

export default function TravelPost() {
  const classes2 = useStyles2();

  return (
    <Card className={classes2.card} variant="outlined">
      <div className={classes2.details2}>
        <Avatar
          alt="Remy Sharp"
          src="/static/images/paella.jpg"
          className={classes2.avatar}
        />
        <Typography component="h5" variant="h5">
          John Wick
        </Typography>
        <Typography component="h6" variant="h6">
          John Wick
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Gender: Male
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Age: 24
        </Typography>
      </div>
      <Divider orientation="vertical" />
      <div className={classes2.details}>
        <CardContent className={classes2.content}>
          <Typography component="h5" variant="h5">
            A trip to Italy
          </Typography>

          <Typography variant="subtitle1" color="textSecondary">
            April, 1, 2020 - April, 7, 2020
          </Typography>
          <Typography variant="body2" gutterBottom>
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
