import { combineReducers } from 'redux';
import {
	RECEIVE_DISTRICTS, REQUEST_DISTRICTS, REQUEST_SCHOOLS, RECEIVE_SCHOOLS
} from './actions.es6.js';
import { district, school, ethnicInfo } from './normalizr_schema.es6.js';
import { normalize, Schema, arrayOf } from 'normalizr';

function districts(state = {
	isFetching: false,
	didInvalidate: false,
	districts: []
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
				districts: action.districts
			});
		default:
			return state;
	}
}

function schoolsByDistrict(state = {
	isFetching: false
}, action) {
	switch(action.type){
		case REQUEST_SCHOOLS:
			return Object.assign({}, state, {
				isFetching: true,
				[action.districtId]: {
					schools: []
				}
			});
		case RECEIVE_SCHOOLS:
			return Object.assign({}, state, {
				isFetching: false,
				[action.district.id]: {
					schools: action.district.schools
				}
			});
		default:
			return state;
	}
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