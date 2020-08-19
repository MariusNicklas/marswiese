import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
// material-ui core components
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
// material-ui icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TodayIcon from '@material-ui/icons/Today';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { ShoppingCartContext } from './ShoppingCartContext';
import { getShoppingCart, logout } from '../../APIUtils';
import { Grid } from '@material-ui/core';
import UserContext from '../../context/UserContext';

const NavBar = props => {
  const [cart, setCart, cartChangedToggle] = useContext(ShoppingCartContext);
  const [selectedTab, setSelectedTab] = useState('/');
  const { userData } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getShoppingCart();
        setCart(response);
      } catch {}
    })();
  }, [cartChangedToggle, setCart]);

  const handleTabClick = (event, value) => {
    setSelectedTab(value);
    props.history.push(value);
  };

  return (
    <AppBar position="static">
      <Grid container justify="center">
        <Grid item>
          <Tabs value={selectedTab} onChange={handleTabClick}>
            <Tab
              icon={<HomeIcon />}
              label={<Hidden xsDown>Startseite</Hidden>}
              value={'/'}
            />

            <Tab
              icon={<LocationOnIcon />}
              label={<Hidden xsDown>Anfahrt</Hidden>}
              value={'/anfahrt'}
            />

            <Tab
              icon={<TodayIcon />}
              label={<Hidden xsDown>Buchungen</Hidden>}
              value={'/meine-Buchungen'}
            />

            <Tab
              icon={
                <Badge
                  color="secondary"
                  badgeContent={cart ? cart.shopItemCount : 0}
                >
                  <ShoppingCartIcon />
                </Badge>
              }
              label={<Hidden xsDown>Warenkorb</Hidden>}
              value={'/mein-warenkorb'}
            />
          </Tabs>
        </Grid>

        <Grid item>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <ArrowDropDownIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                logout();
                props.history.push('/login');
              }}
            >
              {userData.firstName} {userData.lastName} abmelden
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default withRouter(NavBar);
