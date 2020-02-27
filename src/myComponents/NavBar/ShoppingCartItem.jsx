import React from "react";
// @material-ui/icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// @material-ui/core components
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const ShoppingCartItem = props => {
  const handleCartOpen = event => {};

  return (
    <React.Fragment>
      <Badge color="secondary" badgeContent={4} onClick={handleCartOpen}>
        <ShoppingCartIcon />
      </Badge>
    </React.Fragment>
  );
};

export default ShoppingCartItem;
