import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Footer from 'components/Footer/Footer.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// styles
import MainPageStyle from '../../assets/jss/material-kit-pro-react/myViews/mainPageStyle.js';

const useStyles = makeStyles(MainPageStyle);

const MarswieseFooter = () => {
  const classes = useStyles();

  return (
    <Footer
      content={
        <div>
          <div className={classes.left}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="https://www.marswiese.at/wordpress/wp-content/uploads/AGB-Sportst%C3%A4ttenverein-Marswiese-10.2019-1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.block}
                >
                  AGB
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="https://www.marswiese.at/datenschutz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.block}
                >
                  Datenschutz
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="https://www.marswiese.at/impressum/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.block}
                >
                  Impressum
                </a>
              </ListItem>
            </List>
          </div>

          <div className={classes.right}>&copy; 2020 Marswiese</div>
        </div>
      }
    />
  );
};

export default MarswieseFooter;
