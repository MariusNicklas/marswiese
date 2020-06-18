import React from "react";
// @material-ui/icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const LocationItem = (props) => {
  const classes = useStyles();
  return (
    <Link to="/anfahrt">
      <IconButton
        className={classes.navLink}
        edge="start"
        aria-controls="menu-appbar"
        aria-label="loction-navbar-item"
        onClick={() => props.history.push("/anfahrt")}
        style={{ fontSize: "12px", color: "white" }}
      >
        <LocationOnIcon />
        Anfahrt
      </IconButton>
    </Link>
  );
};

export default withRouter(LocationItem);
