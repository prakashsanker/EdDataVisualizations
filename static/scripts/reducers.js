'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _redux = require('redux');

var _actions = require('actions');

function districts(state, action) {
	if (state === undefined) state = {
		isFetching: false,
		didInvalidate: false,
		items: []
	};

	switch (action.type) {
		case _actions.REQUEST_DISTRICTS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case _actions.RECEIVE_DISTRICTS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: action.districts
			});
		default:
			return state;
	}
}

function districtsByState(state, action) {
	if (state === undefined) state = {};

	switch (action.type) {
		case _actions.REQUEST_DISTRICTS:
		case _actions.RECEIVE_DISTRICTS:
			return Object.assign({}, state, _defineProperty({}, action.geoState, districts(state[action.geoState], action)));
		default:
			return state;
	}
}

var rootReducer = (0, _redux.combineReducers)({
	districtsByState: districtsByState
});

exports['default'] = rootReducer;
module.exports = exports['default'];
//# sourceMappingURL=reducers.js.map
