class ListMoveItemHandler extends ListReloadHandler {
	constructor() {
		super();
	}

	run(eventData, iterationNumber, onComplete) {
		var app = AppMap.get(eventData.eventAccessPoint);
		var list = app.getView("list");
		var state = app.getState();
		var currentState = state.current();

		if (this.__isEvendDataCompletelyIdentified(eventData)) {
			var sortedIds = [];
			$.each(list.getIdentifiersListByPosition(), function (i, identifier){
				sortedIds[i] = identifier.id;
			});

			var options = {
				action: "move",
				subject: eventData.context.identifier.subject,
			}

			if (currentState.hasOwnProperty("data")
				&& currentState.data.hasOwnProperty("subject")
				&& currentState.data.hasOwnProperty("views")
				&& currentState.data.views.hasOwnProperty("list")
			) {
				jQuery.extend(options, currentState.data.views.list);
			}

			this._post(
				options,
				{ids:sortedIds},
				function(response) {
					this.__updateList(list, response);
					onComplete(eventData, iterationNumber);
				}.bind(this)
			);
		} else {
			throw ("ListMoveItemHandler: can't get event data, or event data is incomplete");
		}
	}

	rollback(eventData, iterationNumber, onComplete) {
		onComplete(eventData, iterationNumber);
	}
}