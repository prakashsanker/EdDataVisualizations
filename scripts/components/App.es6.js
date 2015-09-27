import React, { Component } from 'react';
import Bar from './Bar.es6.js';
import Chart from './Chart.es6.js';
import { connect } from 'react-redux';
import { thunk } from 'redux-thunk';

export default class App extends Component {
	getDefaultProps() {
		return {
			width: 500,
			height: 500
		}
	}

	render() {
		debugger
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

