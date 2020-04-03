import React, { useState, useContext, useEffect } from "react";
// own components and functionality
import { getShoppingCart, deleteCampPseudoBooking } from "../../APIUtils";
import { ShoppingCartContext } from "./ShoppingCartContext";
// @material-ui/icons
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Close from "@material-ui/icons/Close";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
// @material-ui/core components
import { Badge, Button, Drawer, Table, TableRow, TableCell, TableHead, Typography, TableBody } from "@material-ui/core";

const ShoppingCartItem = props => {

  const [cart, setCart, cartChangedToggle, setCartChangedToggle] = useContext(ShoppingCartContext);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    (async getCart => {
      try {
        const response = await getShoppingCart();
        setCart(response);
      } catch {}
    })();
  }, [cartChangedToggle, setCart] );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDeleteItem = async id => {
    await deleteCampPseudoBooking(id);
    setCartChangedToggle(!cartChangedToggle);
  };

  const checkoutCart = () => {
    console.log("checking out...")
  }

  const fullCart = () => (
    <React.Fragment>
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Close />
          </IconButton>  
  
          <Typography variant="h6" id="tableTitle" component="div">
            Dein Warenkorb
          </Typography>
          
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Item
                </TableCell>
                <TableCell>
                  Preis
                </TableCell>
                <TableCell>
                  Löschen
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cart.campPseudoBookings.map(booking => (
                <TableRow key={booking._id}>
                  <TableCell>
                    Feriencamp für {booking.kid.name}
                  </TableCell>
  
                  <TableCell>
                    EUR {booking.totalPrice}
                  </TableCell>

                  <TableCell>
                    <Button onClick={e => handleDeleteItem(booking._id)}>
                      <DeleteOutlinedIcon />
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
            
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  Total
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell />
                <TableCell>
                  EUR {cart.totalPrice}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>

          <Button color="primary" variant="contained" onClick={e => checkoutCart()}>
            Jetzt bezahlen
          </Button>
        </Drawer>
      </React.Fragment>
  )

  const emptyCart = () => (
    <React.Fragment>
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Close />
          </IconButton>  
  
          <Typography variant="h6" id="tableTitle" component="div">
            Dein Warenkorb
          </Typography>
          
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Der Warenkorb ist leer
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Drawer>
      </React.Fragment>
  )

  if(!cart || cart.shopItemCount === 0) { return (
    <React.Fragment>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleDrawerToggle}
          color="inherit"
        >
          <Badge color="secondary" badgeContent={0}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {emptyCart()}
      </React.Fragment>
  )}
  else {
    return (
      <React.Fragment>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleDrawerToggle}
          color="inherit"
        >
          <Badge color="secondary" badgeContent={cart.shopItemCount}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {fullCart()}
      </React.Fragment>
    );
  }
};

export default ShoppingCartItem;
