class SearchStringFormElementViewer extends BaseFormElementViewer {
	constructor(cfg) {
		super(cfg);

		this.expressions = [];

		if (Array.isArray(cfg.expressions)) {
			for (var i in cfg.expressions) {
				if (cfg.expressions[i].hasOwnProperty("name")
					&& cfg.expressions[i].hasOwnProperty("logic")
				) {
					this.expressions.push({
						value: cfg.expressions[i].logic,
						name: cfg.expressions[i].name,
						default: cfg.expressions[i].hasOwnProperty("default") && cfg.expressions[i].default == true ? true : false
					});
				}
			}
		}

		this.logicBox = UI.select({show_arrow: false});
	}

	createInput() {
		return $('<input name="'+this.name+'" id="'+this.id+'" type="text" value="" autocomplete="off"/>');
	}

	reset() {
		super.reset();
		this.logicBox.reset();
	}

	export(scope) {
		scope[this.name] = {value: this.getValue(), logic: this.logicBox.getValue()};
	}

	renderField() {
		var viewerWrap = $('<div class="search-string-wrap input-text"></input>');
		viewerWrap.appendTo(this.element);

		this.logicBox.render(viewerWrap, this.expressions);


		var inputWrap = $('<div class="input-wrap"></input>');
		inputWrap.appendTo(viewerWrap);

		this.input = this.createInput();
		this.input.appendTo(inputWrap);
	}
}