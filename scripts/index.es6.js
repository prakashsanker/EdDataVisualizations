import 'babel-core/polyfill';
import thunkMiddleware from 'redux-thunk';
import Provider from 'react-redux';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { fetchDistricts, fetchSchools } from './actions.es6.js';
import rootReducer from './reducers.es6.js';


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

store.dispatch(fetchDistricts('California')).then(state =>
	{
		var districts = store.getState().districtsByState['California'].districts;
		for(var i = 0; i < districts.length; i++) {
			store.dispatch(fetchSchools(districts[i].id));
		}
	}
);