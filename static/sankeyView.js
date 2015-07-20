$(document).ready(function() {
	var nodes = [];
	var links = [];

	$.ajax({
		url: "http://localhost:8080/district/1/activities",
		type: "GET",
		dataType: "json", 
		success: function(data) {
			var total = 0;
			var activityCodes = []; 
			for(var i = 0; i < data.length; i++) {
				var expenditure = data[i].Expenditure;
				expenditure = parseFloat(expenditure);
				total += expenditure;
				nodes.push({name: data[i].Name});
				activityCodes.push(data[i].Code);
			}
			var expenseCodes = [];

			for (var i = 0; i < activityCodes.length; i++) {

				$.ajax({
					url: "http://localhost:8080/district/1/activities/" + activityCodes[i] + "/subActivities",
					type: "GET",
					dataType: "json",
					success: function(data) {
						for (var k = 0; k < data.length; k++) {
							nodes.push({name: data[i].Name});
							$.ajax({
								url: "http://localhost:8080/district/1/subActivities/" + data[i].Code + "/expenses",
								type: "GET",
								dataType: "json"
							})							
						}

					},

					error: function(xhr, status, errorThrown) {
						console.log(status);
					}


				})
			}
		},

		error: function(xhr, status, errorThrown) {
			console.log(status);
		}
	});
});