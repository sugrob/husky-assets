class AjaxTransactionChainHandler extends TransactionChainHandler {
	constructor() {
		super();
	}

	/*abstract private*/ _getRestoreStateEventName() {
		throw ( "Abstract method _getRestoreStateEventName() is not defined" );
	}

	_getServiceUrl(options) {
		var url = window.location.pathname;

		if (typeof options == "object" && options != null) {
			var query = $.param(options);
			url = url+"?"+query;
		}

		return url;
	}

	_updateStateFromAJAXResponse(state, response) {
		this.__assertStateIsProper(state);
		var currentState = state.current();

		if (currentState.hasOwnProperty("data")
			&& response.hasOwnProperty("state")
		) {
			if (!response.state.hasOwnProperty("restoreStateEventName")) {
				response.state.restoreStateEventName = this._getRestoreStateEventName();
			}
			state.push(response.state, true);
		}
	}

	/**
	 * @param response
	 * @returns {boolean}
	 * @private
	 */
	_isResponseConsistent(response) {
		return typeof response == "object"
			&& response.hasOwnProperty("consistency")
			&& response.consistency.hasOwnProperty("successful")
	}

	_isResponseSuccessful(response) {
		return this._isResponseConsistent(response)
			&& response.consistency.successful == true;
	}

	_get(data, onComplete, onFail) {
		data.ajax = "true";
		var url = this._getServiceUrl();

		return this.__ajax("GET", url, data, onComplete, onFail);
	}

	_post(urlOptions, data, onComplete, onFail) {
		urlOptions.ajax = "true";
		var url = this._getServiceUrl(urlOptions);

		return this.__ajax("POST", url, data, onComplete, onFail);
	}

	__ajax(method, url, data, onComplete, onFail) {
		$.ajax({
			method: method,
			url: url,
			data: data
		}).done(function(responseText) {
			var response = JSON.parse(responseText);
			if (this._isResponseConsistent(response)) {
				onComplete(response);
			} else {
				throw ( "Server request is not consistent");
			}
		}.bind(this)).fail(function() {
			if (onFail) {
				onFail();
			} else {
				throw ( "Server request fail" );
			}
		}.bind(this));
	}
}