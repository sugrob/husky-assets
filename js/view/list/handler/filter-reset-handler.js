class FilterResetHandler extends TransactionChainHandler {
	constructor() {
		super();
	}

	run(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		app.getView("list").filter.reset();
		onComplete(eventData, iterationNumber);
	}

	rollback(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		app.getView("list").hide();
		onComplete(eventData, iterationNumber);
	}
}