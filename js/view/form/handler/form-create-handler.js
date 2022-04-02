class FormCreateHandler extends AjaxTransactionChainHandler {
	constructor() {
		super();
	}

	run(eventData, iterationNumber, onComplete, configuration) {
		var app = AppMap.get(eventData.eventAccessPoint);
		var form = app.getView("form");
		var state = app.getState();

		if (this.__isStateDataIdentifiable(state)) {
			var stateData = state.current().data;
			var stateless = configuration.hasOwnProperty('stateless') ? configuration.stateless : false;

			this._get(
				{action: "edit", subject: stateData.subject},
				function(response) {
					this.__updateForm(form, response);
					if (!stateless) {
						this._updateStateFromAJAXResponse(state, response);
					}
					onComplete(eventData, iterationNumber);
				}.bind(this)
			);
		} else {
			throw ("FormCreateHandler: can't get event data");
		}
	}

	rollback(eventData, iterationNumber, onComplete) {
		onComplete(eventData, iterationNumber);
	}

	_getRestoreStateEventName() {
		return "form.restoreCreateState";
	}

	__updateForm(form, response) {
		form.fill(response.data.form);
	}

	/**
	 * @throws throw exception if response is not consistent
	 * @param response
	 * @private
	 */
	_checkResponseConsistency(response) {
		super._checkResponseConsistency(response);

		if (response.hasOwnProperty("data")
			&& response.data.hasOwnProperty("form")
		) {
			return;
		}

		throw ("Response is not consistent");
	}
}