class ListDropItemHandler extends ListReloadHandler {
	constructor() {
		super();
	}

	run(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		var list = app.getView("list");
		var state = app.getState();
		var currentState = state.current();

		if (this.__isEvendDataCompletelyIdentified(eventData)) {
			var options = {
				action: "drop",
				subject: eventData.context.identifier.subject,
				id: eventData.context.identifier.id
			}

			if (currentState.hasOwnProperty("data")
				&& currentState.data.hasOwnProperty("subject")
				&& currentState.data.hasOwnProperty("views")
				&& currentState.data.views.hasOwnProperty("list")
			) {
				jQuery.extend(options, currentState.data.views.list);
			}

			this._get(
				options,
				function(response) {
					this.__updateList(list, response);
					onComplete(eventData, iterationNumber);
				}.bind(this)
			);
		} else {
			// console.log(state.current())
			throw ("ListDropItemHandler: can't get event data, or event data is incomplete");
		}
	}

	rollback(eventData, iterationNumber, onComplete) {
		onComplete(eventData, iterationNumber);
	}
}