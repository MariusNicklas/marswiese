import React from 'react';
// @material-ui/icons
import HomeIcon from '@material-ui/icons/Home';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

import styles from 'assets/jss/material-kit-pro-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

const HomeItem = props => {
  const classes = useStyles();
  return (
    <Link className={classes.dropdownLink} to="/">
      <IconButton
        className={classes.navButton}
        edge="start"
        aria-controls="menu-appbar"
        aria-label="home-navbar-item"
        onClick={() => props.history.push('/')}
        style={{ fontSize: '12px', color: 'white' }}
      >
        <HomeIcon />
        Startseite
      </IconButton>
    </Link>
  );
};

export default withRouter(HomeItem);
