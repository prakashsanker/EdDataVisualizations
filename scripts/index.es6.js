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

// store.dispatch(fetchDistricts('California')).then(state =>
// 	{
// 		var districts = store.getState().districtsByState['California'].districts;
// 		var schoolsRequestPromises = [];
// 		for(var i = 0; i < districts.length; i++) {
// 			schoolsRequestPromises.push(store.dispatch(fetchSchools(districts[i].id)));
// 		}
// 		// Promise.all(schoolsRequestPromises).then(() =>
// 		// 	{
// 		// 		let rootElement = document.getElementById('root');
// 		// 		debugger
// 		// 		return React.render(
// 		// 		  // The child must be wrapped in a function
// 		// 		  // to work around an issue in React 0.13.
// 		// 		  <Provider store={store}>
// 		// 		    {() => <App />}
// 		// 		  </Provider>,
// 		// 		  rootElement
// 		// 		 );
// 		// 	})
// 			// .catch((a) => {
// 			// 	debugger
// 			// });
		
// 	}
// );

let rootElement = document.getElementById('root');
console.log("root element");
console.log(rootElement);
React.render(
  // The child must be wrapped in a function
  // to work around an issue in React 0.13.
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  rootElement
 );

