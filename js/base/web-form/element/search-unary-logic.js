class SearchUnaryLogicFormElementViewer extends BaseFormElementViewer {
	constructor(cfg) {
		super(cfg);

		this.list = [];
		this.select = UI.select();

		if (Array.isArray(cfg.expressions)) {
			for (var i in cfg.expressions) {
				if (cfg.expressions[i].hasOwnProperty("name")
					&& cfg.expressions[i].hasOwnProperty("logic")
				) {
					this.list.push({
						value: cfg.expressions[i].logic,
						name: cfg.expressions[i].name,
						default: cfg.expressions[i].hasOwnProperty("default") && cfg.expressions[i].default == true ? true : false
					});
				}
			}
		}
	}

	reset() {
		super.reset();
		this.select.reset();
	}

	export(scope) {
		scope[this.name] = {value: 1, logic: this.select.getValue()};
	}

	renderField() {
		this.select.render(this.element, this.list);
	}
}