class ListToolbarControl extends BaseControlComponent {
	constructor(configuration) {
		super(configuration);

		this.element.click(this.produceEvent.bind(this));
	}

	render(holder) {
		super.render(holder);

		if (this.label) {
			this.element.text(this.label);
		}
	}
}