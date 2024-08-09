import { ThumbnailOffer } from '../../types/offer-type';

type StructuredOffersType = {
  [key: string]: ThumbnailOffer[];
};

function toStructureOffers(offers: ThumbnailOffer[]) {
  const structuredOffers: StructuredOffersType = {};

  offers.map((offer) => {
    if (!structuredOffers[offer.city.name]) {
      structuredOffers[offer.city.name] = [];
    }
    structuredOffers[offer.city.name].push(offer);
  });

  return structuredOffers;
}

export { toStructureOffers };
