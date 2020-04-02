import React, { useState, useContext, useEffect } from "react";
// own components and functionality
import { getShoppingCart, deleteCampPseudoBooking } from "../../APIUtils";
import { ShoppingCartContext } from "./ShoppingCartContext";
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
import { Button } from "@material-ui/core";

const ShoppingCartItem = props => {
  const [open, setOpen]           = useState(false);
  //const [itemCount, setItemCount] = useState(0);

  //isLoading Cart State
  const [isLoadingCart, setLoadingCart] = useState(true);

  const [cart, setCart, cartChangedToggle, setCartChangedToggle] = useContext(ShoppingCartContext);

  //const [items, setItems]         = useState(cart.campPseudoBookings);
  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    console.log('useEffect');  
    (async getCart => {
      try {
        setLoadingCart(true);
        const response = await getShoppingCart();
        console.log('befor setCart', response);
        setCart(response);
        setLoadingCart(false);
      } catch {}
    })();
  }, [cartChangedToggle] );

  const handleCartOpen = event => {
    setOpen(true);
  };

  const handleCartClose = value => {
    setOpen(false);
  };

  const handleDeleteItem = async id => {
    await deleteCampPseudoBooking(id);
    setCartChangedToggle(!cartChangedToggle);
  };

  if(isLoadingCart) { return (<h1>loading spinner</h1>);} else {
    if(cart) {
    return (
      <React.Fragment>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleCartOpen}
          color="inherit"
        >
          <Badge color="secondary" badgeContent={cart.shopItemCount}>
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
  
          {cart.campPseudoBookings.map(booking => (
              <Grid container key={booking._id}>
                <Grid item align="center" xs={3}>
                  <Skeleton variant="rect" width={50} height={30} />
                </Grid>
                <Grid item align="center" xs={3}>
                  Ostercamp {booking.kid.name}
                </Grid>
                <Grid item align="right" xs={3}>
                  <Button onClick={e => handleDeleteItem(booking._id)}>
                    <DeleteOutlinedIcon />
                  </Button>
                </Grid>
                <Grid item align="right" xs={3}>
                  {booking.totalPrice}
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
                {cart.totalPrice}
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
      </React.Fragment>
    );
  }
  else {
    return (<h1>Oops... etwas ist schiefgelaufen</h1>)
  }}
  
};

export default ShoppingCartItem;
