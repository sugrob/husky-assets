class FormHideHandler extends TransactionChainHandler {
	constructor() {
		super();
	}

	run(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		app.getView("form").hide();
		onComplete(eventData, iterationNumber);
	}

	rollback(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		app.getView("form").show();
		onComplete(eventData, iterationNumber);
	}
}