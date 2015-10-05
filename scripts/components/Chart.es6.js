import React from 'react';

export default class Chart extends React.Component {
	render() {
		debugger
		return (
			<svg width={this.props.width} 
				height={this.props.height}>
				{this.props.children}
			</svg>
		);
	}
};