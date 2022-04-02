class ListToolbar extends Component {
	constructor() {
		super();
		this.controls = {};
	}

	add(name, control) {
		if (control instanceof ListToolbarControl) {
			this.controls[name] = control;
		} else {
			console.warn("Wrong control class.", control);
		}
	}

	createElement() {
		return $('<div class="app-table-toolbar"></div>');
	}

	updateChildrenEventContextId() {
		$.each(this.controls, function (name, control) {
			control.setEventContextId(this.eventAccessPoint);
		}.bind(this));
	}

	render(holder, data) {
		$.each(this.controls, function(i, control) {
			if (!control.hasRendererOption("appear")
				|| control.getRendererOption("appear") == "left"
			) {
				control.render(this.element);
			}
		}.bind(this));

		$('<div class="app-table-toolbar-spacer"></div>').appendTo(this.element);

		$.each(this.controls, function(i, control) {
			if (control.hasRendererOption("appear")
				&& control.getRendererOption("appear") == "right"
			) {
				control.render(this.element);
			}
		}.bind(this));

		super.render(holder);
	}
}