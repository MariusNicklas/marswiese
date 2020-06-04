import React, { useCallback, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Button } from "@material-ui/core";
import { login } from "../../APIUtils";

import styles from "assets/jss/material-kit-pro-react/components/headerStyle.js";
import CustomInput from "components/CustomInput/CustomInput";

const useStyles = makeStyles(styles);

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

const NavBar = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSending, setIsSending] = useState(false);

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, dispatch] = useReducer(reducer, {
    user: "",
    password: "",
    auth: false,
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
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

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
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={(e) => dispatch({ type: "logout" })}>
                  Logout
                </MenuItem>
                <MenuItem onClick={handleClose}>Profil ansehen</MenuItem>
              </Menu>
            </div>
          ) : (
            // if not authenticated
            <div className={classes.loginControls}>
              <CustomInput
                id="username"
                label="Benutzername"
                onChange={(e) =>
                  dispatch({
                    type: "field-change",
                    field: "user",
                    value: e.target.value,
                  })
                }
              />
              <CustomInput
                id="password"
                label="Passwort"
                type="password"
                onChange={(e) =>
                  dispatch({
                    type: "field-change",
                    field: "password",
                    value: e.target.value,
                  })
                }
              />
              <Button disabled={isSending} onClick={postLogin}>
                Anmelden
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
