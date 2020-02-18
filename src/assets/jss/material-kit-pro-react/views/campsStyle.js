import {
  container,
  title,
  main,
  mainRaised,
  mrAuto,
  whiteColor,
  mlAuto
} from "assets/jss/material-kit-pro-react.js";

const campsStyle = {
  main,
  mainRaised,
  mrAuto,
  mlAuto,
  container: {
    ...container,
    zIndex: 1
  },
  title: {
    ...title,
    "&, & + h4": {
      color: whiteColor
    }
  },
  textCenter: {
    textAlign: "center"
  },
  brand: {
    color: whiteColor,
    textAlign: "center",
    "& h1": {
      fontSize: "3.6rem",
      fontWeight: "600",
      display: "inline-block",
      position: "relative"
    }
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right"
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative"
  },
  root: {
    width: "90%"
  },
  backButton: {
    marginRight: "12px",
    marginBottom: "12px"
  },
  nextButton: {
    marginBottom: "12px"
  },
  instructions: {
    marginTop: "12px",
    marginBottom: "12px"
  },
  selectField: {
    marginBottom: "12px"
  },
  box: {
    minHeight: "200px"
  }
};

export default campsStyle;
