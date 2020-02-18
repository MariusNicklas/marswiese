/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import CampsSectionDescription from "myViews/CampsPage/Sections/CampsSectionDescription.js";
import CampsSectionServices from "myViews/CampsPage/Sections/CampsSectionServices.js";
import CampsSectionOffice from "myViews/CampsPage/Sections/CampsSectionOffice.js";
import CampsSectionContact from "myViews/CampsPage/Sections/CampsSectionContact.js";

import campsStyle from "assets/jss/material-kit-pro-react/views/campsStyle.js";
import { BrowserRouter } from "react-router-dom";

const useStyles = makeStyles(campsStyle);

export default function AboutUsPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Parallax image={require("assets/img/K1600_mars.JPG")} small>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <h1 className={classes.title}>Camps auf der Marswiese</h1>
              <h4>
                Wir bieten nun seit geraumer Zeit mehrmals im Jahr Feriencamps
                für Kinder zwischen 6-13 Jahren an!
              </h4>
            </GridItem>
          </GridContainer>
          <br />
          <GridContainer>
            <GridItem
              md={4}
              sm={4}
              className={classNames(
                classes.mrAuto,
                classes.mlAuto,
                classes.textCenter
              )}
            >
              <Button
                color="primary"
                size="large"
                round
                onClick={() => alert("camp zusammenstellen: btn 1 clicked")}
              >
                Camp zusammenstellen
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <CampsSectionDescription />
          <CampsSectionServices />
          <CampsSectionOffice />
          <CampsSectionContact />
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/?ref=mkpr-about-us"
                    className={classes.block}
                    target="_blank"
                  >
                    Creative Tim
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/presentation?ref=mkpr-about-us"
                    className={classes.block}
                    target="_blank"
                  >
                    About us
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="//blog.creative-tim.com/"
                    className={classes.block}
                    target="_blank"
                  >
                    Blog
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/license?ref=mkpr-about-us"
                    className={classes.block}
                    target="_blank"
                  >
                    Licenses
                  </a>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              &copy; {1900 + new Date().getYear()} , made with{" "}
              <Favorite className={classes.icon} /> by{" "}
              <a
                href="https://www.creative-tim.com?ref=mkpr-about-us"
                target="_blank"
              >
                Creative Tim
              </a>{" "}
              for a better web.
            </div>
          </div>
        }
      />
    </BrowserRouter>
  );
}
