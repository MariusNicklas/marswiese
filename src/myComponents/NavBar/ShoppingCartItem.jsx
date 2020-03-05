import React, { useEffect } from "react";
// own components and functionality
import { getShoppingCart, deleteCampPseudoBooking } from "../../APIUtils";
// @material-ui/icons
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
// @material-ui/core components
import Badge from "@material-ui/core/Badge";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// @material-ui/lab components
import Skeleton from "@material-ui/lab/Skeleton";
import { Button } from "@material-ui/core";

const ShoppingCartItem = props => {
  const [open, setOpen] = React.useState(false);
  const [itemCount, setItemCount] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [price, setPrice] = React.useState(0);

  const handleCartOpen = event => {
    setOpen(true);
  };

  const handleCartClose = value => {
    setOpen(false);
  };

  const handleDeleteItem = async id => {
    await deleteCampPseudoBooking(id);
    setItems(items.filter(item => item._id !== id));
  };

  useEffect(() => {
    (async getCart => {
      try {
        const response = await getShoppingCart();
        setItemCount(response.shopItemCount);
        setItems(response.campPseudoBookings);
        setPrice(response.totalPrice);
      } catch {}
    })();
  }, []);

  return (
    <React.Fragment>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleCartOpen}
        color="inherit"
      >
        <Badge color="secondary" badgeContent={itemCount}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Dialog open={open} onClose={handleCartClose}>
        <DialogTitle id="shopping-cart-dialog-title">
          Dein Warenkorb
        </DialogTitle>
        <List>
          {items.map(item => (
            <ListItem key={item._id}>
              <Skeleton variant="rect" width={150} height={90} />
              <ListItemText
                primary={
                  "Camp für " + item.kid.name + " Preis " + item.totalPrice
                }
              />
              <Button onClick={e => handleDeleteItem(item._id)}>
                <DeleteOutlinedIcon />
              </Button>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </React.Fragment>
  );
};

export default ShoppingCartItem;
