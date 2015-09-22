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

export function fetchDistricts(geoState) {

	return function (dispatch) {
		dispatch(requestDistricts(geoState));
		var districtsDfd = $.ajax({
			url: "http://localhost:8080/districts/",
			type: "GET",
			dataType: "json"
		});
		var demographiesDfd = [];
		$.when(districtsDfd).then(function(data, textStatus, jqXhr){
			if (data) {
				_.each(data, datum => { 
						let id = datum.id;
						demographiesDfd.push($.getJSON("http://localhost:8080/district/${id}/demography"));
					}
				);
			}
		});
		$.when(...demographiesDfd).done(result => {
				//so I have demographic data right now. 
				dispatch(receiveDistricts(geoState, result));
			}
		);
	}
}

