import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import aboutUsStyle from "assets/jss/material-kit-pro-react/views/aboutUsStyle.js";

const useStyles = makeStyles(aboutUsStyle);

const SectionLocation = () => {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem
        md={8}
        sm={8}
        className={classNames(
          classes.mrAuto,
          classes.mlAuto,
          classes.textCenter
        )}
      >
        <h4>Herzlich Willkommen im Sportzentrum Marswiese</h4>
        <div>
          Das Sportzentrum Marswiese liegt am Rande des Wienerwaldes im 17.
          Wiener Gemeindebezirk. Eingebettet in einer idyllischen
          Hügellandschaft mitten im Grünen, bietet die Anlage jede Menge
          Möglichkeiten Sportarten aller Art auszuüben.
        </div>
      </GridItem>
    </GridContainer>
  );
};

export default SectionLocation;
