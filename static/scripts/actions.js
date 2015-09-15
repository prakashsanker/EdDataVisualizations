/*
 * Action types
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.requestDistricts = requestDistricts;
exports.receiveDistricts = receiveDistricts;
exports.fetchDistricts = fetchDistricts;
var REQUEST_DISTRICTS = 'REQUEST_DISTRICTS';

exports.REQUEST_DISTRICTS = REQUEST_DISTRICTS;

function requestDistricts(geoState) {
	return {
		type: REQUEST_DISTRICTS,
		geoState: geoState
	};
}

var RECEIVE_DISTRICTS = 'RECEIVE_DISTRICTS';

exports.RECEIVE_DISTRICTS = RECEIVE_DISTRICTS;

function receiveDistricts(geoState, json) {
	return {
		type: RECEIVE_DISTRICTS,
		geoState: geoState,
		receivedAt: Date.now(),
		districts: json.data.districts.map(function (district) {
			return district.data;
		})
	};
}

function fetchDistricts(geoState) {

	return function (dispatch) {
		var _$;

		dispatch(requestDistricts(geoState));
		var districtsDfd = $.ajax({
			url: "http://localhost:8080/districts/",
			type: "GET",
			dataType: "json"
		});
		var demographiesDfd = [];
		$.when(districtsDfd).then(function (data, textStatus, jqXhr) {
			if (data) {
				_.each(data, function (datum) {
					var id = datum.id;
					demographiesDfd.push($.getJSON("http://localhost:8080/district/${id}/demography"));
				});
			}
		});
		(_$ = $).when.apply(_$, demographiesDfd).done(function (result) {
			//so I have demographic data right now.
			dispatch(receiveDistricts(geoState, result));
		});
	};
}
//# sourceMappingURL=actions.js.map
