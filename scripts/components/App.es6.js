import React from 'react';
import Bar from './Bar.es6.js';
import Chart from './Chart.es6.js';
import { connect } from 'react-redux';
import { fetchDistricts, fetchSchools } from '../actions.es6.js';


class App extends React.Component {

	getDefaultProps() {
		return {
          width: 500,
          height: 500
        };
	}

	componentDidMount() {
		const { dispatch } = this.props;
		var props = this.props;
		dispatch(fetchDistricts('California')).then(state => {
			debugger
			var districts = props.districtsByState['California'].districts;
			var schoolsRequestPromises = [];
			for(var i = 0; i < districts.length; i++) {
 				schoolsRequestPromises.push(store.dispatch(fetchSchools(districts[i].id)));
 			}
		});
	}

	render() {
		return (
			<div class="app">
				<Chart width={this.props.width}
					height={this.props.height}>
				<Bar data={this.state}
					width={this.props.width}
					height={this.props.height}>
				</Bar>
				</Chart>
			</div>
		);
	}
};

App.propTypes = {
	dispatch: React.PropTypes.func.isRequired,
	isFetching: React.PropTypes.bool.isRequired,
	lastUpdated: React.PropTypes.number,
	width: React.PropTypes.number,
	height: React.PropTypes.number
};

function select(state) {
	return state;
}

export default connect(select)(App);
