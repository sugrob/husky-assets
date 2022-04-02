class StringFormElementViewer extends BaseFormElementViewer {
	createInput() {
		return $('<input name="'+this.name+'" id="'+this.id+'" type="text" value="" autocomplete="off"/>');
	}
}