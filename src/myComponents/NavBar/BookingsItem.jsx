import React from 'react';
// @material-ui/icons
import TodayIcon from '@material-ui/icons/Today';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import styles from 'assets/jss/material-kit-pro-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

const LocationItem = props => {
  const classes = useStyles();
  return (
    <Link className={classes.dropdownLink} to="/meine-buchungen">
      <IconButton
        className={classes.navButton}
        edge="start"
        aria-controls="menu-appbar"
        aria-label="loction-navbar-item"
        onClick={() => props.history.push('/meine-buchungen')}
        style={{ fontSize: '12px', color: 'white' }}
      >
        <TodayIcon />
        Buchungen
      </IconButton>
    </Link>
  );
};

export default withRouter(LocationItem);
