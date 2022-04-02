class ButtonFormControl extends FormCommonControl {
	constructor(configuration) {
		super(configuration);
	}

	createElement() {
		return $('<div class="husky-ui-button form-control-item"></div>');
	}

	render(holder) {
		var className = this.rendererOptions.hasOwnProperty("class") ? "form-control-"+this.rendererOptions.class : "form-control";
		this.element.addClass(className);
		super.render(holder);
	}
}