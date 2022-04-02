class FormCommonControl extends BaseControlComponent {
	constructor(configuration) {
		super(configuration);

		this.element.click(this.produceEvent.bind(this));
	}

	render(holder) {
		if (this.label) {
			this.element.text(this.label);
		}

		super.render(holder);
	}

	__isIdentifiableEvent() {
		return false;
	}
}