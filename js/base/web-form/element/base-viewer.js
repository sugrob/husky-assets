class BaseFormElementViewer extends Component {
	constructor(configuration) {
		super();

		this.id = typeof configuration.id != "undefined"
			? configuration.id
			: configuration.name+"_"+Math.random().toString().substr(2,10);
		this.value;
		this.context;
		this.input;

		this.name = configuration.name;
		this.labelText = configuration.label;
		this.help = configuration.help;
		this.label;
	}

	/* abstract */ createInput() {
		console.error("You forgot to define createInput() of your component");
	}

	createElement() {
		return $('<div class="form-field-viewer"></div>');
	}

	setContext(context) {
		this.context = context;
	}

	reset() {
		if (typeof this.input != "undefined") {
			this.input.val('');
		}
	}

	import(value) {
		if (this.isValidValueType(value)) {
			this.value = value;
			this.fill(value);
		}
	}

	export(scope) {
		scope[this.name] = this.getValue();
	}

	getValue() {
		if (typeof this.input == "undefined")
			throw "Input is still not exists";

		return this.parseValue(this.input.val());
	}

	fill(value) {
		if (typeof this.input == "undefined")
			throw "Input is still not exists";

		this.input.val(this.decorate(value));
	}

	decorate(value) {
		return value;
	}

	parseValue(value) {
		return value;
	}

	isValidValueType(value) {
		return typeof value != "string"
			|| typeof value != "number"
			|| typeof value != "bigint"
	}

	show(){
		this.element.show();
	}

	hide(){
		this.element.hide();
	}

	update(data) {
		if (typeof data.context == "object") {
			this.setContext(data.context);
		}

		if (typeof data.value != "undefined") {
			this.import(data.value);
		}
	}

	render(holder, data) {
		super.render(holder);

		if (this.__isLabelRequired()) {
			this.label = $('<label for="'+this.id+'">'+this.labelText+'</label>');
			this.label.appendTo(this.element);
		}

		this.renderField();

		if (typeof data == "object") {
			this.update(data);
		}
	}

	renderField() {
		this.input = this.createInput();
		this.input.appendTo(this.element);
	}

	__isLabelRequired() {
		return true;
	}
}