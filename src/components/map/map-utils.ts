import { useEffect } from 'react';
import { Map as LeafletMap, Icon, Marker, layerGroup } from 'leaflet';
import { MapMarker } from '../../const';
import { activeSelectors } from '../../store/slices/active-slice';
import { useAppSelector } from '../../hooks/store';
import type {
  FullOffer,
  LocationData,
  OffersMapType,
} from '../../types/offer-type';

export type Location = {
  lat: number;
  lng: number;
  zoom: number;
};

const defaultCustomIcon = new Icon({
  iconUrl: MapMarker.DefaultMarker,
  iconSize: [27, 40],
  iconAnchor: [15, 40],
  shadowUrl: '',
});

const currentCustomIcon = new Icon({
  iconUrl: MapMarker.ActiveMarker,
  iconSize: [27, 40],
  iconAnchor: [15, 40],
  shadowUrl: '',
});

const getLocation = (offers: FullOffer[]) => offers[0].city.location;

const adaptLocation = ({
  latitude,
  longitude,
  zoom,
}: LocationData): Location => ({
  lat: latitude,
  lng: longitude,
  zoom: zoom,
});

const useUpdateLocation = (map: LeafletMap | null, location: Location) => {
  useEffect(() => {
    if (map) {
      map.setView(location);
      const markerLayer = layerGroup().addTo(map);
      map.removeLayer(markerLayer);
    }
  });
};

const useUpdateMarkers = (map: LeafletMap | null, offers: OffersMapType[]) => {
  const activeOfferId = useAppSelector(activeSelectors.activeOfferId);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            activeOfferId !== undefined && offer.id === activeOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeOfferId]);
};

export { getLocation, adaptLocation, useUpdateLocation, useUpdateMarkers };
