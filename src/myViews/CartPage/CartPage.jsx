import React, { useState, useContext, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// own components and functionality
import {
  getShoppingCart,
  deleteCampPseudoBooking,
  deleteCoursePseudoBooking,
  getPayPalPaymentSession,
  getVisaPaymentSession,
  getKlarnaPaymentSession,
  getEpsPaymentSession
} from '../../APIUtils';
import { ShoppingCartContext } from '../../myComponents/NavBar/ShoppingCartContext';
// @material-ui/icons
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Drawer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody
} from '@material-ui/core';
// payment icons
import PaymentIcon from 'react-payment-icons';
import EpsLogo from '../../assets/img/epsLogo.png';
// core components
import Parallax from 'components/Parallax/Parallax.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import MainPageStyle from '../../assets/jss/material-kit-pro-react/myViews/mainPageStyle.js';
import sectionPillsStyle from 'assets/jss/material-kit-pro-react/views/blogPostsSections/sectionPillsStyle.js';

const useMainPageStyles = makeStyles(MainPageStyle);
const useSectionPillsStyles = makeStyles(sectionPillsStyle);

const CartPage = () => {
  const mainPageClasses = useMainPageStyles();
  const sectionPillsClasses = useSectionPillsStyles();

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

  const handleDeleteCampBooking = async id => {
    await deleteCampPseudoBooking(id);
    setCartChangedToggle(!cartChangedToggle);
  };

  const handleDeleteCourseBooking = async id => {
    await deleteCoursePseudoBooking(id);
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
      const url = response.data.data['payment-redirect-url'];
      window.open(url, '_self');
    }
  };

  const handleVisaPayment = async () => {
    const response = await getVisaPaymentSession();

    if (response.status === 200) {
      const url = response.data.data['payment-redirect-url'];
      window.open(url, '_self');
    }
  };

  const handleKlarnaPayment = async () => {
    const response = await getKlarnaPaymentSession();

    if (response.status === 200) {
      const url = response.data.data['payment-redirect-url'];
      window.open(url, '_self');
    }
  };

  const handleEpsPayment = async () => {
    const response = await getEpsPaymentSession();

    if (response.status === 200) {
      const url = response.data.data['payment-redirect-url'];
      window.open(url, '_self');
    }
  };

  return (
    <div>
      <Parallax
        image={
          'https://www.marswiese.at/wordpress/wp-content/uploads/Banner3.jpg'
        }
        small
      >
        <div className={mainPageClasses.container}>
          <GridContainer justify="center">
            <GridItem
              xs={12}
              sm={12}
              md={8}
              className={mainPageClasses.textCenter}
            >
              <h2 className={mainPageClasses.title}>Mein Warenkorb</h2>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div
        className={classNames(mainPageClasses.main, mainPageClasses.mainRaised)}
      >
        <div className={sectionPillsClasses.section}>
          {(() => {
            if (!cart || cart.shopItemCount === 0) {
              return <h3>Der Warenkorb ist leer</h3>;
            } else {
              return (
                <div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Teilnehmer</TableCell>
                        <TableCell>Preis</TableCell>
                        <TableCell>Löschen</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {cart.campPseudoBookings.map(booking => (
                        <TableRow key={booking.id}>
                          <TableCell>Feriencamp</TableCell>
                          <TableCell>{booking.kid.name}</TableCell>
                          <TableCell>EUR {booking.totalPrice}</TableCell>

                          <TableCell>
                            <Button
                              onClick={() =>
                                handleDeleteCampBooking(booking.id)
                              }
                            >
                              <DeleteOutlinedIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                    <TableBody>
                      {cart.coursePseudoBookings.map(booking => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            {booking.course.description}{' '}
                            {booking.course.courseName}
                          </TableCell>
                          <TableCell>{booking.participant.name}</TableCell>
                          <TableCell>EUR {booking.totalPrice}</TableCell>

                          <TableCell>
                            <Button
                              onClick={() =>
                                handleDeleteCourseBooking(booking.id)
                              }
                            >
                              <DeleteOutlinedIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell>Total</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow>
                        <TableCell />
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
                        style={{ color: 'primary', marginRight: '5px' }}
                      />
                    )}
                    {loadingPayment && <span>Daten werden übermittelt</span>}
                    {!loadingPayment && <span>Jetzt bezahlen</span>}
                  </Button>

                  <Drawer
                    variant="temporary"
                    anchor={'right'}
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

                        <Button onClick={handleVisaPayment}>
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
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
