Backbone.View.extend({
	
	constructor: function(options) {
		this.options = options || {};
		this.children = [];
	},

	initialize: function() {
		return this;
	},

	render: function() {
		this.invokeOnChildren("render");
		return this;
	},

	remove: function() {
		this.$el.remove();
		this.invokeOnChildren('remove');
	},

	invokeOnChildren: function(methodName) {
		var args = Array.prototype.slice.call(arguments);
		for(var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			var childMethod = child[methodName];
			if (_.isFunction(childMethod)) {
				childMethod.call(child, args);
			}
		}
		return this;
	},

	reflow: function() {
		this.invokeOnChildren("reflow");
		return this;
	}

	parent: function() {
		return this.$el.parent();
	}
});