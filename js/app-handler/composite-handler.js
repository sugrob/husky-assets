class CompositeHandler extends AppHandler {
	constructor() {
		super();
		this.queue = new Array();
		this.configurations = new Array();
	}

	add(handler, confuguration) {
		if (!handler instanceof TransactionChainHandler) {
			throw "Only TransactionHandler may be added to composite queue";
		}

		this.queue.push(handler);
		this.configurations.push(Object.assign(confuguration, {}));
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
	run(eventData, i) {
		if (typeof i == "undefined") {
			var i = 0;
		}

		try {
			if (i < this.queue.length) {
				this.queue[i].run(eventData, i+1, this.run.bind(this), this.configurations[i]);
			}
		} catch (error) {
			console.error(error);
			this.__rollback(eventData, i)
		}
	}

	__rollback(eventData, i) {
		if (typeof i == "undefined") {
			return;
		}

		try {
			if (i >= 0 && i < this.queue.length) {
				this.queue[i].rollback(eventData, i-1, this.__rollback.bind(this));
			}
		} catch (error) {
			console.error(error);
			/* fuckup can't be prevented */
		}
	}
}