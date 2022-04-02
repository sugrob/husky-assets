class ListHideHandler extends TransactionChainHandler {
	constructor() {
		super();
	}

	run(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		app.getView("list").hide();
		onComplete(eventData, iterationNumber);
	}

	rollback(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		app.getView("list").show();
		onComplete(eventData, iterationNumber);
	}
}