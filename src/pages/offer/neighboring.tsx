import OfferCard from '../../components/main/offer-card/offer-card';
import { useActionCreators, useAppSelector } from '../../hooks/store';
import { ThumbnailOffer } from '../../types/offer-type';
import {
  activeActions,
  activeSelectors,
} from '../../store/slices/active-slice';
import { MAX_NEARBY_OFFER_COUNT } from '../../const';
import { fetchGetCommentsAction } from '../../store/api-actions/comments-actions';
import { store } from '../../store/store';
import { fetchOfferAction, fetchOffersNearbyAction } from '../../store/api-actions/offers-actions';

type NeighboringProps = {
  nearbyOffers: ThumbnailOffer[];
};

export function Neighboring({ nearbyOffers }: NeighboringProps) {
  const activeOfferId = useAppSelector(activeSelectors.activeOfferId);
  nearbyOffers = nearbyOffers.slice(0, MAX_NEARBY_OFFER_COUNT);
  const { setActiveOfferId } = useActionCreators(activeActions);

  const handleMouseClick = (offer: ThumbnailOffer) => {
    setActiveOfferId(offer.id);
    store.dispatch(fetchOfferAction(offer.id));
    store.dispatch(fetchGetCommentsAction(offer.id));
    store.dispatch(fetchOffersNearbyAction(offer.id));
  };

  return nearbyOffers.length <= 1 ? (
    ''
  ) : (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
          Other places in the neighbourhood
        </h2>
        <div className="near-places__list places__list">
          {nearbyOffers.map(
            (offer) =>
              offer.id !== activeOfferId && (
                <OfferCard
                  key={offer.id}
                  bemBlock="near-places"
                  offer={offer}
                  onClick={() => handleMouseClick(offer)}
                />
              )
          )}
        </div>
      </section>
    </div>
  );
}
