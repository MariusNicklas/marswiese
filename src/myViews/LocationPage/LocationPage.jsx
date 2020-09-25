/*eslint-disable*/
import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// react components used to create a google map
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
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

import contactUsStyle from 'assets/jss/material-kit-pro-react/views/contactUsStyle.js';

const CustomSkinMap = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 48.2397949, lng: 16.2735844 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: 'water',
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: '#0088ff' }
            ]
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
              { hue: '#ff0000' },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#808080' }, { lightness: 54 }]
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ece2d9' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ccdca1' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#767676' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ffffff' }]
          },
          { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry.fill',
            stylers: [{ visibility: 'on' }, { color: '#b8cb93' }]
          },
          { featureType: 'poi.park', stylers: [{ visibility: 'on' }] },
          {
            featureType: 'poi.sports_complex',
            stylers: [{ visibility: 'on' }]
          },
          { featureType: 'poi.medical', stylers: [{ visibility: 'on' }] },
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'simplified' }]
          }
        ]
      }}
    >
      <Marker position={{ lat: 44.43353, lng: 26.093928 }} />
    </GoogleMap>
  ))
);

const useStyles = makeStyles(contactUsStyle);

export default function ContactUsPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <div className={classes.bigMap}>
        <CustomSkinMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div
              style={{
                height: `100%`,
                borderRadius: '6px',
                overflow: 'hidden'
              }}
            />
          }
          mapElement={<div style={{ height: `100%` }} />}
        />
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
}
