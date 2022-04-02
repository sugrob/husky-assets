HandlersMap = {
	prefix: "__handlers_map__",

	add: function(eventAccessPoint, namespace, handler) {
		RuntimeStorage.set(this.prefix+'.'+eventAccessPoint.getContextId()+'.'+namespace, handler);
	},

	updateContextId(oldContextId, newContextId) {
		var search = this.prefix+'.'+oldContextId+'.';
		var replace = this.prefix+'.'+newContextId+'.';

		$.each(RuntimeStorage.getInstance(), function(key, handler) {
			if (key.substr(0, search.length) === search) {
				RuntimeStorage.remove(key);
				RuntimeStorage.set(replace+key.substr(search.length), handler);
			}
		}.bind(this));
	},

	call: function(eventAccessPoint, namespace, e) {
		RuntimeStorage.get(this.prefix+'.'+eventAccessPoint.getContextId()+'.'+namespace)(e, eventAccessPoint);
	}
}