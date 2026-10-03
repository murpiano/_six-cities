const Setting = {
  NearbyCount: 3,
  TimeoutError: 2000,
  ReviewMin: 50,
  ReviewMax: 300,
} as const;

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

const RATING = [
  { value: 5, text: 'perfect' },
  { value: 4, text: 'good' },
  { value: 3, text: 'not bad' },
  { value: 2, text: 'badly' },
  { value: 1, text: 'terribly' },
];

const SortOption = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
};

enum BemClass {
  Cities = 'cities',
  Offer = 'offer',
  Favorites = 'favorites',
  PlaceCard = 'place-card',
  NearPlaces = 'near-places',
}

enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

enum MapMarker {
  DefaultMarker = '/img/pin.svg',
  ActiveMarker = '/img/pin-active.svg',
}

enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

enum SliceName {
  Offers = 'offers',
  Active = 'active',
  Error = 'error',
  Favorites = 'favorites',
  User = 'user',
}

enum ErrorMessage {
  FetchOffersAction = 'Не удалось загрузить данные по предложениям',
  FetchOfferAction = 'Не удалось загрузить выбранное предложение',
  FetchOffersNearbyAction = 'Не удалось загрузить варианты аренды поблизости',
  FetchGetCommentsAction = 'Не удалось загрузить отзывы',
  FetchChangeFavoriteAction = 'Не удалось изменить избранное',
  FetchFavoritesAction = 'Не удалось загрузить список избранных предложений',
  LoginAction = 'Ошибка авторизации',
  LogoutAction = 'Ошибка выхода',
  CheckAuthAction = 'Не удалось загрузить данные пользователя',
}

export {
  Setting,
  CITIES,
  RATING,
  SortOption,
  BemClass,
  AppRoute,
  MapMarker,
  AuthStatus,
  APIRoute,
  RequestStatus,
  SliceName,
  ErrorMessage,
};
