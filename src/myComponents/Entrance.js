import React from "react";

import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import entranceStyles from "../entranceStyles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.marswiese.at/">
        Marswiese.at
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Entrance = props => {
  const { component: Component } = props;
  const classes = entranceStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img
            className={classes.marsLogo}
            src="./marslogo.png"
            alt="Marswiese"
          />
          <Component />
        </div>
        <Copyright />;
      </Grid>
    </Grid>
  );
};
export default Entrance;
