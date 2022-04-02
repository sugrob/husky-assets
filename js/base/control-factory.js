ControlFactory = {
	prefix: "__control_factory",

	add: function(type, className) {
		RuntimeStorage.set(this.prefix+'.'+type, className);
	},

	spawn(type, configuration) {
		var className = RuntimeStorage.get(this.prefix+'.'+type);
		return new className(configuration);
	}
}