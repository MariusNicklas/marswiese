import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import MainPageStyle from "../assets/jss/material-kit-pro-react/myViews/mainPageStyle.js";

const PageLayout = (props) => {
  const useStyles = makeStyles(MainPageStyle);
  const classes = useStyles();

  return (
    <div>
      <Parallax
        image="https://www.marswiese.at/wordpress/wp-content/uploads/Banner3.jpg"
        small
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8} className={classes.textCenter}>
              <h2 className={classes.title}>
                Herzlich Willkommen im Sportzentrum Marswiese
              </h2>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classes.main}>{props.children}</div>

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
    </div>
  );
};

export default PageLayout;
