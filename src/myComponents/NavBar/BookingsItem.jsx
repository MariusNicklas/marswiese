import React from "react";
// @material-ui/icons
import TodayIcon from "@material-ui/icons/Today";
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

const BookingsItem = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Link to="/meine-buchungen">
        <IconButton
          classes={{ root: classes.button, label: classes.label }}
          edge="start"
          aria-controls="menu-appbar"
          aria-label="loction-navbar-item"
          onClick={() => props.history.push("/meine-buchungen")}
          style={{ fontSize: "12px", color: "white" }}
        >
          <TodayIcon />
          Buchungen
        </IconButton>
      </Link>
    </React.Fragment>
  );
};

export default withRouter(BookingsItem);
