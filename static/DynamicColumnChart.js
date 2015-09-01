Backbone.View.extend({
	className: 'dynamic-bar-chart',

	initialize: function(options) {
		this.model = options.model;
		this.model.listenTo('change', this.render);
		return this;
	},

	render: function() {
		
		return this;
	}
});