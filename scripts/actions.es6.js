/*
 * Action types
 */
import fetch from 'isomorphic-fetch';

export const REQUEST_SCHOOLS = 'REQUEST_SCHOOLS';

export function requestSchools(geoState) {
	return {
		type: REQUEST_SCHOOLS,
		geoState
	}
}

export const RECEIVE_SCHOOLS = 'RECEIVE_SCHOOLS';

export function receiveSchools(district) {
	//append this to district schools list
	return {
		type: RECEIVE_SCHOOLS,
		geoState,
		receivedAt: Date.now()
	};
}

export function fetchSchools(district) {

};

export const REQUEST_DISTRICTS = 'REQUEST_DISTRICTS';

export function requestDistricts(geoState) {
	return {
		type: REQUEST_DISTRICTS,
		geoState
	};
}

export const RECEIVE_DISTRICTS = 'RECEIVE_DISTRICTS';

export function receiveDistricts(geoState, json) {
	console.log("in receive");
	console.log(json);
	return {
		type: RECEIVE_DISTRICTS,
		geoState,
		receivedAt: Date.now(),
		districts: json
	}
}

export function fetchDistricts(geoState) {

	return function (dispatch) {
		dispatch(requestDistricts(geoState));
		return fetch(`http://localhost:8100/districts/`)
	        .then(response => response.json())
			.then(json => {
				dispatch(receiveDistricts(geoState, json))
			});
	}
}

