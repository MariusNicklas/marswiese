import React, { useContext, useEffect } from "react";
// @material-ui/icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Badge from "@material-ui/core/Badge";

import { ShoppingCartContext } from "./ShoppingCartContext";
import { getShoppingCart } from "../../APIUtils";

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const ShoppingCartItem = (props) => {
  const classes = useStyles();

  const [cart, setCart, cartChangedToggle] = useContext(ShoppingCartContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await getShoppingCart();
        setCart(response);
      } catch {}
    })();
  }, [cartChangedToggle, setCart]);

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
        <Badge color="secondary" badgeContent={cart ? cart.shopItemCount : 0}>
          <ShoppingCartIcon />
        </Badge>
        Warenkorb
      </IconButton>
    </Link>
  );
};

export default withRouter(ShoppingCartItem);
