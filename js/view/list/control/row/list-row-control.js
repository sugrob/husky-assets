class ListRowControl extends BaseControlComponent {
	constructor(configuration) {
		super(configuration);
		this.object  = null;

		// Set on click action
		this.element.click(this.produceEvent.bind(this));
	}

	render(holder, object) {
		super.render(holder);

		if (typeof object  == "object" && typeof object.id != "undefined") {
			var app = AppMap.get(this.eventAccessPoint);
			var view = app.getView("list");

			if (object.hasOwnProperty("id")) {
				this.setIdentifier(new ObjectIdentifier(view.subject, object.id));
			}
		}
	}
}