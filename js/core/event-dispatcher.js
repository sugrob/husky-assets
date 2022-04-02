EventDispatcher = {
	prefix: "__event_dispatcher__",

	subscribe: function(eventAccessPoint, namespace, handler, handlerName) {
		var eventName = this.makeEventName(eventAccessPoint, namespace);

		var subscribers = RuntimeStorage.has(eventName)
			? RuntimeStorage.get(eventName)
			: {};

		if (typeof handlerName == "undefined"
			|| subscribers.hasOwnProperty(handlerName)
		) {
			handlerName = Math.random().toString().substr(2, 10);
		}

		if (handler instanceof AppHandler) {
			subscribers[handlerName] = function (evendData){
				handler.run(evendData);
			};
		} else {
			subscribers[handlerName] = handler;
		}

		RuntimeStorage.set(eventName, subscribers);

		return handlerName;
	},

	unsubscribe: function(eventAccessPoint, namespace, handlerName) {
		var eventName = this.makeEventName(eventAccessPoint, namespace);

		if (RuntimeStorage.has(eventName)) {
			var subscribers = RuntimeStorage.get(eventName);

			if (subscribers.hasOwnProperty(handlerName)) {
				delete subscribers[handlerName];
				RuntimeStorage.set(eventName, subscribers);

				return true;
			}
		}

		return false;
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

	call: function(eventAccessPoint, namespace, e, context) {
		e.preventDefault();

		var eventName = this.makeEventName(eventAccessPoint, namespace);

		if (RuntimeStorage.has(eventName)) {
			var subscribers = RuntimeStorage.get(eventName);
			for (var handlerName in subscribers) {
				subscribers[handlerName]({
					"eventName":namespace,
					"event": e,
					"handlerName": handlerName,
					"eventAccessPoint": eventAccessPoint,
					"context": context
				});
			}
		}
	},

	makeEventName: function(eventAccessPoint, namespace) {
		return this.prefix+'.'+eventAccessPoint.getContextId()+'.'+namespace;
	}
}