import React from "react";
import { withRouter } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import sectionPillsStyle from "assets/jss/material-kit-pro-react/views/blogPostsSections/sectionPillsStyle.js";

const useStyles = makeStyles(sectionPillsStyle);

function SectionSports() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <h2>Sportarten</h2>
      <GridContainer>
        <GridItem xs={12} sm={5} md={7}>
          <Card
            onClick={() =>
              (window.location.href = "https://www.climbonmarswiese.at/")
            }
            raised
            background
            style={{
              backgroundImage:
                "url('https://www.marswiese.at/wordpress/wp-content/uploads/boulderbereich.jpg')"
            }}
          >
            <CardBody background>
              <h3 className={classes.cardTitle}>Klettern</h3>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={7} md={5}>
          <Card
            onClick={() =>
              (window.location.href = "https://www.tennisclubs.at//")
            }
            raised
            background
            style={{
              backgroundImage:
                "url('https://www.marswiese.at/wordpress/wp-content/uploads/christofgagglphotography_MG_6146-1.jpg')"
            }}
          >
            <CardBody background>
              <h3 className={classes.cardTitle}>Tennis</h3>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <Card
            raised
            background
            style={{
              backgroundImage:
                "url('https://www.marswiese.at/wordpress/wp-content/uploads/Marswiese-6.jpg')"
            }}
          >
            <CardBody background>
              <h3 className={classes.cardTitle}>Fußball</h3>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <Card
            raised
            background
            style={{
              backgroundImage:
                "url('https://www.marswiese.at/wordpress/wp-content/uploads/la.jpg')"
            }}
          >
            <CardBody background>
              <h3 className={classes.cardTitle}>Alle Sportarten</h3>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withRouter(SectionSports);
