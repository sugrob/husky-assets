class HiddenFormElementViewer extends BaseFormElementViewer {
	createInput() {
		return $('<input name="'+this.name+'" id="'+this.id+'" type="hidden" value=""/>');
	}

	__isLabelRequired() {
		return false;
	}
}