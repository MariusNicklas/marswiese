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
import { ShoppingCartContext } from "../../myComponents/NavBar/ShoppingCartContext";
// @material-ui/icons
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
// @material-ui/core components
import {
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

const CartPage = () => {
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [cart, setCart, cartChangedToggle, setCartChangedToggle] = useContext(
    ShoppingCartContext
  );

  const [servicesDrawerOpen, setServicesDrawerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await getShoppingCart();
        setCart(response);
      } catch {}
    })();
  }, [cartChangedToggle, setCart]);

  const handleDeleteItem = async (id) => {
    await deleteCampPseudoBooking(id);
    setCartChangedToggle(!cartChangedToggle);
  };

  const handleServicesDrawerToggle = () => {
    setServicesDrawerOpen(!servicesDrawerOpen);
  };

  const checkOutCart = async () => {
    setLoadingPayment(true);
    setServicesDrawerOpen(true);
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

  if (!cart || cart.shopItemCount === 0) {
    return <h1>empty cart</h1>;
  } else {
    return (
      <React.Fragment>
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
                  <Button onClick={() => handleDeleteItem(booking._id)}>
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
          onClick={() => checkOutCart()}
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

        <Drawer
          variant="temporary"
          anchor={"right"}
          open={servicesDrawerOpen}
          onClose={handleServicesDrawerToggle}
          width="75%"
        >
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
      </React.Fragment>
    );
  }
};

export default CartPage;
