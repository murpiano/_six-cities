import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import type { Location } from './map-utils';

enum MapSetting {
  MapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  MapCopyright = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  currentCity: Location
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: currentCity.lat,
          lng: currentCity.lng,
        },
        zoom: 13,
      });

      const layer = new TileLayer(MapSetting.MapUrl, {
        attribution: MapSetting.MapCopyright,
      });
      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, currentCity]);

  return map;
}

export { useMap };
