/* eslint-disable */
import React, { useCallback, useState, useReducer } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";

// core components
import Button from "components/CustomButtons/Button.js";
import { login } from "../../APIUtils";
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

function reducer(state, action) {
  switch (action.type) {
    case "field-change":
      return {
        ...state,
        [action.field]: action.value
      };

    case "login":
      console.log("logged in");
      return {
        ...state,
        auth: true
      };

    case "logout":
      return {
        ...state,
        auth: false
      };

    default: {
      return state;
    }
  }
}

export default function NavBarItems(props) {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  var onClickSections = {};

  const { dropdownHoverColor } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSending, setIsSending] = useState(false);

  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, dispatch] = useReducer(reducer, {
    user: "",
    password: "",
    auth: false
  });

  const postLogin = useCallback(() => {
    (async () => {
      // don't send again while we are sending
      if (isSending) return;
      // update state
      setIsSending(true);
      try {
        // send the actual request
        const response = await login(state.user, state.password);
        if (response.status === 200) {
          dispatch({ type: "login" });
        }
      } catch (err) {
        console.log(err);
      }
      // once the request is sent, update state again
      setIsSending(false);
    })();
  }, [isSending, state.password, state.user]);

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        {state.auth ? (
          // if authenticated
          <div className={classes.loginControls}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <div>{state.user}</div>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={e => dispatch({ type: "logout" })}>
                Logout
              </MenuItem>
              <MenuItem onClick={handleClose}>Profil ansehen</MenuItem>
            </Menu>
          </div>
        ) : (
          // if not authenticated
          <div className={classes.loginControls}>
            <TextField
              id="username"
              label="Benutzername"
              onChange={e =>
                dispatch({
                  type: "field-change",
                  field: "user",
                  value: e.target.value
                })
              }
            />
            <TextField
              id="password"
              label="Passwort"
              type="password"
              onChange={e =>
                dispatch({
                  type: "field-change",
                  field: "password",
                  value: e.target.value
                })
              }
            />
            <Button disabled={isSending} onClick={postLogin} color="primary">
              Anmelden
            </Button>
          </div>
        )}
      </ListItem>
    </List>
  );
}

NavBarItems.defaultProps = {
  hoverColor: "primary"
};

NavBarItems.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
