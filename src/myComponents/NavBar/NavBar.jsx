import React, { useContext, useEffect, useState } from "react";
// material-ui core components
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
// material-ui icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import TodayIcon from "@material-ui/icons/Today";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { ShoppingCartContext } from "./ShoppingCartContext";
import { getShoppingCart } from "../../APIUtils";
import { Grid } from "@material-ui/core";
import { UserContext } from "../../userContext";

const NavBar = (props) => {
  const [cart, setCart, cartChangedToggle] = useContext(ShoppingCartContext);
<<<<<<< HEAD
  const [selectedTab, setSelectedTab] = useState("/");
  const [user] = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

=======
  const [selectedTab, setSelectedTab] = useState(0);
  const [auth, dispatch] = useReducer(reducer, {
    user: "",
    password: "",
    authenticated: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSending, setIsSending] = useState(false);
  /*
  const postLogin = useCallback(() => {
    (async () => {
      // don't send again while we are sending
      if (isSending) return;
      // update state
      setIsSending(true);
      try {
        // send the actual request
        const response = await login(auth.user, auth.password);
        if (response.status === 200) {
          try {
            const userResponse = await getMe();
            const userName = `${userResponse.firstName} ${userResponse.lastName}`;
            console.log(userName);
            dispatch({
              type: "field-change",
              field: "user",
              value: userName,
            });
          } catch (err) {
            console.log(err);
          }
          dispatch({ type: "login" });
        }
      } catch (err) {
        console.log(err);
      }
      // once the request is sent, update state again
      setIsSending(false);
    })();
  }, [auth.password, auth.user, isSending]);
*/
>>>>>>> 4f27d01981818e975463c5f7b5a89fc5c4ca10a7
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    (async (getCart) => {
      try {
        const response = await getShoppingCart();
        setCart(response);
      } catch {}
    })();
  }, [cartChangedToggle, setCart]);

  const handleTabClick = (event,value) => {
    setSelectedTab(value);
<<<<<<< HEAD
    props.history.push(value);
=======

>>>>>>> 4f27d01981818e975463c5f7b5a89fc5c4ca10a7
  };

  return (
    <AppBar position="static">
<<<<<<< HEAD
      <Grid container justify="center">
        <Grid item>
          <Tabs value={selectedTab} onChange={handleTabClick}>
            <Tab
              icon={<HomeIcon />}
              label={<Hidden xsDown>Startseite</Hidden>}
              value={"/"}
            />

            <Tab
              icon={<LocationOnIcon />}
              label={<Hidden xsDown>Anfahrt</Hidden>}
              value={"/anfahrt"}
            />

            <Tab
              icon={<TodayIcon />}
              label={<Hidden xsDown>Buchungen</Hidden>}
              value={"/meine-Buchungen"}
            />

            <Tab
=======

      <Tabs value={selectedTab} onChange={handleTabClick}>
        <Tab
          icon={<HomeIcon />}
          label={<Hidden xsDown>Startseite</Hidden>}
          href="/"
          
        />
        <Tab
          icon={<LocationOnIcon />}
          label={<Hidden xsDown>Anfahrt</Hidden>}
          href="/anfahrt"
          
        />
          <Tab
              icon={<TodayIcon />}
              label={<Hidden xsDown>Buchungen</Hidden>}
              href="/meine-Buchungen"

          /> 
          <Tab
>>>>>>> 4f27d01981818e975463c5f7b5a89fc5c4ca10a7
              icon={
                <Badge
                  color="secondary"
                  badgeContent={cart ? cart.shopItemCount : 0}
                >
                  <ShoppingCartIcon />
                </Badge>
              }
              label={<Hidden xsDown>Warenkorb</Hidden>}
<<<<<<< HEAD
              value={"/mein-warenkorb"}
            />
          </Tabs>
        </Grid>

        <Grid item>
          <IconButton
=======
              href="/mein-warenkorb"
              
            />    
      </Tabs>      
      
      <IconButton
>>>>>>> 4f27d01981818e975463c5f7b5a89fc5c4ca10a7
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
<<<<<<< HEAD
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
              onClick={() => console.log("TO DO: delete JWT cookie backend")}
            >
              {user} abmelden
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default NavBar;
=======
          ><ArrowDropDownIcon />
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={(e) => {
                  handleMenuClose();
                  dispatch({ type: "logout" });
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </IconButton>
    </AppBar>
  );
}
/** 
 * {auth.authenticated} ? (
        
          
          
            
       
        )
*/
>>>>>>> 4f27d01981818e975463c5f7b5a89fc5c4ca10a7
