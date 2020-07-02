import React from "react";
// core components
import Header from "components/Header/Header.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// own components
import LocationItem from "./LocationItem";
import HomeItem from "./HomeItem";
import BookingsItem from "./BookingsItem";
import ShoppingCartItem from "./ShoppingCartItem";

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const HeaderLinks = (props) => {
  /*const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };*/

  /*const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };*/

  /*const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };*/

  const classes = useStyles();

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <HomeItem />
      </ListItem>
      <ListItem className={classes.listItem}>
        <LocationItem />
      </ListItem>
      <ListItem className={classes.listItem}>
        <BookingsItem />
      </ListItem>
      <ListItem className={classes.listItem}>
        <ShoppingCartItem />
      </ListItem>
    </List>
  );
};

const NavBar = () => {
  return (
    <Header
      brand="Marswiese"
      links={<HeaderLinks dropdownHoverColor="secondary" />}
      fixed
      color="transparent"
      changeColorOnScroll={{
        height: 100,
        color: "primary",
      }}
    />
  );
};

export default NavBar;
