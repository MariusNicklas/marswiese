/*eslint-disable*/
import React, { useReducer } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';
import Footer from 'components/Footer/Footer.js';
// sections for this page
import CampPicker from './CampPicker';
import { DivWithParallaxPaper } from 'myComponents/withParallaxPaper.jsx';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import campsStyle from 'assets/jss/material-kit-pro-react/views/campsStyle.js';

const useStyles = makeStyles(campsStyle);

function CampCreationPage({ width }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const classes = useStyles();

  return (
    <DivWithParallaxPaper
      title="Stelle dein Camp zusammen"
      subtitle="Verbringe die Ferien genau so wie du es willst"
      image={require('assets/img/klettern__camp.jpg')}
    >
      <div className={classes.container}>
        <CampPicker classes={{ ...classes }} />
      </div>
    </DivWithParallaxPaper>
  );
}
export default withWidth()(CampCreationPage);
