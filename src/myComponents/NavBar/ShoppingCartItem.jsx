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
import Grid from "@material-ui/core/Grid";
// @material-ui/lab components
import Skeleton from "@material-ui/lab/Skeleton";
import { Button, TableRow, TableCell } from "@material-ui/core";

const ShoppingCartItem = props => {
  const [open, setOpen] = React.useState(false);
  const [itemCount, setItemCount] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [cartPrice, setCartPrice] = React.useState(0);
  const [refreshCartToggle, setRefreshCartToggle] = React.useState(false);

  const handleCartOpen = event => {
    setOpen(true);
  };

  const handleCartClose = value => {
    setOpen(false);
  };

  const handleDeleteItem = async id => {
    await deleteCampPseudoBooking(id);
    setRefreshCartToggle(!refreshCartToggle);
  };

  useEffect(() => {
    (async getCart => {
      try {
        const response = await getShoppingCart();
        setItemCount(response.shopItemCount);
        setItems(response.campPseudoBookings);
        setCartPrice(response.totalPrice);
      } catch {}
    })();
  }, [refreshCartToggle]);

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

        <Grid container>
          <Grid item align="center" xs={4}>
            Details
          </Grid>
          <Grid item align="right" xs={4}>
            Aktionen
          </Grid>
          <Grid item align="right" xs={4}>
            Preis
          </Grid>

          {items.map(item => (
            <Grid container>
              <Grid item align="center" xs={3}>
                <Skeleton variant="rect" width={50} height={30} />
              </Grid>
              <Grid item align="center" xs={3}>
                Ostercamp {item.kid.name}
              </Grid>
              <Grid item align="right" xs={3}>
                <Button onClick={e => handleDeleteItem(item._id)}>
                  <DeleteOutlinedIcon />
                </Button>
              </Grid>
              <Grid item align="right" xs={3}>
                {item.totalPrice}
              </Grid>
            </Grid>
          ))}
          {/* Final price of shopping cart, total of all items */}
          <Grid container>
            <Grid item align="center" xs={4} />
            <Grid item align="right" xs={4}>
              Gesamtpreis
            </Grid>
            <Grid item align="right" xs={4}>
              {cartPrice}
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
};

export default ShoppingCartItem;
