import React, { useState, useContext, useEffect } from "react";
// own components and functionality
import {
  getShoppingCart,
  deleteCampPseudoBooking,
  getPayPalPaymentSession,
  getVisaPaymentSession,
  getKlarnaPaymentSession,
  getEpsPaymentSession,
} from "../../APIUtils";
import { ShoppingCartContext } from "./ShoppingCartContext";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Close from "@material-ui/icons/Close";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
// @material-ui/core components
import {
  Badge,
  Button,
  Drawer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  TableBody,
} from "@material-ui/core";
// payment icons
import PaymentIcon from "react-payment-icons";
import EpsLogo from "../../assets/img/epsLogo.png";

const useStyles = makeStyles((theme) => ({
  label: {
    // Aligns the content of the button vertically.
    flexDirection: "column",
  },
  drawer: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexShrink: 0,
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
      flexShrink: 0,
    },
  },
  drawerPaper: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexShrink: 0,
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
      flexShrink: 0,
    },
  },
}));

const ShoppingCart = (props) => {
  const classes = useStyles();

  const [cart, setCart, cartChangedToggle, setCartChangedToggle] = useContext(
    ShoppingCartContext
  );
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [servicesDrawerOpen, setServicesDrawerOpen] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    (async (getCart) => {
      try {
        const response = await getShoppingCart();
        setCart(response);
      } catch {}
    })();
  }, [cartChangedToggle, setCart]);

  const handleCartDrawerToggle = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

  const handleServicesDrawerToggle = () => {
    setServicesDrawerOpen(!servicesDrawerOpen);
  };

  const handleDeleteItem = async (id) => {
    await deleteCampPseudoBooking(id);
    setCartChangedToggle(!cartChangedToggle);
  };

  const checkOutCart = async () => {
    setLoadingPayment(true);
    setCartDrawerOpen(false);
    setServicesDrawerOpen(true);
    /*const response = await getPayPalPaymentSession();
    
    if(response.status === 200) {
      const url = response.data.data["payment-redirect-url"]; 
      window.open(url, "_blank")
    }*/
    setLoadingPayment(false);
  };

  const handlePayPalPayment = async () => {
    const response = await getPayPalPaymentSession();

    if (response.status === 200) {
      const url = response.data.data["payment-redirect-url"];
      window.open(url, "_self");
    }
  };

  const handleVisaPayment = async () => {
    const response = await getVisaPaymentSession();

    if (response.status === 200) {
      const url = response.data.data["payment-redirect-url"];
      window.open(url, "_self");
    }
  };

  const handleKlarnaPayment = async () => {
    const response = await getKlarnaPaymentSession();

    if (response.status === 200) {
      const url = response.data.data["payment-redirect-url"];
      window.open(url, "_self");
    }
  };

  const handleEpsPayment = async () => {
    const response = await getEpsPaymentSession();

    if (response.status === 200) {
      const url = response.data.data["payment-redirect-url"];
      window.open(url, "_self");
    }
  };

  const fullCart = () => (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="temporary"
      anchor={"right"}
      open={cartDrawerOpen || servicesDrawerOpen}
      onClose={handleCartDrawerToggle}
      width="75%"
    >
      {cartDrawerOpen && (
        <React.Fragment>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleCartDrawerToggle}
          >
            <Close />
          </IconButton>

          <Typography variant="h6" id="tableTitle" component="div">
            Dein Warenkorb
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Preis</TableCell>
                <TableCell>Löschen</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cart.campPseudoBookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>Feriencamp für {booking.kid.name}</TableCell>

                  <TableCell>EUR {booking.totalPrice}</TableCell>

                  <TableCell>
                    <Button onClick={(e) => handleDeleteItem(booking._id)}>
                      <DeleteOutlinedIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Total</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell />
                <TableCell>EUR {cart.totalPrice}</TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>

          <Button
            disabled={loadingPayment}
            color="primary"
            variant="contained"
            onClick={(e) => checkOutCart()}
          >
            {loadingPayment && (
              <i
                className="fa fa-refresh fa-spin"
                style={{ color: "primary", marginRight: "5px" }}
              />
            )}
            {loadingPayment && <span>Daten werden übermittelt</span>}
            {!loadingPayment && <span>Jetzt bezahlen</span>}
          </Button>
        </React.Fragment>
      )}

      {servicesDrawerOpen && (
        <React.Fragment>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleServicesDrawerToggle}
          >
            <Close />
          </IconButton>

          <Button onClick={handlePayPalPayment}>
            <PaymentIcon
              id="paypal"
              style={{ margin: 10, width: 100 }}
              className="payment-icon"
            />
          </Button>

          <Button onClick={handleKlarnaPayment}>
            <img
              src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
              alt="Pay now with Klarna"
              style={{ margin: 10, width: 100 }}
            />
          </Button>

          <Button onCLick={handleVisaPayment}>
            <PaymentIcon
              id="visa"
              style={{ margin: 10, width: 100 }}
              className="payment-icon"
            />
          </Button>

          <Button onClick={handleEpsPayment}>
            <img
              src={EpsLogo}
              alt="Pay now with Eps"
              style={{ margin: 10, width: 100 }}
            />
          </Button>
        </React.Fragment>
      )}
    </Drawer>
  );

  const emptyCart = () => (
    <React.Fragment>
      <Drawer
        variant="temporary"
        anchor={"right"}
        open={cartDrawerOpen}
        onClose={handleCartDrawerToggle}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleCartDrawerToggle}
        >
          <Close />
        </IconButton>

        <Typography variant="h6" id="tableTitle" component="div">
          Dein Warenkorb
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Der Warenkorb ist leer</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Drawer>
    </React.Fragment>
  );

  if (!cart || cart.shopItemCount === 0) {
    return (
      <React.Fragment>
        <IconButton
          classes={{ root: classes.button, label: classes.label }}
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleCartDrawerToggle}
          style={{ fontSize: "12px", color: "white" }}
        >
          <Badge color="secondary" badgeContent={0}>
            <ShoppingCartIcon />
          </Badge>
          Warenkorb
        </IconButton>

        {emptyCart()}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <IconButton
          classes={{ root: classes.button, label: classes.label }}
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleCartDrawerToggle}
          style={{ fontSize: "12px", color: "white" }}
        >
          <Badge color="secondary" badgeContent={0}>
            <ShoppingCartIcon />
          </Badge>
          Warenkorb
        </IconButton>

        {fullCart()}
      </React.Fragment>
    );
  }
};

export default ShoppingCart;
