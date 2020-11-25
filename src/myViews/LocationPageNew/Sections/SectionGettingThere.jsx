import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import InfoArea from "components/InfoArea/InfoArea.js";
// icons
import TramIcon from '@material-ui/icons/Tram';
import CarIcon from '@material-ui/icons/DriveEta';
import BikeIcon from '@material-ui/icons/DirectionsBike';
// styles
import contactUsStyle from 'assets/jss/material-kit-pro-react/views/contactUsStyle.js';

const contactUsStyles = makeStyles(contactUsStyle);

const SectionGettingThere = () => {
  const contactUsClasses = contactUsStyles();

  return (
    <div>
      <h4 className={contactUsClasses.title} style={{ display: 'center' }}>
        Anfahrt
      </h4>
      <GridContainer>
        <GridItem md={4} sm={4}>
          <InfoArea
            title="Mit den Öffis"
            description={
              <span>
                <p>
            Mit der Straßenbahnlinie 43 vom Schottenring über die U-Bahnstation
            Alserstrasse zur Endstation Neuwaldegg und dann mit dem Bus 43A nur
            drei Stationen bis zur Marswiese (oder 10 Minuten Fußmarsch).
          </p>
          <p>Aus Richtung Hütteldorf mit dem Bus 43B</p>
              </span>
            }
            icon={TramIcon}
            iconColor="rose"
          />
        </GridItem>
        <GridItem md={4} sm={4}>
          <InfoArea
            title="Mit dem Auto"
            description={
              <span>
                <p>
            13./14. Bezirk: Über Hüttelbergstraße und Amundsenstraße/
            Neuwaldegger Straße Richtung Höhenstraße. Vor dem ersten
            Kreisverkehr Richtung Tulln (Exelbergstraße) rechts zum Parkplatz
            Marswiese.
          </p>
          <p>
            17./18. Bezirk: Über Hernalser Hauptstraße und Dornbacher Straße
            weiter auf Neuwaldegger Straße (Entlang Straßenbahnlinie 43). Beim
            Kreisverkehr zur Höhenstraße 2. Ausfahrt, links. Der Parkplatz
            Marswiese befindet sich nach dem 2. Kreisverkehr auf der linken
            Seite hinter dem Sportzentrum.
          </p>
              </span>
            }
            icon={CarIcon}
            iconColor="rose"
          />
        </GridItem>
        <GridItem md={4} sm={4}>
          <InfoArea
            title="Mit dem Fahrrad"
            description={
              <span>
                <p>
                Gleiche Route wie mit dem Auto, ein empfohlener und ruhigerer Radweg
            führt entlang des Hernalser Friedhofs/ Alszeile. Wir haben einen
            überdachten Radständer!
                </p>
              </span>
            }
            icon={BikeIcon}
            iconColor="rose"
          />
        </GridItem>
      </GridContainer>
      {/*<GridContainer>
        <GridItem md={4} xs={12}>
          <h5 className={contactUsClasses.title}>Mit den Öffis</h5>
          <p>
            Mit der Straßenbahnlinie 43 vom Schottenring über die U-Bahnstation
            Alserstrasse zur Endstation Neuwaldegg und dann mit dem Bus 43A nur
            drei Stationen bis zur Marswiese (oder 10 Minuten Fußmarsch).
          </p>
          <p>Aus Richtung Hütteldorf mit dem Bus 43B</p>
        </GridItem>

        <GridItem md={4} xs={12}>
          <h5 className={contactUsClasses.title}>Mit dem Auto</h5>
          <p>
            13./14. Bezirk: Über Hüttelbergstraße und Amundsenstraße/
            Neuwaldegger Straße Richtung Höhenstraße. Vor dem ersten
            Kreisverkehr Richtung Tulln (Exelbergstraße) rechts zum Parkplatz
            Marswiese.
          </p>
          <p>
            17./18. Bezirk: Über Hernalser Hauptstraße und Dornbacher Straße
            weiter auf Neuwaldegger Straße (Entlang Straßenbahnlinie 43). Beim
            Kreisverkehr zur Höhenstraße 2. Ausfahrt, links. Der Parkplatz
            Marswiese befindet sich nach dem 2. Kreisverkehr auf der linken
            Seite hinter dem Sportzentrum.
          </p>
        </GridItem>

        <GridItem md={4} xs={12}>
          <h5 className={contactUsClasses.title}>Mit dem Fahrrad</h5>
          <p>
            Gleiche Route wie mit dem Auto, ein empfohlener und ruhigerer Radweg
            führt entlang des Hernalser Friedhofs/ Alszeile. Wir haben einen
            überdachten Radständer!
          </p>
        </GridItem>
      </GridContainer>*/}
    </div>
  );
};

export default SectionGettingThere;
