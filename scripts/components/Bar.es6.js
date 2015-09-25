import React, { Component } from 'react';

export class Bar extends Component {
	getDefaultProps() {
		return {
			data: []
		}
	}

	shouldComponentUpdate(nextProps) {
		return this.props.data !== nextProps.data;
	}

	render() {
		let props = this.props;
		let data = props.data.map((d) =>
			{
				return d.y;
			}
		);

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
					key={i} />
			)
		});
	}
	return (
		<g>{bars}</g>
	);
};

export class Rect extends Component {
	getDefaultProps() {
		return {
			width: 0,
			height: 0,
			x: 0,
			y: 0
		}
	}

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