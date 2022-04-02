class FormShowHandler extends TransactionChainHandler {
	constructor() {
		super();
	}

	run(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		app.getView("form").show();

		// var stateData = app.getState().current().data;
		// stateData.viewName = "form";
		//app.getState().replace(stateData);

		onComplete(eventData, iterationNumber);
	}

	rollback(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		app.getView("form").hide();
		onComplete(eventData, iterationNumber);
	}
}