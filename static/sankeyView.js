$(document).ready(function() {
	var nodes = [{name: "San Francisco"}];
	var testLinks = [];
	var testNodes = [{name: "San Francisco"}];

	var activitiesDfD =  $.ajax({
		url: "http://localhost:8080/district/1/activities",
		type: "GET",
		dataType: "json"
	});

	$.when(activitiesDfD).then(function(data, textStatus, jqXhr) {
			var total = 0;
			var activityCodes = []; 
			for(var i = 0; i < data.length; i++) {
				var expenditure = data[i].Expenditure;
				expenditure = parseFloat(expenditure);
				total += expenditure;
				if (expenditure === 0) {
					expenditure = 1;
				}
				nodes.push({name: data[i].Name});
				testNodes.push({name: data[i].Name});
				testLinks.push({source: 0, target: i + 1, value: expenditure});
				// links.push({source: 0, target: i + 1, value: expenditure});
				activityCodes.push(data[i].Code);
			}
			var expenseCodes = [];

			var subActivitiesDfds = [];
			var subActivitiesCodes = [];

			for (var i = 0; i < activityCodes.length; i++) {
				var addSubActivities = function(parentId) {
					return function(data) {
						if (data) {
							for (var i = 0; i < data.length; i++) {
								testNodes.push({name: data[i].Name});
								var expenditure = data[i].Expenditure;
								expenditure = parseFloat(expenditure);
								if (expenditure === 0) {
									expenditure = 1;
								}
								subActivitiesCodes.push(data[i].Code);
								// links.push({source: parentId, target: nodes.length - 1, value: data[i].Expenditure});
								testLinks.push({source: parentId, target: testNodes.length - 1, value: expenditure});
							}
						}
					}
				}
				var dfd = $.getJSON("http://localhost:8080/district/1/activities/" + activityCodes[i] + "/subActivities", addSubActivities(i));
				subActivitiesDfds.push(dfd);
			}


			$.when.apply($, subActivitiesDfds).done(function(data, textStatus, jqXhr){
				var expensesDfds = [];
				for (var i = 0; i < subActivitiesCodes.length; i++) {
					var addExpenses = function(parentId) {
						return function(data) {
							if (data) {
								for (var i = 0; i < data.length; i++) {
									testNodes.push({name: data[i].Name});
									var expenditure = data[i].RestrictedExpenditure;

									expenditure = parseFloat(expenditure);

									if (expenditure === 0) {
										expenditure = 1;
									}
									// links.push({source: parentId, target: nodes.length - 1, value: data[i].Expenditure});
									testLinks.push({source: parentId, target: testNodes.length - 1, value: expenditure});
								}
							}
						}
					}
					var dfd = $.getJSON("http://localhost:8080/district/1/subActivities/" + subActivitiesCodes[i] + "/expenses", addExpenses(i));
					expensesDfds.push(dfd);
				}
				$.when.apply($, expensesDfds).then(function(data, textStatus, jqXhr){
					// console.log("NODES");
					// console.log(testNodes);
					// console.log("LINKS");
					// console.log(testLinks);
					// debugger
				  var margin = {top: 1, right: 1, bottom: 6, left: 1};
				  var width = 5000 - margin.left - margin.right;
				  var height = 15000 - margin.top - margin.bottom;
				  var color = d3.scale.category20();
					var svg = d3.select("#chart").append("svg")
						.attr({
							width: width + margin.left + margin.right,
							height: height + margin.top + margin.bottom
						})
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					var sankey = d3.sankey()
						.nodeWidth(30)
						.nodePadding(10)
						.size([width, height])
						.nodes(testNodes)
						.links(testLinks)
						.layout(32);

					var path = sankey.link();
					var linkSvg = svg.append("g").selectAll(".link")
						.data(testLinks)
						.enter()
						.append("path")
						.attr({
							"class": "link",
							d: path
						})
						.style("stroke-width", function(d) {
							return Math.max(10, d.dy);
						});

					linkSvg.append("title")
						.text(function(d) {
							return d.source.name + " to " + d.target.name + " = " + d.value;
						});

					var nodes = svg.append("g").selectAll(".node")
						.data(testNodes)
						.enter()
						.append("g")
						.attr({
							"class": "node",
							transform: function(d) {
								return "translate(" + d.x + "," + d.y + ")";
							}
						})
						.call(d3.behavior.drag()
							.origin(function(d) {return d; })
							.on("dragstart", function() {
								this.parentNode.appendChild(this); 
							})
							.on("drag", dragmove));
					  function dragmove(d) {
					    d3.select(this).attr("transform", 
					        "translate(" + d.x + "," + (
					                d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
					            ) + ")");
					    sankey.relayout();
					    linkSvg.attr("d", path);
					  }
					nodes.append("rect")
						.attr({
							height: function(d) {
								return d.dy;
							},
							width: sankey.nodeWidth()
						})
						.style({
							fill: function(d) {
				            	return d.color = color(d.name.replace(/ .*/, ""));
							},
							stroke: function(d) {
								return d3.rgb(d.color).darker(2);
							}
						})
						.append("title")
						.text(function(d) {
							return d.name;
						})
						.on("click", )

					nodes.append("text")
						.attr({
							x: sankey.nodeWidth()/2,
							y: function(d) {
								return d.dy/2;
							},
							dy: ".15em",
							"text-anchor": "middle",
							transform: null
						})
						.text(function(d) {
							return d.name;
						});

					function clicked(d) {
						x.domain([d.x, d.x + d.dx]);
						y.domain([d.y, 1]).range([d.y ? 20 : 0, height]);

						rect.transition()
							.duration(750)
							.attr("x", function(d) { return x(d.x); })
							.attr("y", function(d) { return y(d.y);})
							.attr("width", function(d) { return x(d.x + d.dx) - x(d.x);})
							.attr("height", function(d) { return y(d.y + dy.dy) - y(d.y); });
					}
				});
			});

	});
});