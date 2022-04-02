class App {
    constructor(state, views) {
	    this.eventAccessPoint = new EventAccessPoint();
	    AppMap.add(this.eventAccessPoint, this);
		var stateOptions = {onafterchange:this.stateChangeHandler.bind(this)};

		if (RuntimeStorage.has("apps")) {
			RuntimeStorage.get("apps").push(this);
			this.state = new State(state, null, stateOptions);
		} else {
			RuntimeStorage.set("apps", [this]);
			this.state = new State(state, new History(this.eventAccessPoint), stateOptions);
		}

        this.views = {};
    }

	getState() {
		return this.state;
	}

    addView(name, view) {
	    if (typeof view === "object"
		    && view instanceof View
	    ) {
		    this.views[name] = view;
		    view.setEventContextId(this.eventAccessPoint);
	    } else {
		    throw "View must be instance of View class";
	    }
    }

    hasView(name) {
    	return typeof this.views[name] == "object"
		    && this.views[name] instanceof View;
    }

	getView(name) {
		if (this.hasView(name)) {
			return this.views[name];
		} else {
			throw "Know's nothing about view: " + name;
		}
	}

    render(holder, data) {
	    $.each(this.views, function(name, view) {
		    view.render(
		    	holder,
			    data != undefined && data[name] != undefined ? data[name] : undefined
		    );

			var currentState = this.state.current();

		    if (currentState.hasOwnProperty("data")
			    && currentState.data.hasOwnProperty("viewName")
			    && currentState.data.viewName == name) {
			    view.show();
		    } else {
			    view.hide();
		    }
	    }.bind(this));
    }

	stateChangeHandler(e, state) {
		EventDispatcher.call(
			this.eventAccessPoint,
			"onStateChange",
			e,
			state
		);
	}
}