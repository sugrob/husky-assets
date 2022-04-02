AppMap = {
	prefix: "__app_map__",

	add: function(eventAccessPoint, app) {
		RuntimeStorage.set(this.prefix+'.'+eventAccessPoint.getContextId(), app);
	},

	get: function(eventAccessPoint) {
		return RuntimeStorage.get(this.prefix+'.'+eventAccessPoint.getContextId());
	}
}