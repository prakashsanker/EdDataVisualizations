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
		var counter = 0;

		var addExpenses = function(parent) {
			return function(data) {
				if (data) {
					for (var i = 0; i < data.length; i++) {
						var expenditure = data[i].RestrictedExpenditure;
						expenditure = parseFloat(expenditure);
						var child = {level: 4, name: data[i].Name, size: expenditure, children: []};
						// parent.children.push(child);
						counter++;
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
						if (expenditure < 0) {
							expenditure = -expenditure;
						}
						var child = {level: 3, name: data[i].Name, size: expenditure, children: []};
						parent.children.push(child);
						subActivitiesDfds.push($.getJSON("http://localhost:8080/district/1/subActivities/" + data[i].Code + "/expenses", addExpenses(child)));
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

			subActivitiesDfds.push($.getJSON("http://localhost:8080/district/1/activities/" + data[i].Code + "/subActivities", addSubActivities(child)));
			// subActivitiesDfds.push(dfd);
		}
		root.size = total;


		$.when.apply($, subActivitiesDfds).done(function() {
			var labelIndex = 0;
			var labelMap = {};
			var lowestY = 0;
			var width = 960,
				height = 500;
			var x = d3.scale.linear()
				.range([0, width]);
			var y = d3.scale.linear()
				.range([0, height]);

			var partition = d3.layout.partition()
				.value(function(d) { 
				return d.size;});

			var nodes = partition.nodes(root);

			var dummySVG = d3.select("#chart").append("svg");

			dummySVG.selectAll('.label')
				.data(nodes) 
				.enter().append("text")
				.attr("class","label")
				.attr("dy", ".35em")
				.attr("transform", function(d) {
					return "translate(" + x(d.x + d.dx/2) + "," + (y(d.y) + 20) + ") rotate(90)";
				})
				.text(function(d) {return d.name})
				.each(function(d,i){
					labelMap[labelIndex] = this.getComputedTextLength();
					var currentY = y(d.dy) + 20  + this.getComputedTextLength()
					if ( currentY > lowestY) {
						lowestY = currentY;
					}
				});

				var rectIndex = 0;
				var rectMap = {};
				var rect = dummySVG.selectAll(".node")
					.data(nodes)
					.enter().append("rect")
					.attr("class", "node")
				    .attr("x", function(d) { 
				    	return x(d.x); })
				    .attr("y", function(d) { 
				    	return y(d.y); })
				    .attr("width", function(d) { 
				    	return x(d.dx); })
				    .attr("height", function(d) { 
				    	return y(d.dy); })
				    .each(function(d,i) {
				    	rectMap[i] = y(d.y) + y(d.dy);
				    	if (rectMap[i] > lowestY) {
				    		lowestY = rectMap[i];
				    	}
				   	});


				d3.select("#chart").empty();

				height = lowestY + 100;

				y = d3.scale.linear().range([0, height]);

				var svg = d3.select("#chart").append("svg")
				.attr("width", width)
				.attr("height", height);

				var color = d3.scale.category20();


				var rect = svg.selectAll(".node")
					.data(nodes)
					.enter().append("rect")
					.attr("class", "node")
				    .attr("x", function(d) { 
				    	return x(d.x); })
				    .attr("y", function(d) { 
				    	return y(d.y); })
				    .attr("width", function(d) { 
				    	return x(d.dx); })
				    .attr("height", function(d,i) { 
				    	if (y(labelMap[i])  > y(d.dy)) {
				    		debugger
				    		return y(labelMap[i]);
				    	} else {
							return y(d.dy);
				    	}})
				    .style("fill", function(d) { 
				    	return color(d.level); 
				    })
				    .on("click", clicked);






			var labels = svg.selectAll(".label")
				.data(nodes.filter(function(d) { return x(d.dx) > 6;}))
				.enter().append("text")
				.attr("class","label")
				.attr("dy", ".35em")
				.attr("transform", function(d) {
					return "translate(" + x(d.x + d.dx/2) + "," + (y(d.y)) + ") rotate(90)";
				})
				.text(function(d) {return d.name});
				// .each(function(d, i) {
				// 	var that = this;

				// 	var rect = rectLabelMapping[i];
				// 	var difference = (y(d.y) + 20  + this.getComputedTextLength()) - (rect.getBBox().y + rect.getBBox().height)
				// 		console.log(difference);

				// 	if(difference > 0) {
				// 		d3.select(rect).attr('height', y(d.dy + difference + 10));
				// 	}
				// });

				// var test = svg.selectAll(".label");


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
	});
});