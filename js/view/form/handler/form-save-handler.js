class FormSaveHandler extends AjaxTransactionChainHandler {
	constructor() {
		super();
	}

	run(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		var form = app.getView("form");
		var data = form.export();
		var state = app.getState();

		if (this.__isStateDataIdentifiable(state)) {
			var stateData = state.current().data;
			console.log(state.current())

			if (this.__isStateDataCompletelyIdentified(state)) {
				var postData = {
					action: "save",
					subject: stateData.subject,
					id: stateData.identifier
				};
			} else {
				var postData = {
					action: "add",
					subject: stateData.subject,
				};
			}

			this._post(
				postData,
				form.export(),
				function(response) {
					if (this._isResponseConsistent(response)) {
						if (this._isResponseSuccessful(response)) {
							this.__dropFormErrors(form);
							this.__updateForm(form, response);
							this._updateStateFromAJAXResponse(state, response);
							onComplete(eventData, iterationNumber);
						} else {
							this.__setFormErrors(form, response);
						}
					} else {
						throw ("Response is not consistent");
					}
				}.bind(this)
			);
		} else {
			throw ("Can't get context data");
		}
	}

	rollback(eventData, iterationNumber, onComplete) {
		onComplete(eventData, iterationNumber);
	}

	_updateStateFromAJAXResponse(state, response) {
		this.__assertStateIsProper(state);
		var currentState = state.current();

		if (currentState.hasOwnProperty("data")
			&& response.hasOwnProperty("state")
			&& response.state.hasOwnProperty("identifier")
			&& response.state.hasOwnProperty("subject")
		) {
			try {
				var identifier = new ObjectIdentifier(response.state.subject, response.state.identifier);

				if (identifier.isNotEmpty()) {
					currentState.data.identifier = identifier.id;

					if (response.state.hasOwnProperty("restoreStateEventName")) {
						currentState.data.restoreStateEventName = response.state.restoreStateEventName;
					} else {
						currentState.data.restoreStateEventName = this._getRestoreStateEventName();
					}

					state.replace(currentState.data);
				}
			} catch (e) {}
		}
	}

	_getRestoreStateEventName() {
		return "form.restoreEditState";
	}

	/**
	 * @inheritDoc
	 */
	_isResponseConsistent(response) {
		return super._isResponseConsistent(response)
			&& response.hasOwnProperty("data")
			&& response.data.hasOwnProperty("form");
	}

	__setFormErrors(form, response) {
		if (response.consistency.hasOwnProperty("errors")) {
			console.log(form)
			form.setErrors(response.consistency.errors);
		}
	}

	__dropFormErrors(form) {
		form.dropErrors();
	}

	__updateForm(form, response) {
		form.fill(response.data.form);
	}
}