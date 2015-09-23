import { combineReducers } from 'redux';
import {
	RECEIVE_DISTRICTS, REQUEST_DISTRICTS, REQUEST_SCHOOLS, RECEIVE_SCHOOLS
} from './actions.es6.js';

function districts(state = {
	isFetching: false,
	didInvalidate: false,
	items: []
}, action) {
	switch(action.type) {
		case REQUEST_DISTRICTS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case RECEIVE_DISTRICTS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: action.districts
			});
		default:
			return state;
	}
}

function schoolsByDistrict(state = [], action) {
	switch(action.type){
		case REQUEST_SCHOOLS:
			//go through, find the right district
			
		case RECEIVE_SCHOOLS:
		default:
			return state;
	}

	debugger
	return state;
}

function districtsByState(state = {}, action) {
	switch(action.type) {
		case REQUEST_DISTRICTS:
		case RECEIVE_DISTRICTS:
			return Object.assign({}, state, {
				[action.geoState]: districts(state[action.geoState], action)
			});
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	districtsByState,
	schoolsByDistrict
});

export default rootReducer;