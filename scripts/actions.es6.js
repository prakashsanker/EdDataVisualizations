/*
 * Action types
 */
import fetch from 'isomorphic-fetch';

export const REQUEST_DEMOGRAPHIES = 'REQUEST_DEMOGRAPHIES';

export function requestDemographies(geoState) {
	return {
		type: REQUEST_DEMOGRAPHIES,
		geoState
	}
};

export const RECEIVE_DEMOGRAPHIES = 'RECEIVE_DEMOGRAPHIES';

export function receiveDemographies(geoState, json) {
	//go through each district and add school data
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

