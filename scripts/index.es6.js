import 'babel-core/polyfill';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { fetchDistricts, fetchSchools } from './actions.es6.js';
import rootReducer from './reducers.es6.js';
import App from './components/App.es6.js';
import React from 'react';

const logger = createLogger({
	level: 'info',
	collapsed: true,
	predicate: (getState, action) => {action.type; }
});

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	logger
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

let rootElement = document.getElementById('root');

React.render(
  // The child must be wrapped in a function
  // to work around an issue in React 0.13.
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  rootElement
 );

