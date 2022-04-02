class ListReloadHandler extends AjaxTransactionChainHandler {
	constructor() {
		super();
	}

	run(eventData, iterationNumber, onComplete, configuration) {
		var app = AppMap.get(eventData.eventAccessPoint);
		var list = app.getView("list");
		var state = app.getState();
		var currentState = state.current();

		if (currentState.hasOwnProperty("data")
			&& currentState.data.hasOwnProperty("subject")
			&& currentState.data.hasOwnProperty("views")
			&& currentState.data.views.hasOwnProperty("list")
		) {
			var options = {subject: currentState.data.subject};
			jQuery.extend(options, currentState.data.views.list);

			if (eventData.hasOwnProperty("context")
				&& eventData.context.hasOwnProperty("views")
				&& eventData.context.views.hasOwnProperty("list")
			) {
				Object.assign(options, eventData.context.views.list);
			}

			options.action = "list";

			var stateless = configuration.hasOwnProperty('stateless') ? configuration.stateless : false;

			this._get(
				options,
				function(response) {
					this.__updateList(list, response);
					if (!stateless) {
						this._updateStateFromAJAXResponse(state, response);
					}
					onComplete(eventData, iterationNumber);
				}.bind(this)
			);
		} else {
			throw ("ListReloadHandler: can't get state data");
		}
	}

	rollback(eventData, iterationNumber, onComplete) {
		onComplete(eventData, iterationNumber);
	}

	_getRestoreStateEventName() {
		return "list.restoreState";
	}

	__updateList(list, response) {
		list.update(response.data.list);
	}

	/**
	 * @throws throw exception if response is not consystent
	 * @param response
	 * @private
	 */
	_checkResponseConsistency(response) {
		super._checkResponseConsistency(response);

		if (response.hasOwnProperty("data")
			&& response.data.hasOwnProperty("list")
		) {
			return;
		}

		throw ("Response is not consystent");
	}
}