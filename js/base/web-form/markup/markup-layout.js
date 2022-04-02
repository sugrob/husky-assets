class MarkupLayout extends MarkupComponent {
	createElement() {
		return $('<div class="markup-component"></div>');
	}

	createLayout() {
		return $('<div class="markup-layout"></div>');
	}

	render(holder, markup, data, elements) {
		if (typeof markup.legend == "string" && markup.legend.length > 0) {
			$('<div class="app-form-legend">'+markup.legend+'</div>').appendTo(this.element);
		}

		super.render(holder, markup, data, elements);
	}
}