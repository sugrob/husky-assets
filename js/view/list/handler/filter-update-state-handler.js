class FilterUpdateStateHandler extends AjaxTransactionChainHandler {
	constructor() {
		super();
	}

	run(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		var list = app.getView("list");
		var state = app.getState();
		var currentState = state.current();

		if (currentState.hasOwnProperty("data")
			&& currentState.data.hasOwnProperty("subject")
			&& currentState.data.hasOwnProperty("views")
			&& currentState.data.views.hasOwnProperty("list")
		) {
			var filter = JSON.stringify(list.filter.export());
			currentState.data.views.list.filter = filter;
			currentState.data.restoreStateEventName = "list.restoreState";
			state.push(currentState.data, true);

			onComplete(eventData, iterationNumber);
		} else {
			throw ("FilterUpdateStateHandler: can't get state data");
		}
	}

	rollback(eventData, iterationNumber, onComplete) {
		onComplete(eventData, iterationNumber);
	}
}