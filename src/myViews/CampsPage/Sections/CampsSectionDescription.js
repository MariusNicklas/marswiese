import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import descriptionStyle from "assets/jss/material-kit-pro-react/views/aboutUsSections/descriptionStyle.js";

const useStyles = makeStyles(descriptionStyle);

export default function SectionDescription() {
  const classes = useStyles();
  return (
    <div className={classNames(classes.aboutDescription, classes.textCenter)}>
      <GridContainer>
        <GridItem
          md={8}
          sm={8}
          className={classNames(classes.mrAuto, classes.mlAuto)}
        >
          <h5 className={classes.description}>
            Die Ferien stehen vor der Türe und du möchtest dich sportlich
            betätigen? Dann bist du bei uns genau richtig! Wir bieten dir in den
            Semester-, den Oster- sowie den Sommerferien jede Menge Spaß in
            unseren Feriencamps! Wähle aus unserem breiten Angebot an Sportarten
            dein Vor- und Nachmittagsprogramm und freu dich auf eine sportliche
            Woche mit anderen Kindern in deinem Alter!
          </h5>
        </GridItem>
      </GridContainer>
    </div>
  );
}
