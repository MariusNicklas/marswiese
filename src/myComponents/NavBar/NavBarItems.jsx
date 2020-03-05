/* eslint-disable */
import React, { useCallback, useState, useReducer, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import clsx from "clsx";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Input } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// core components
import Button from "components/CustomButtons/Button.js";
import { login, isLoggedIn, getMe } from "../../APIUtils";
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
import ShoppingCartItem from "./ShoppingCartItem";
import AvatarItem from "./AvatarItem";

const useStyles = makeStyles(styles);

function reducer(state, action) {
  switch (action.type) {
    case "field-change":
      return {
        ...state,
        [action.field]: action.value
      };

    case "login":
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
  {
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
  }

  const { dropdownHoverColor } = props;
  const classes = useStyles();

  const [isSending, setIsSending] = useState(false);

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
          try {
            const userResponse = await getMe();
            const userName = `${userResponse.firstName} ${userResponse.lastName}`;
            dispatch({
              type: "field-change",
              field: "user",
              value: username
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
  }, [state.password, state.user]);

  useEffect(() => {
    (async () => {
      try {
        // send the actual request
        const response = await isLoggedIn();
        if (response.status === 200 || 304) {
          try {
            const userResponse = await getMe();
            const userName = `${userResponse.firstName} ${userResponse.lastName}`;
            dispatch({
              type: "field-change",
              field: "user",
              value: userName
            });
          } catch (err) {
            console.log(err);
          }
          dispatch({ type: "login" });
        }
      } catch (err) {
        dispatch({ type: "logout" });
      }
    })();
  }, []);

  return (
    <List className={clsx(classes.list, classes.mlAuto)}>
      <ListItem className={classes.listItem}>
        {state.auth ? (
          // if authenticated
          <div className={classes.loginControls}>
            <ShoppingCartItem />
            <AvatarItem user={state.user} dispatch={dispatch} />
          </div>
        ) : (
          // if not authenticated
          <Grid container spacing={3}>
            <Grid item key="username-input-grid-item" xs={12} md={4}>
              <Input
                id="username"
                label="Benutzername"
                onChange={e =>
                  dispatch({
                    type: "field-change",
                    field: "user",
                    value: e.target.value
                  })
                }
                placeholder="Benutzername"
                style={{
                  padding: "5px",
                  backgroundColor: "white"
                }}
              />
            </Grid>

            <Grid item key="password-input-grid-item" xs={12} md={4}>
              <Input
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
                placeholder="Passwort"
                style={{
                  padding: "5px",
                  backgroundColor: "white"
                }}
              />
            </Grid>

            <Grid item key="button-grid-item" xs={12} md={4}>
              <Button
                disabled={isSending}
                onClick={postLogin}
                color="primary"
                style={{ margin: 0 }}
              >
                Anmelden
              </Button>
            </Grid>
          </Grid>
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
