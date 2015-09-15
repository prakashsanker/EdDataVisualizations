import { combineReducers } from 'redux';
import {
	RECEIVE_DISTRICTS, REQUEST_DISTRICTS
} from 'actions';

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
	districtsByState
});

export default rootReducer;