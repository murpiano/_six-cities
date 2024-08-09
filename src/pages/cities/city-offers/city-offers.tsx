import { SortSelect } from '../sort-select';
import OfferCard from '../../../components/main/offer-card/offer-card';
import { useActionCreators, useAppSelector } from '../../../hooks/store';
import {
  activeActions,
  activeSelectors,
} from '../../../store/slices/active-slice';
import { toSortOffers } from '../../../store/slices/offers-slice/offers-selectors';
import { store } from '../../../store/store';
import { ThumbnailOffer } from '../../../types/offer-type';
import { fetchGetCommentsAction } from '../../../store/api-actions/comments-actions';
import { fetchOfferAction, fetchOffersNearbyAction } from '../../../store/api-actions/offers-actions';

function CityOffers() {
  const city = useAppSelector(activeSelectors.city);
  const sortedOffers = useAppSelector(toSortOffers);
  const correctEnding = sortedOffers.length > 1 ? 's' : '';

  const { setActiveOfferId } = useActionCreators(activeActions);
  const handleMouseEnter = (offer: ThumbnailOffer) =>
    setActiveOfferId(offer.id);
  const handleMouseLeave = () => setActiveOfferId('');
  const handleMouseClick = (offer: ThumbnailOffer) => {
    store.dispatch(fetchOfferAction(offer.id));
    store.dispatch(fetchGetCommentsAction(offer.id));
    store.dispatch(fetchOffersNearbyAction(offer.id));
  };

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {sortedOffers.length} place{correctEnding} to stay in {city}
      </b>
      <SortSelect />
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((offer) => (
          <OfferCard
            key={offer.id}
            bemBlock="cities"
            offer={offer}
            onMouseEnter={() => handleMouseEnter(offer)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMouseClick(offer)}
          />
        ))}
      </div>
    </section>
  );
}

export default CityOffers;
