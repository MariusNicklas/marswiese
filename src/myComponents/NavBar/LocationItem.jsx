import React from "react";
// @material-ui/icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  label: {
    // Aligns the content of the button vertically.
    flexDirection: "column",
  },
});

const useStyles = makeStyles(styles);

const LocationItem = (props) => {
  const classes = useStyles();
  return (
    <Link to="/anfahrt">
      <IconButton
        classes={{ label: classes.label }}
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
