import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';
import Routes from './router';
import logger from './middlewares/logger';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter basename="/kushi-dashboard">
      <Routes />
    </BrowserRouter>
  </Provider>
);

const store = createStore(rootReducer, applyMiddleware(logger));

// store.subscribe(() => { console.log('store', store.getState()); });

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
