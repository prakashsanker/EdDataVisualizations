/*
 * Action types
 */

export const REQUEST_DISTRICTS = 'REQUEST_DISTRICTS';

export function requestDistricts(state) {
	return {
		type: REQUEST_DISTRICTS,
		state
	};
}

export const RECEIVE_DISTRICTS = 'RECEIVE_DISTRICTS';

export function receiveDistricts(state, json) {
	return {
		type: RECEIVE_DISTRICTS,
		state,
		receivedAt: Date.now(),
		districts: json.data.districts.map(district => district.data)
	}
}



