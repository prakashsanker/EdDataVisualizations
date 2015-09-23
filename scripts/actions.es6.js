/*
 * Action types
 */
import fetch from 'isomorphic-fetch';

export const REQUEST_SCHOOLS = 'REQUEST_SCHOOLS';

export function requestSchools(districtId) {
	return {
		type: REQUEST_SCHOOLS,
		districtId
	}
}

export const RECEIVE_SCHOOLS = 'RECEIVE_SCHOOLS';

export function receiveSchools(districtId) {
	//append this to district schools list
	return {
		type: RECEIVE_SCHOOLS,
		districtId,
		receivedAt: Date.now()
	};
}

export function fetchSchools(district) {
	return function (dispatch) {
		dispatch(requestSchools(districts));
	};
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

