import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { App } from './services/app/app';
import { checkAuthAction } from './store/api-actions/auth-actions';
import { fetchOffersAction } from './store/api-actions/offers-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
