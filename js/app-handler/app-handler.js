class AppHandler {
	constructor() {
		/* do nothing here */
	}

	/*
	Description of eventData properties
	 {
	  "eventName":String,
	  "event": Event,
	  "handlerName": String,
	  "eventAccessPoint": Instance of EventAccessPoint
	 }
	 */
	/* abstract */ run(eventData) {
		/* user defined business logic here */
		console.error("You forgot to define method run() of your handler");
	}

	__isEvendDataIdentifiable(eventData) {
		return eventData.hasOwnProperty("context")
			&& eventData.context.hasOwnProperty("identifier")
			&& eventData.context.identifier instanceof ObjectIdentifier;
	}

	__isEvendDataCompletelyIdentified(eventData) {
		return this.__isEvendDataIdentifiable(eventData)
			&& eventData.context.identifier.isNotEmpty();
	}

	__assertStateIsProper(state) {
		if (typeof state !== "object"
			&& !state instanceof State
		) {
			throw "Argument 'state' must be instance of State";
		}
	}

	__isStateDataIdentifiable(state) {
		this.__assertStateIsProper(state);
		var data = state.current().data;
		return data.hasOwnProperty("subject");
	}

	__isStateDataCompletelyIdentified(state) {
		var data = state.current().data;

		if (data.hasOwnProperty("subject")
			&& data.hasOwnProperty("identifier")
		) {
			try {
				var oid = new ObjectIdentifier(data.subject, data.identifier);
				return oid.isNotEmpty();
			} catch (e) {
				console.error("Wrong state data. At least subject expected.");
			}
		}

		return false;
	}
}