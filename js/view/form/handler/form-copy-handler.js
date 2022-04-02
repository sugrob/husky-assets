class FormCopyHandler extends FormReloadHandler {
	constructor() {
		super();
	}

	rollback(eventData, iterationNumber, onComplete) {
		onComplete(eventData, iterationNumber);
	}

	_getActionName() {
		return "copy";
	}

	_getRestoreStateEventName() {
		return "form.restoreCopyState";
	}

	// __updateState(state, eventData) {
		// this.__assertStateIsProper(state);
		//
		// state.push({
		// 	action: "copy",
		// 	viewName: "form",
		// 	subject: eventData.context.identifier.subject,
		// 	identifier: null
		// }, true);
	// }

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