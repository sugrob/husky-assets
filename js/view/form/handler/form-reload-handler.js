class FormReloadHandler extends AjaxTransactionChainHandler {
	constructor() {
		super();
	}

	run(eventData, iterationNumber, onComplete, configuration) {
		var app = AppMap.get(eventData.eventAccessPoint);
		var form = app.getView("form");
		var state = app.getState();

		if (this.__isEvendDataCompletelyIdentified(eventData)) {
			var stateless = configuration.hasOwnProperty('stateless') ? configuration.stateless : false;

			this._get(
				{
					action: this._getActionName(),
					subject: eventData.context.identifier.subject,
					id: eventData.context.identifier.id
				},
				function(response) {
					this.__updateForm(form, response);
					if (!stateless) {
						this.__updateState(state, eventData);
					}
					onComplete(eventData, iterationNumber);
				}.bind(this)
			);
		} else {
			throw ("Can't get context data");
		}
	}

	rollback(eventData, iterationNumber, onComplete) {
		onComplete(eventData, iterationNumber);
	}

	_getActionName() {
		return "edit";
	}

	_getRestoreStateEventName() {
		return "form.restoreEditState";
	}

	__updateState(state, eventData) {
		this.__assertStateIsProper(state);

		state.push({
			action: this._getActionName(),
			viewName: "form",
			subject: eventData.context.identifier.subject,
			identifier: eventData.context.identifier.id,
			restoreStateEventName: this._getRestoreStateEventName(),
		}, true);

	}

	__updateForm(form, response) {
		form.fill(response.data.form);
	}

	/**
	 * @throws throw exception if response is not consystent
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

		throw ("Response is not consystent");
	}
}