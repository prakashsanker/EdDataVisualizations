import React from 'react';

export default class Bar extends React.Component {

	constructor (props) {
		super(props);
		debugger
	}
	shouldComponentUpdate(nextProps) {
		debugger
		return this.props.data !== nextProps.data;
	}

	render() {
		debugger
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
		debugger
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