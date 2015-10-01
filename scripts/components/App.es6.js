import React from 'react';
import Component from 'react';
import Bar from './Bar.es6.js';
import Chart from './Chart.es6.js';
import { connect } from 'react-redux';
export default class App extends Component {
	render() {
		debugger
		return (
			<div class="app">
				<Chart width={this.props.width}
					height={this.props.height}>
				<Bar data={this.state.data}
					width={this.props.width}
					height={this.props.height}>
				</Bar>
				</Chart>
			</div>
		);
	}
};

function select(state) {
	return state;
}

export default connect(select)(App);
