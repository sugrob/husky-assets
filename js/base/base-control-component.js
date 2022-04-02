class BaseControlComponent extends Component {
	constructor(configuration) {
		super();

		this.identifier;

		if (configuration.hasOwnProperty("actionName")) {
			this.actionName = configuration.actionName;
		} else {
			throw "Control: actionName is not defined";
		}

		this.label = configuration.hasOwnProperty("label")
			? configuration.label
			: null;

		this.eventName = configuration.hasOwnProperty("eventName")
			? configuration.eventName
			: null;

		this.rendererOptions = configuration.hasOwnProperty("rendererOptions")
			? configuration.rendererOptions
			: null;
	}

	hasRendererOption(name) {
		return this.rendererOptions !== null
			&& this.rendererOptions.hasOwnProperty(name);
	}

	getRendererOption(name) {
		return this.hasRendererOption(name) ? this.rendererOptions[name] : null;
	}

	setIdentifier(identifier) {
		if (!identifier instanceof ObjectIdentifier) {
			throw "Control: actionName is not defined";
		}

		this.identifier = identifier;
	}

	produceEvent(e) {
		e.preventDefault();

		if (this.eventName !== null) {
			var app = AppMap.get(this.eventAccessPoint);
			var subject = app.getView("list").subject;

			if (!this.__isIdentifiableEvent()
				|| (typeof this.identifier == "undefined" || this.identifier == null)
			) {
				EventDispatcher.call(
					this.eventAccessPoint,
					this.eventName,
					e,
					{}
				);
			} else if (this.identifier instanceof ObjectIdentifier
				&& this.identifier.isNotEmpty()
			) {
				EventDispatcher.call(
					this.eventAccessPoint,
					this.eventName,
					e,
					{identifier: this.identifier}
				);
			}
		}
	}

	/**
	 * Is onject.id required for produce event or not?
	 */
	__isIdentifiableEvent() {
		return true;
	}
}