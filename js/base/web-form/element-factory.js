ElementFactory = {
	prefix: "__form_element_factory",

	add: function(viewerName, className) {
		RuntimeStorage.set(this.prefix+'.'+viewerName, className);
	},

	spawn(viewerName, configuration) {
		var className = RuntimeStorage.get(this.prefix+'.'+viewerName);
		return new className(configuration);
	}
}