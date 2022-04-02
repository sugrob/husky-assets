class ListFilterToggleHandler extends AppHandler {
	constructor() {
		super();
	}

	run(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		var filter = app.getView("list").filter;
		filter.toggle();
	}

	rollback(eventData, iterationNumber, onComplete) {
		// do nothing...
	}
}