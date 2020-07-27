import React from 'react';
// @material-ui/icons
import LoginIcon from '@material-ui/icons/ExitToApp';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';

import styles from 'assets/jss/material-kit-pro-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

const LoginItem = props => {
  const classes = useStyles();
  return (
    <Link to="/login">
      <IconButton
        className={classes.navLink}
        edge="start"
        aria-controls="menu-appbar"
        aria-label="loction-navbar-item"
        onClick={() => props.history.push('/login')}
        style={{ fontSize: '12px', color: 'white' }}
      >
        <LoginIcon />
        Login
      </IconButton>
    </Link>
  );
};

export default withRouter(LoginItem);
