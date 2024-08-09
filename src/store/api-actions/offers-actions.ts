import { APIRoute } from '../../const';
import { FullOffer, Offer, ThumbnailOffer } from '../../types/offer-type';
import { activeActions } from '../slices/active-slice';
import { offersActions } from '../slices/offers-slice/offers-slice';
import { store } from '../store';
import { appCreateAsyncThunk } from '../utils';

const fetchOffersAction = appCreateAsyncThunk<void, undefined>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(activeActions.setIsLoading(true));
    const { data: offers } = await api.get<FullOffer[]>(APIRoute.Offers);
    dispatch(activeActions.setIsLoading(false));
    dispatch(offersActions.setAllOffers(offers));
  }
);

const fetchOfferAction = appCreateAsyncThunk<void, string>(
  'data/fetchOffer',
  async (offerId, { extra: api }) => {
    const { data: offer } = await api.get<Offer>(
      `${APIRoute.Offers}/${offerId}`
    );
    store.dispatch(offersActions.setActiveOffer(offer));
  }
);

const fetchOffersNearbyAction = appCreateAsyncThunk<void, string>(
  'data/fetchOffer',
  async (offerId, { extra: api }) => {
    const { data: offers } = await api.get<ThumbnailOffer[]>(
      `${APIRoute.Offers}/${offerId}/nearby`
    );
    store.dispatch(offersActions.setNearbyOffers(offers));
  }
);

export { fetchOffersAction, fetchOfferAction, fetchOffersNearbyAction };
