import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// Material Kit Pro components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import InfoArea from 'components/InfoArea/InfoArea.js';
// @material-ui/icons
import PinDrop from '@material-ui/icons/PinDrop';
import Phone from '@material-ui/icons/Phone';
// styles
import contactUsStyle from 'assets/jss/material-kit-pro-react/views/contactUsStyle.js';

const contactUsStyles = makeStyles(contactUsStyle);

const SectionGeneral = () => {
  const contactUsClasses = contactUsStyles();

  return (
    <div>
      <h4 className={contactUsClasses.title}>
        Herzlich Willkommen im Sportzentrum Marswiese
      </h4>
      <GridContainer>
        <GridItem md={6} sm={6}>
          <p>
            Das Sportzentrum Marswiese liegt am Rande des Wienerwaldes im 17.
            Wiener Gemeindebezirk. Eingebettet in einer idyllischen
            Hügellandschaft mitten im Grünen, bietet die Anlage jede Menge
            Möglichkeiten Sportarten aller Art auszuüben.
          </p>
        </GridItem>

        <GridItem md={4} sm={4} className={contactUsClasses.mlAuto}>
          <InfoArea
            className={contactUsClasses.info}
            title="Finde uns am Mars"
            description={
              <p>
                Neuwaldegger Str. 57a, <br /> 1700 Wien
              </p>
            }
            icon={PinDrop}
            iconColor="primary"
          />

          <InfoArea
            className={contactUsClasses.info}
            title="Ruf uns an"
            description={<p>+43 1 489 7172</p>}
            icon={Phone}
            iconColor="primary"
          />
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default SectionGeneral;
