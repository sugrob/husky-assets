class ErrorsConsole extends Component {
	constructor() {
		super();
		this.errors = [];
	}

	createElement() {
		return $('<div class="app-form-error-console"></div>');
	}

	add(errMsg) {
		this.errors.push(errMsg);
	}

	clear() {
		this.errors = [];
	}

	update() {
		this.element.html('');

		if (this.errors.length > 0) {
			for (var i in this.errors) {
				var record = $('<div>'+this.errors[i]+'</div>');
				record.appendTo(this.element);
			}
			this.show();
		} else {
			this.hide();
		}
	}

	render(holder) {
		this.element.hide();
		super.render(holder);
	}
}