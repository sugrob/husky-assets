class History {
	constructor(eventAccessPoint, options) {
		this.eventAccessPoint = eventAccessPoint;
		window.onpopstate = this.__onpopstateHandler.bind(this);

		this.options = Object.assign({
			onpopstateeventname: "historyOnPopState",
		}, options);
	}

	push(state) {
		window.history.pushState(state.current, '', this.__stateToURL(state.data));
	}

	replace(state) {
		window.history.replaceState(state.current, '', this.__stateToURL(state.data));
	}

	__stateToURL(stateData) {
		var urlOptions = {};

		urlOptions.subject = (stateData.hasOwnProperty("subject")) ? stateData.subject : "";
		urlOptions.id = (stateData.hasOwnProperty("identifier")) ? stateData.identifier : "";
		urlOptions.action = (stateData.hasOwnProperty("action")) ? stateData.action : "";
		return '?'+ new URLSearchParams(urlOptions).toString();
	}

	__onpopstateHandler(e) {
		e.preventDefault();

		if (typeof e.state == "string") {
			var app = AppMap.get(this.eventAccessPoint);
			var currentState = app.getState().getByUID(e.state);

			if (this.__isStateConsistent(currentState)) {
				var stateData = currentState.data;

				var identifier = new ObjectIdentifier(stateData.subject);

				if (stateData.hasOwnProperty("identifier")
					&& typeof stateData.identifier != "undefined"
					&& stateData.identifier != null
				) {
					identifier.setId(stateData.identifier);
					stateData.identifier = identifier;
				}

				EventDispatcher.call(
					this.eventAccessPoint,
					stateData.restoreStateEventName,
					e,
					stateData
				);

				if (this.options.hasOwnProperty("onpopstateeventname")) {
					EventDispatcher.call(
						this.eventAccessPoint,
						this.options.onpopstateeventname,
						e,
						currentState
					);
				}
			}
		}
	}

	__isStateConsistent(state) {
		return typeof state == "object"
			&& state !== null
			&& state.hasOwnProperty("data")
			&& state.data.hasOwnProperty("restoreStateEventName")
			&& typeof state.data.restoreStateEventName == "string"
			&& state.data.restoreStateEventName.length > 0
			&& state.data.hasOwnProperty("subject")
			&& typeof state.data.subject == "string"
			&& state.data.subject.length > 0;
	}
}