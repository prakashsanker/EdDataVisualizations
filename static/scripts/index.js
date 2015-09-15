'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _redux = require('redux');

var _actionsJs = require('actions.js');

var _reducersJs = require('reducers.js');

var _reducersJs2 = _interopRequireDefault(_reducersJs);

var logger = (0, _reduxLogger2['default'])({
	level: 'info',
	collapsed: true,
	predicate: function predicate(getState, action) {
		action.type;
	}
});

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2['default'], logger)(_redux.createStore);

var store = createStoreWithMiddleware(_reducersJs2['default']);

store.dispatch((0, _actionsJs.fetchDistricts)('California')).then(function () {
	console.log(store.getState());
});
//# sourceMappingURL=index.js.map
