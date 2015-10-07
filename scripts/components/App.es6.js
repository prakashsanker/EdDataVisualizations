import React from 'react';
import Bar from './Bar.es6.js';
import Chart from './Chart.es6.js';
import { connect } from 'react-redux';
import { fetchDistricts, fetchSchools } from '../actions.es6.js';


class App extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		var props = this.props;
		dispatch(fetchDistricts('California'));
	}

	render() {
		return (
			<div class="app">
				<Chart width={this.props.width}
					height={this.props.height}>
				<Bar data={this.props}
					width={this.props.width}
					height={this.props.height} />
				</Chart>
			</div>
		);
	}
};

App.defaultProps = { width: 10000, height: 1000};

App.propTypes = {
	dispatch: React.PropTypes.func.isRequired,
	lastUpdated: React.PropTypes.number,
	width: React.PropTypes.number,
	height: React.PropTypes.number
};

function select(state) {
	return state;
}

export default connect(select)(App);
