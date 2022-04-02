class MarkupComponent extends Component {
	constructor() {
		super();
		this.layout = this.createLayout();
	}

	/* abstract */ createLayout() {
		console.error("You forgot to define createLayout() of your component");
	}

	applyCss(markup) {
		if (markup.wrap == "string"
			&& (markup.wrap.toLowerCase() == "wrap" || markup.wrap.toLowerCase() == "nowrap")
		) {
			this.layout.css("flex-wrap", markup.wrap);
		}

		if (typeof markup.direction == "string"
			&& (markup.direction.toLowerCase() == "column" || markup.direction.toLowerCase() == "row")
		) {
			this.layout.css("flex-direction", markup.direction);
		} else {
			// default value ???
		}

		if (typeof markup.width == "string") {
			this.element.css("width", markup.width);
		}
	}

	render(holder, markup, data, elements) {
		super.render(holder);

		if (markup.hasOwnProperty("hidden")
			&& (markup.hidden == true || markup.hidden == "true")
		) {
			this.element.hide();
		}

		this.layout.appendTo(this.element);

		this.applyCss(markup);

		if (Array.isArray(markup.children) && markup.children.length > 0) {
			for (var i = 0; i < markup.children.length; i++) {
				MarkupFactory.spawn(markup.children[i].type, configuration)
					.render(this.layout, markup.children[i], data, elements);
			}
		} else if (Array.isArray(markup.elements) && markup.elements.length > 0) {
			for (var i = 0; i < markup.elements.length; i++) {
				var name =  markup.elements[i];

				if (typeof elements[name] != "undefined") {
					if (typeof data != "undefined"
						&& data.hasOwnProperty("name")
						&& data.name.hasOwnProperty("value")
					) {
						elements[name].render(this.layout, data[name]);
					} else {
						elements[name].render(this.layout);
					}

				}
			}
		}
	}

	clear() {
		$(this.layout).empty();
		super.clear();
	}
}