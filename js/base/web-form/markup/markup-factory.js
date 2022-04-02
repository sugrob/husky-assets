MarkupFactory = {
	spawn(type) {
		if (type == "layout") {
			return new MarkupLayout();
		} else {
			throw "Don't know about layout type:" + type;
		}
	},

	isValidType(type) {
		return (["layout", "tabbedLayout", "fieldset"].indexOf(type) > -1);
	}
}