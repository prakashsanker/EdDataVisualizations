import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { fetchDistricts } from 'actions.js';
import rootReducer from 'reducers.js';


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

store.dispatch(fetchDistricts('California')).then(() =>
	{console.log(store.getState());}
);