import React, { Component } from 'react';
import Bar from './components/Bar.es6.js';
import Chart from './components/Chart.es6.js';

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
}
