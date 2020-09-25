import React from 'react';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOsm from 'ol/source/OSM';

import { MapComponent } from '@terrestris/react-geo';
import './LocationPageStyles.scss';

const layer = new OlLayerTile({
  source: new OlSourceOsm()
});

const center = [48.2394908, 16.2767598];

const map = new OlMap({
  view: new OlView({
    center: center,
    zoom: 16
  }),
  layers: [layer]
});

const LocationPage = () => {
  return (
    <div className="App">
      <MapComponent map={map} />
    </div>
  );
};

export default LocationPage;
