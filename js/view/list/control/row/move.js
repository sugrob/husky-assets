class MoveListRowControl extends BaseControlComponent {
	constructor(configuration) {
		super(configuration);
		this.object  = null;
	}

	createElement() {
		return $('<div class="row-control-move"></div>');
	}

	render(holder, object) {
		super.render(holder);

		if (typeof object  == "object" && typeof object.id != "undefined") {
			var app = AppMap.get(this.eventAccessPoint);
			var view = app.getView("list");

			if (object.hasOwnProperty("id")) {
				this.setIdentifier(new ObjectIdentifier(view.subject, object.id));
			}

			this.element.test = "33";
			this.element[0].produceMoveEvent = function (e) {
				this.produceEvent(new Event('move'));
			}.bind(this);
		}
	}
}