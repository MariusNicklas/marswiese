import React from "react";
// @material-ui/icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
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
    <Link to="/mein-warenkorb">
      <IconButton
        className={classes.navLink}
        edge="start"
        aria-controls="menu-appbar"
        aria-label="cart-navbar-item"
        onClick={() => props.history.push("/mein-warenkorb")}
        style={{ fontSize: "12px", color: "white" }}
      >
        <ShoppingCartIcon />
        Warenkorb
      </IconButton>
    </Link>
  );
};

export default withRouter(LocationItem);
