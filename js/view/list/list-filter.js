class ListFilter extends Component {
	constructor(configuration) {
		super();

		if (typeof configuration.form == "undefined") {
			throw "ListFilter configuration doesn't contain Form configuration part";
		}

		ElementFactory.add("SearchString", SearchStringFormElementViewer);
		ElementFactory.add("SearchUnaryLogic", SearchUnaryLogicFormElementViewer);

		this.webForm = new WebForm(configuration.form);
		this.active = false;
		this.hide();
	}

	reset() {
		this.webForm.reset();
	}

	toggle() {
		if (this.active) {
			this.hide();
		} else {
			this.show();
		}
	}

	show() {
		this.active = true;
		this.element.removeClass("app-table-filter-hidden");
	}

	hide() {
		this.active = false;
		this.element.addClass("app-table-filter-hidden");
	}

	createElement() {
		return $('<div class="app-table-filter"></div>');
	}

	updateChildrenEventContextId() {
		this.webForm.setEventContextId(this.eventAccessPoint);
	}

	fill(data) {
		this.webForm.fill(data);
	}

	export() {
		return this.webForm.export();
	}

	render(holder) {
		var data = {}
		this.webForm.render(this.element, data);

		super.render(holder);
	}
}