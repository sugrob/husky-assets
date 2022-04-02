class ControlListCellViewer extends Component {
	constructor(configuration) {
		super();
		this.controls = {};
		this.controlsConfiguration = typeof configuration.controls !== 'undefined'
			? configuration.controls
			: {};
	}

	createElement() {
		return $('<div class="row-control-wrapper"></div>');
	}

	setEventContextId(contextId) {
		super.setEventContextId(contextId);

		$.each(this.controls, function(name, control) {
			control.setEventContextId(this.eventAccessPoint);
		}.bind(this));
	}

	render(holder, object) {
		super.render(holder);

		$.each(this.controlsConfiguration, function(name, configuration) {
			this.controls[name] = ControlFactory.spawn(configuration.renderer, configuration);
			this.controls[name].setEventContextId(this.eventAccessPoint);
			this.controls[name].render(
				this.element,
				object
			);
		}.bind(this));
	}
}