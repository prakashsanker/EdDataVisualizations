import 'babel-core/polyfill';
import { thunkMiddleware } from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { fetchDistricts, fetchSchools } from './actions.es6.js';
import rootReducer from './reducers.es6.js';
// import App from './components/App.es6.js';

const logger = createLogger({
	level: 'info',
	collapsed: true,
	predicate: (getState, action) => {action.type; }
});

debugger
const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	logger
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

store.dispatch(fetchDistricts('California')).then(state =>
	{
		var districts = store.getState().districtsByState['California'].districts;
		var fetchSchoolsDfds = [];
		for(var i = 0; i < districts.length; i++) {
			fetchSchoolsDfds.push(store.dispatch(fetchSchools(districts[i].id)));
		}
	}
);

let rootElement = document.getElementById('root');

// React.render(
// 	<Provider store={store}>
// 		{() => <App /> }
// 	</Provider>,
// 	rootElement
// );