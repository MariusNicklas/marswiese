import {
  title,
  description,
  mrAuto,
  mlAuto
} from "assets/jss/material-kit-pro-react.js";
import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.js";
import rotatingCards from "assets/jss/material-kit-pro-react/rotatingCards.js";
const imgRaised = imagesStyles.imgRaised;
const rounded = imagesStyles.imgRounded;
const imgFluid = imagesStyles.imgFluid;

const servicesStyle = {
  ...rotatingCards,
  title,
  description,
  mrAuto,
  mlAuto,
  textCenter: {
    textAlign: "center!important"
  },
  office: {
    "& img": {
      margin: "20px 0px"
    }
  },
  imgRaised,
  rounded,
  imgFluid
};

export default servicesStyle;
