/* eslint-disable no-console */
import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/use-map';
import { City } from '../../mocks/city';
import { Offers } from '../../mocks/offers';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offers[]
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({ city, offers }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.lat,
          lng: point.location.lng
        });

        marker
          .setIcon(
            defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, offers]);

  return (
    <div
      style={{
        height: '100%'
      }}
      ref={mapRef}
    >
    </div >
  );
}


export default Map;
