$(document).ready(function() {
	var root = {level: 1, name: "San Francisco Budget", children: []};
	var activitiesDfD =  $.ajax({
		url: "http://localhost:8080/district/1/activities",
		type: "GET",
		dataType: "json"
	});

	$.when(activitiesDfD).then(function(data, textStatus, jqXhr) {
		var total = 0;
		var activityCodes = [];
		var expenseCodes = [];
		var subActivitiesDfds = [];
		var subActivitiesCodes = [];
		var expenseDfds = [];

		var addExpenses = function(parent) {
			return function(data) {
				if (data) {
					for (var i = 0; i < data.length; i++) {
						var expenditure = data[i].RestrictedExpenditure;
						expenditure = parseFloat(expenditure);
						var child = {level: 4, name: data[i].Name, size: expenditure, children: []};
						parent.children.push(child);
					}
				}
			}
		}
		var addSubActivities = function(parent) {
			return function(data) {
				if (data) {
					for (var i = 0; i < data.length; i++) {
						var expenditure = data[i].Expenditure;
						expenditure = parseFloat(expenditure);
						var child = {level: 3, name: data[i].Name, size: expenditure, children: []};
						parent.children.push(child);
						var dfd = $.getJSON("http://localhost:8080/district/1/subActivities/" + data[i].Code + "/expenses", addExpenses(child));
						subActivitiesDfds.push(dfd);
					}
				}
			}
		}

		for (var i = 0; i < data.length; i++) {
			var expenditure = data[i].Expenditure;
			expenditure = parseFloat(expenditure);
			total += expenditure;
			var child = {level: 2, name: data[i].Name, size: expenditure, children: []};
			root.children.push(child);

			var dfd = $.getJSON("http://localhost:8080/district/1/activities/" + data[i].Code + "/subActivities", addSubActivities(child));
			subActivitiesDfds.push(dfd);
		}
		root.size = total;


		$.when.apply($, subActivitiesDfds).done(function(data, textStatus, jqXhr) {
			var width = 960,
				height = 500;

			var x = d3.scale.linear()
				.range([0, width - 200]);
			var y = d3.scale.linear()
				.range([0, height]);
			var color = d3.scale.category20();

			var partition = d3.layout.partition()
				.size([width, height])
				.value(function(d) { return d.size;});

			var nodes = partition.nodes(root);


			var svg = d3.select("#chart").append("svg")
				.attr("width", width)
				.attr("height", height);

			svg.selectAll(".node")
				.data(nodes)
				.enter().append("rect")
				.attr("class", "node")
			    .attr("x", function(d) { return d.x; })
			    .attr("y", function(d) { return d.y; })
			    .attr("width", function(d) { return d.dx; })
			    .attr("height", function(d) { return d.dy; })
			    .style("fill", function(d) { 
			    	var test = (d.children ? d : d.parent).name;
			    	console.log(test);
			    	console.log(color(test));
			    	console.log('====');
			    	return color(d.level); 
			    });
		});



		// debugger




		// var rect = svg.selectAll("rect");

		// rect = rect.data(partition(d3.entries(root)))
		// 	.enter().append("rect")
		// 	.attr("x", function(d) { return x(d.x);})
		// 	.attr("y", function(d) { return y(d.y);})
		// 	.attr("width", function(d) { return x(d.dx);})
		// 	.attr("height", function(d) { return y(d.dy);})
		// 	.attr("fill", function(d) { return color((d.children ? d : d.parent).key);})
		// 	.on("click", clicked);
	});

	function clicked(d) {
		x.domain([d.x, d.x + d.dx]);
		y.domain([d.y, 1]).range([d.y ? 20 : 0, height]);
		rect.transition()
			.duration(750)
			.attr("x", function(d) { return x(d.x); })
			.attr("y", function(d) { return y (d.y);})
			.attr("width", function(d) { return x(d.x + d.dx) - x(d.x);})
			.attr("height", function(d) { return y(d.y + d.dy) - y(d.y);});
	}


});