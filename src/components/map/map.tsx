import { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import {
  adaptLocation,
  useUpdateLocation,
  useUpdateMarkers,
} from './map-utils';
import { useAppSelector } from '../../hooks/store';
import { useMap } from './use-map';
import { MAX_NEARBY_OFFER_COUNT } from '../../const';
import { offersByCity } from '../../store/slices/offers-slice/offers-selectors';
import { Offer, ThumbnailOffer } from '../../types/offer-type';

type MapProps = {
  bemBlock: string;
  activeOffer: Offer | null;
  nearbyOffers: ThumbnailOffer[];
};

export function Map({ bemBlock, activeOffer, nearbyOffers }: MapProps) {
  const offers = useAppSelector(offersByCity);
  const location = (activeOffer ? activeOffer : offers[0]).location;
  const offersForMap: (ThumbnailOffer | Offer)[] =
    bemBlock === 'cities'
      ? offers
      : nearbyOffers
        .slice(0, MAX_NEARBY_OFFER_COUNT)
        .concat([].push(activeOffer));
  const correctLocation = adaptLocation(location);
  const mapRef = useRef(null);
  const map = useMap(mapRef, correctLocation);

  useUpdateLocation(map, correctLocation);
  useUpdateMarkers(map, offersForMap);

  return <section className={`${bemBlock}__map map`} ref={mapRef}></section>;
}
