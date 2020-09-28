import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import PinDrop from '@material-ui/icons/PinDrop';
import Phone from '@material-ui/icons/Phone';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import InfoArea from 'components/InfoArea/InfoArea.js';
import Footer from 'components/Footer/Footer.js';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOsm from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

import { MapComponent } from '@terrestris/react-geo';
import './LocationPageStyles.scss';

import contactUsStyle from 'assets/jss/material-kit-pro-react/views/contactUsStyle.js';
import Header from 'components/Header/Header';
import HeaderLinks from 'myComponents/NavBar/NavBar';

const marswieseLatLon = [16.2767598, 48.2394908];
const marswieseWebMercator = fromLonLat(marswieseLatLon);

const layer = new OlLayerTile({
  source: new OlSourceOsm()
});

const map = new OlMap({
  view: new OlView({
    center: marswieseWebMercator,
    zoom: 17
  }),
  layers: [layer],
  controls: []
});

const useStyles = makeStyles(contactUsStyle);

const LocationPage = () => {
  const classes = useStyles();
  return (
    <div>
      <Header
        brand="Marswiese"
        links={<HeaderLinks dropdownHoverColor="secondary" />}
        fixed
        color="primary"
      />
      <div className={classes.bigMap}>
        <MapComponent map={map} />
      </div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.contactContent}>
          <div className={classes.container}>
            <h4 className={classes.title}>
              Herzlich Willkommen im Sportzentrum Marswiese
            </h4>
            <GridContainer>
              <GridItem md={6} sm={6}>
                <p>
                  Das Sportzentrum Marswiese liegt am Rande des Wienerwaldes im
                  17. Wiener Gemeindebezirk. Eingebettet in einer idyllischen
                  Hügellandschaft mitten im Grünen, bietet die Anlage jede Menge
                  Möglichkeiten Sportarten aller Art auszuüben.
                  <br />
                  <br />
                </p>
              </GridItem>
              <GridItem md={4} sm={4} className={classes.mlAuto}>
                <InfoArea
                  className={classes.info}
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
                  className={classes.info}
                  title="Ruf uns an"
                  description={<p>+43 1 489 7172</p>}
                  icon={Phone}
                  iconColor="primary"
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.right}>
              &copy; {1900 + new Date().getYear()} Marswiese
            </div>
          </div>
        }
      />
    </div>
  );
};

export default LocationPage;
