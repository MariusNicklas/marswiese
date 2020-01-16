/*!

=========================================================
* Material Kit PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui icons
import Subject from "@material-ui/icons/Subject";
import Delete from "@material-ui/icons/Delete";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import cardBlog5 from "assets/img/examples/card-blog5.jpg";

import cardsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.js";

const style = {
  ...cardsStyle
};

const useStyles = makeStyles(style);

export default function RotatingCard() {
  React.useEffect(() => {
    addStylesForRotatingCards();
    return function cleanup() {};
  });
  const addStylesForRotatingCards = () => {
    var rotatingCards = document.getElementsByClassName(classes.cardRotate);
    for (let i = 0; i < rotatingCards.length; i++) {
      var rotatingCard = rotatingCards[i];
      var cardFront = rotatingCard.getElementsByClassName(classes.front)[0];
      var cardBack = rotatingCard.getElementsByClassName(classes.back)[0];
      cardFront.style.height = "unset";
      cardFront.style.width = "unset";
      cardBack.style.height = "unset";
      cardBack.style.width = "unset";
      var rotatingWrapper = rotatingCard.parentElement;
      var cardWidth = rotatingCard.parentElement.offsetWidth;
      var cardHeight = rotatingCard.children[0].children[0].offsetHeight;
      rotatingWrapper.style.height = cardHeight + "px";
      rotatingWrapper.style["margin-bottom"] = 30 + "px";
      cardFront.style.height = "unset";
      cardFront.style.width = "unset";
      cardBack.style.height = "unset";
      cardBack.style.width = "unset";
      cardFront.style.height = cardHeight + 35 + "px";
      cardFront.style.width = cardWidth + "px";
      cardBack.style.height = cardHeight + 35 + "px";
      cardBack.style.width = cardWidth + "px";
    }
  };
  const classes = useStyles();
  return (
    <Card background className={classes.cardRotate}>
      <div
        className={`${classes.front} ${classes.wrapperBackground}`}
        style={{
          backgroundImage: `url(${cardBlog5})`
        }}
      >
        <CardBody background className={classes.cardBodyRotate}>
          <h6 className={classes.cardCategoryWhite}>Full Background Card</h6>
          <a href="#pablo" onClick={e => e.preventDefault()}>
            <h3 className={classes.cardTitleWhite}>
              This Background Card Will Rotate on Hover
            </h3>
          </a>
          <p className={classes.cardDescriptionWhite}>
            Dont be scared of the truth because we need to restart the human
            foundation in truth And I love you like Kanye loves Kanye I love
            Rick Owens’ bed design but the back is...
          </p>
        </CardBody>
      </div>
      <div
        className={`${classes.back} ${classes.wrapperBackground}`}
        style={{
          backgroundImage: `url(${cardBlog5})`
        }}
      >
        <CardBody background className={classes.cardBodyRotate}>
          <h5 className={classes.cardTitleWhite}>Manage Post</h5>
          <p className={classes.cardDescriptionWhite}>
            As an Admin, you have shortcuts to edit, view or delete the posts.
          </p>
          <div className={classes.textCenter}>
            <Button round justIcon color="info">
              <Subject />
            </Button>
            <Button round justIcon color="success">
              <Icon>mode_edit</Icon>
            </Button>
            <Button round justIcon color="danger">
              <Delete />
            </Button>
          </div>
        </CardBody>
      </div>
    </Card>
  );
}
