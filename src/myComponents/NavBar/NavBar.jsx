import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// material-ui core components
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
// material-ui icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import TodayIcon from "@material-ui/icons/Today";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { Label } from "reactstrap";

import { ShoppingCartContext } from "./ShoppingCartContext";
import { login, getMe, getShoppingCart } from "../../APIUtils";

function reducer(state, action) {
  switch (action.type) {
    case "field-change":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "login":
      return {
        ...state,
        auth: true,
      };

    case "logout":
      return {
        ...state,
        auth: false,
      };

    default: {
      return state;
    }
  }
}

export default function NavBar() {
  const [cart, setCart, cartChangedToggle] = useContext(ShoppingCartContext);
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

  };

  return (
    <AppBar position="static">

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
              icon={
                <Badge
                  color="secondary"
                  badgeContent={cart ? cart.shopItemCount : 0}
                >
                  <ShoppingCartIcon />
                </Badge>
              }
              label={<Hidden xsDown>Warenkorb</Hidden>}
              href="/mein-warenkorb"
              
            />    
      </Tabs>      
      
      <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
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