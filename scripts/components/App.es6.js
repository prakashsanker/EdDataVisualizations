import React, { Component } from 'react';

export default class App extends Component {
	getDefaultProps() {
		return {
			width: 500,
			height: 500
		}
	}

	render() {
		return (
			<div class="app">
				<Chart width={this.props.width}
					height={this.props.height}>
				<Bar data={this.state.data}
					width={this.props.width}
					height={this.props.height}/>
				</Chart>
			</div>
		)
	}
};