class StringListCellViewer extends BaseListCellViewer {
	constructor(configuration) {
		super(configuration);
	}

	createInput(value) {
		return $('<input name="'+this.name+'" type="text" value="'+value+'"/>');
	}

	render(holder, value) {
		super.render(holder);
		this.element.text(value);

		if (this.editable) {
			this.input = this.createInput(value).hide();
			this.input.appendTo(this.element);
		}
	}
}