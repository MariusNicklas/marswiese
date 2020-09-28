import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Header from 'components/Header/Header';

import HeaderLinks from 'myComponents/NavBar/NavBar';
import SectionGeneral from './Sections/SectionGeneral';
import SectionGettingThere from './Sections/SectionGettingThere';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOsm from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

import { MapComponent } from '@terrestris/react-geo';
import './LocationPageStyles.scss';
// styles
import contactUsStyle from 'assets/jss/material-kit-pro-react/views/contactUsStyle.js';

import MarswieseFooter from 'myComponents/Footer/Footer';

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

const contactUsStyles = makeStyles(contactUsStyle);

const LocationPage = () => {
  const contactUsClasses = contactUsStyles();

  return (
    <div>
      <Header
        brand="Marswiese"
        links={<HeaderLinks dropdownHoverColor="secondary" />}
        fixed
        color="primary"
      />
      <div className={contactUsClasses.bigMap}>
        <MapComponent map={map} />
      </div>
      <div
        className={classNames(
          contactUsClasses.main,
          contactUsClasses.mainRaised
        )}
      >
        <div className={contactUsClasses.contactContent}>
          <div className={contactUsClasses.container}>
            <SectionGeneral />
          </div>
          <div className={contactUsClasses.container}>
            <SectionGettingThere />
          </div>
        </div>
      </div>

      <MarswieseFooter />
    </div>
  );
};

export default LocationPage;
