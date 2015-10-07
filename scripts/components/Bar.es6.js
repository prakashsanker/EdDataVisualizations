import React from 'react';
import {Component} from 'react'; 

export default class Bar extends React.Component {

	constructor (props) {
		super(props);
	}

	shouldComponentUpdate(nextProps) {
		var currentDistrictsByState = this.props.data.districtsByState.California;
		var nextDistrictsByState = nextProps.data.districtsByState.California;
		var currentSchools = this.props.data.schoolsByDistrict;
		var nextSchools = nextProps.data.schoolsByDistrict;
		var fetchindDistricts = false;
		var currentDistrictsIsFetching, nextDistrictsIsFetching, currentSchoolsIsFetching, nextSchoolsIsFetching;

		if (typeof currentDistrictsByState === "undefined") {
			currentDistrictsIsFetching = false;
		} else {
			currentDistrictsIsFetching = true;
		}

		if (typeof nextDistrictsByState === "undefined") {
			nextDistrictsIsFetching = false;
		} else {
			nextDistrictsIsFetching = true;
		}

		if (currentDistrictsIsFetching=== true && nextDistrictsIsFetching === false) {
			console.log("return true");
			return true;
		} else if (currentSchools.isFetching === true && nextSchools.isFetching === false) {
			console.log("return true");
			return true; 
		}
		console.log("return false");
		return false;
	}

	render() {
		let props = this.props;
		let districtData = this.props.data.districtsByState;
		if (Object.keys(districtData).length === 0) {
			var data = [];
		} else {
			var data = districtData.California.districts.map((d) =>
				{
					return d.expenditure;
				}
			);

		}

		let yScale = d3.scale.linear()
			.domain([0, d3.max(data)])
			.range([0, this.props.height]);

		let xScale = d3.scale.ordinal()
			.domain(d3.range(this.props.data.length))
			.rangeRoundBands([0, this.props.width], 0.05);
		let bars = data.map((point, i) => {
			var height = yScale(point),
			y = props.height - height,
			width = xScale.rangeBand(),
			x = xScale(i);

			return (
				<Rect height={height}
					width={width}
					x={x}
					y={y}
					key={i}>
				</Rect>
			);
		});

	return (
		<g>{bars}</g>
	);
	}
};

class Rect extends React.Component {
	shouldComponentUpdate(nextProps) {
		return this.props.height !== nextProps.height;
	}

	render() {
		return (
			<rect className="bar"
				height={this.props.height}
				y={this.props.y}
				width={this.props.width}
				x={this.props.x}
			>
			</rect>
		);
	}
};

Rect.defaultProps = {width: 0, height: 0, x: 0, y:0};