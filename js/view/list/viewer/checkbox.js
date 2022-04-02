class CheckboxListCellViewer extends BaseListCellViewer {
	constructor(configuration) {
		super(configuration);
	}

	createInput(value) {
		return $('<input name="'+this.name+'" type="checkbox" '+(value == true ? "checked" : "")+' onclick="return false;" readonly="readonly"/>');
	}

	render(holder, value) {
		super.render(holder);

		if (this.editable) {
			this.input = this.createInput(value);
			this.input.appendTo(this.element);
		}
	}
}