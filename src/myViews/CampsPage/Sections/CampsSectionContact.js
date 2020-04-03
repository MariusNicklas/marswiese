import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import contactStyle from "assets/jss/material-kit-pro-react/views/aboutUsSections/contactStyle.js";
import { Link } from "@material-ui/core";

const useStyles = makeStyles(contactStyle);

const SectionContact = () => {
  const classes = useStyles();
  return (
    <div className={classes.aboutUs}>
      <GridContainer>
        <GridItem
          md={8}
          sm={8}
          className={classNames(classes.mrAuto, classes.mlAuto)}
        >
          <h2 className={classNames(classes.title, classes.textCenter)}>
            Willst du teilnehmen?
          </h2>
          <h4 className={classNames(classes.description, classes.textCenter)}>
            Stelle dein Camp jetzt zusammen, entscheide was du morgens und
            nachmittags machen willst.
          </h4>

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
              <Link href="/gestalte-dein-camp">
                <Button color="primary" size="lg" round>
                  Camp zusammenstellen
                </Button>
              </Link>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default SectionContact;
