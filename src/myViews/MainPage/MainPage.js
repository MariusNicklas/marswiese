/*eslint-disable*/
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// sections for this page
import SectionSports from './Sections/SectionSports.js';
import SectionProducts from './Sections/SectionProducts.js';
import SubscribeLine from './Sections/SubscribeLine.js';

import MainPageStyle from '../../assets/jss/material-kit-pro-react/myViews/mainPageStyle.js';
import { DivWithParallaxPaper } from 'myComponents/withParallaxPaper.jsx';
import MarswieseFooter from 'myComponents/Footer/Footer.jsx';

const useStyles = makeStyles(MainPageStyle);

const MainPage = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <DivWithParallaxPaper
      title="Herzlich Willkommen im Sportzentrum Marswiese"
      image="https://www.marswiese.at/wordpress/wp-content/uploads/Banner3.jpg"
    >
      <div className={classes.container}>
        <SectionSports />
      </div>
      <div className={classes.container}>
        <SectionProducts />
      </div>
      <SubscribeLine />
    </DivWithParallaxPaper>
  );
};

export default MainPage;
