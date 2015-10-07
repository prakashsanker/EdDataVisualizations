/*
 * Action types
 */
import fetch from 'isomorphic-fetch';


export const REQUEST_SCHOOLS = 'REQUEST_SCHOOLS';

export function requestSchools(districtId) {
	return {
		type: REQUEST_SCHOOLS,
		districtId: districtId
	}
}

export const RECEIVE_SCHOOLS = 'RECEIVE_SCHOOLS';

export function receiveSchools(districtId, json) {
	//append this to district schools list
	return {
		type: RECEIVE_SCHOOLS,
		district: json,
		receivedAt: Date.now()
	};
}

export function fetchSchools(districtId) {
	return function (dispatch) {
		dispatch(requestSchools(districtId));
		return fetch(`http://localhost:8100/district/${districtId}/demography`)
			.then(response => response.json())
			.then(json => {
				debugger
				dispatch(receiveSchools(districtId, json))
			});
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
				dispatch(receiveDistricts(geoState, json));
				for (var i = 0; i < json.length; i++) {
 					dispatch(fetchSchools(json[i].id));
				};
			});
	}
}

