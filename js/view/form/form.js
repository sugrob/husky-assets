class Form extends View {
	constructor(configuration) {
		super("form");

		if (typeof configuration.subject !== "string") {
			throw "Missing argument: subject";
		}

		if (configuration.elements.hasOwnProperty("id") == false) {
			configuration.elements.id = {help: null, label: null, name: "id", settings: [], viewer: "Hidden"};
			configuration.markup.children.unshift({children: [], elements: ["id"], type: "layout", hidden: true});
		}

		this.subject = atob(configuration.subject);
		this.webForm = new WebForm(configuration);
	}

	updateChildrenEventContextId() {
		this.webForm.setEventContextId(this.eventAccessPoint);
	}

	setErrors(errors) {
		this.webForm.setErrors(errors);
	}

	dropErrors() {
		this.webForm.dropErrors();
	}

	fill(data) {
		if (typeof data["subject"] == "object") {
			data = data["subject"]
		}

		this.webForm.fill(data)
	}

	export() {
		return this.webForm.export();
	}

	render(holder, data) {
		if (typeof data["subject"] == "object") {
			data = data["subject"]
		}

		this.webForm.render(this.element, data);

		super.render(holder);
	}
}