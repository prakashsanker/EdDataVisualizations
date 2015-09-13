/*
 * Action types
 */

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
		districts: json.data.districts.map(district => district.data)
	}
}