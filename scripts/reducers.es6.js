import { combineReducers } from 'redux';
import {
	RECEIVE_DISTRICTS, REQUEST_DISTRICTS, REQUEST_SCHOOLS, RECEIVE_SCHOOLS
} from './actions.es6.js';
import { district, school, ethnicInfo } from './normalizr_schema.es6.js';
import { normalize, Schema, arrayOf } from 'normalizr';

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
			// var districts = {};
			// for(let district of json) {
			// 	districts[district.Id] = district;
			// 	districts[district.Id].schools = [];
			// }
		    // var response = normalize(action.districts, {
		    //   schools: arrayOf(school)
		    // });
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				districts: action.districts
			});
		default:
			return state;
	}
}

function schoolsByDistrict(state = [], action) {
	switch(action.type){
		case REQUEST_SCHOOLS:
			return Object.assign({}, state, {
				[action.districtId]: {
					isFetching: true
				}
			});
		case RECEIVE_SCHOOLS:
			var toCopy = Object.assign({}, action.district, {
				isFetching: true
			});
			return Object.assign({}, state, {
				[action.district.id]: toCopy
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