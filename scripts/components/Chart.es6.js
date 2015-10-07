import React from 'react';

export default class Chart extends React.Component {
	render() {
		return (
			<svg width={this.props.width} 
				height={this.props.height}>
				{this.props.children}
			</svg>
		);
	}
};