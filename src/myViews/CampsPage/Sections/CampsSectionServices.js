import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Gesture from "@material-ui/icons/Gesture";
import Build from "@material-ui/icons/Build";
import FastfoodIcon from "@material-ui/icons/Fastfood";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import servicesStyle from "assets/jss/material-kit-pro-react/views/aboutUsSections/servicesStyle.js";

const useStyles = makeStyles(servicesStyle);

export default function SectionServices() {
  const classes = useStyles();
  return (
    <div className={classes.services}>
      <GridContainer>
        <GridItem
          md={8}
          sm={8}
          className={classNames(
            classes.mlAuto,
            classes.mrAuto,
            classes.textCenter
          )}
        >
          <h2 className={classes.title}>
            Ein vielseitiges Angebot wartet auf Dich!
          </h2>
          <h5 className={classes.description}>
            Ob Klettern, Tennis, Cherleeding, Wildniserlebnisse, im Sportzentrum
            Marsiwese gibt es für jeden das passende Erlebnis.
          </h5>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem md={4} sm={4}>
          <InfoArea
            title="1. Flexible Abholzeiten"
            description={
              <span>
                <p>
                  Kommt ihr etwas früher? Oder müsst etwas länger auf die
                  Abholung warten? Es gibt Vor- und Nachmittags die Möglichkeit
                  einer Ranbetreuung.
                </p>
              </span>
            }
            icon={Gesture}
            iconColor="rose"
          />
        </GridItem>
        <GridItem md={4} sm={4}>
          <InfoArea
            title="2. Frei gestaltbar"
            description={
              <span>
                <p>
                  Der gleiche Sport den ganzen Tag ist euch zu fade? Bei uns
                  sind die Camps frei gestaltbar! Geh morgens Klettern und
                  Mittags auf den Sportplatz Fußball spielen, auf der Marswiese
                  ist das möglich!
                </p>
              </span>
            }
            icon={Build}
            iconColor="rose"
          />
        </GridItem>
        <GridItem md={4} sm={4}>
          <InfoArea
            title="3. Gut versorgt"
            description={
              <span>
                <p>
                  Divide details about your product or agency work into parts.
                  Write a few lines about each one. A paragraph describing a
                  feature will be enough.{" "}
                </p>
              </span>
            }
            icon={FastfoodIcon}
            iconColor="rose"
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
