/*eslint-disable*/
import React, { useReducer } from "react";
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
import CampPicker from "./CampPicker";
import CampCreationContext, {
  CampCreationProvider
} from "./CampCreationContext";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import campsStyle from "assets/jss/material-kit-pro-react/views/campsStyle.js";

function reducer(state, action) {
  switch (action.type) {
    case "field-change": {
      console.log("state about to change");
      return {
        ...state,
        [action.field]: action.value
      };
    }

    default: {
      return state;
    }
  }
}

const useStyles = makeStyles(campsStyle);

function CampCreationPage({ width }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const classes = useStyles();

  // CAMP ERSTELLEN - GLOBAL STATE
  const [state, dispatch] = useReducer(reducer, {
    firstName: "Jesus",
    lastName: "Christus",
    birthday: "24.12.0000",
    userName: "jesusMotherfucker",
    phone: "0190 666666",
    street: "Road to Zion",
    zip: "1200",
    city: "Nazareth"
  });

  return (
    <CampCreationProvider value={{ state, dispatch }}>
      <Header
        brand="Marswiese"
        links={<HeaderLinks dropdownHoverColor="primary" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: "primary"
        }}
      />
      <Parallax
        image={require("assets/img/klettern__camp.jpg")}
        small={isWidthUp("sm", width)}
        filter="dark"
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1>Stelle dein Camp zusammen</h1>
                <h3 className={classes.title}>
                  Verbringe die Ferien genau so wie du es willst
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <CampPicker classes={{ ...classes }} />
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
    </CampCreationProvider>
  );
}
export default withWidth()(CampCreationPage);
