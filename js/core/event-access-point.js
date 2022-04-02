class EventAccessPoint {
	constructor(contextId) {
		this.contextId = Math.random().toString().substr(2, 10);
	}

	setContextId(contextId) {
		if (this.contextId == contextId)
			return;

		var oldContextId = this.contextId;

		if (typeof contextId === "object"
			&& contextId instanceof EventAccessPoint
		) {
			this.contextId = contextId.getContextId();
		} else if (typeof contextId === "string"
			|| typeof contextId === "number"
		) {
			this.contextId = contextId;
		}

		EventDispatcher.updateContextId(oldContextId, this.contextId);
	}

	getContextId() {
		return this.contextId;
	}
}