class TransactionChainHandler extends AppHandler {
	constructor() {
		super();
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
	/* abstract */ run(eventData, iterationNumber, onComplete) {
		/* user defined business logic here */
		console.error("You forgot to define method run() of your handler");
		onComplete(eventData, iterationNumber);
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
	/* abstract */ rollback(eventData, iterationNumber, onComplete) {
		/* user defined business logic here */
		console.error("You forgot to define method rollback() of your handler");
		onComplete(eventData, iterationNumber);
	}
}