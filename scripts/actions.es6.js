/*
 * Action types
 */
import fetch from 'isomorphic-fetch';

export const REQUEST_DISTRICTS = 'REQUEST_DISTRICTS';

export function requestDistricts(geoState) {
	return {
		type: REQUEST_DISTRICTS,
		geoState
	};
}

export const RECEIVE_DISTRICTS = 'RECEIVE_DISTRICTS';

export function receiveDistricts(geoState, json) {
	console.log(json);
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
			url: "http://localhost:8100/districts/",
			type: "GET",
			dataType: "jsonp"
		});
		var demographiesDfd = [];

		return fetch(`https://localhost:8100/districts/`)
			.then(response => {console.log(response);})
			.then(json => {
				console.log("json");
			});
		// $.when(districtsDfd).then(function(data, textStatus, jqXhr){
		// 	console.log("first data");
		// 	console.log(data);
		// 	if (data) {
		// 		_.each(data, datum => { 
		// 				let id = datum.id;
		// 				demographiesDfd.push($.getJSON("http://localhost:8100/district/${id}/demography"));
		// 			}
		// 		);
		// 		console.log("demographies dfd");
		// 		console.log(demographiesDfd);
		// 		$.when(...demographiesDfd).done(result => {
		// 				//so I have demographic data right now. 
		// 				dispatch(receiveDistricts(geoState, result));
		// 			}
		// 		);
		// 	}
		// });
	}
}

