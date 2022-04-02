HandlerFactory = {
	prefix: "__handler_factory",

	add: function(handlerName, className) {
		RuntimeStorage.set(this.prefix+'.'+handlerName, className);
	},

	spawn(handlerName) {
		if (RuntimeStorage.has(this.prefix+'.'+handlerName)) {
			var className = RuntimeStorage.get(this.prefix+'.'+handlerName);
			return new className();
		}

		const constructor = new Function('','return new '+handlerName+'();');
		return constructor();
	}
}