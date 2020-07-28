/*eslint-disable*/
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// core components
import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';
// sections for this page
import SectionSports from './Sections/SectionSports.js';
import SectionProducts from './Sections/SectionProducts.js';
import SubscribeLine from './Sections/SubscribeLine.js';

import MainPageStyle from '../../assets/jss/material-kit-pro-react/myViews/mainPageStyle.js';
import { DivWithParallaxPaper } from 'myComponents/withParallaxPaper.jsx';

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
      <div className={classes.main}>
        <div className={classes.container}>
          <SectionSports />
        </div>
        <div className={classes.container}>
          <SectionProducts />
        </div>
        <SubscribeLine />
      </div>

      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a href="" target="_blank" className={classes.block}>
                    AGB
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href="" target="_blank" className={classes.block}>
                    Datenschutz
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href="" className={classes.block}>
                    Impressum
                  </a>
                </ListItem>
              </List>
            </div>

            <div className={classes.right}>&copy; 2020 Marswiese</div>
          </div>
        }
      />
    </DivWithParallaxPaper>
  );
};

export default MainPage;
