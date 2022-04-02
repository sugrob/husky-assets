class WebForm extends Component {
	constructor(configuration) {
		super();

		if (typeof configuration.markup == "undefined"
			|| typeof configuration.markup.type == "undefined"
			|| MarkupFactory.isValidType(configuration.markup.type) == false
		) {
			console.log(configuration)
			throw "Input is still not exists";
		}

		this.header;
		this.errorsConsole = new ErrorsConsole();
		this.footer;
		this.form;
		this.markup = configuration.markup;
		this.headerToolbar = new FormToolbar(this);
		this.footerToolbar = new FormToolbar(this);
		this.rootMarkupElement;

		ControlFactory.add("form.controls.formButtonRenderer", ButtonFormControl);

		if (configuration.hasOwnProperty("handlers")) {
			for (var eventName in configuration.handlers) {
				var chain = configuration.handlers[eventName];
				var ch = new CompositeHandler();

				for (var i = 0; i < chain.length; i++) {
					var handler = HandlerFactory.spawn(chain[i].name);
					ch.add(handler, chain[i].configuration);
				}

				EventDispatcher.subscribe(this.eventAccessPoint, eventName, ch);
			}
		}

		ElementFactory.add("Hidden", HiddenFormElementViewer);
		ElementFactory.add("String", StringFormElementViewer);
		ElementFactory.add("Checkbox", CheckboxFormElementViewer);

		if (configuration.controls.hasOwnProperty("header")) {
			$.each(configuration.controls.header, function(name, cfg) {
				var control = ControlFactory.spawn(cfg.renderer, cfg);
				control.setEventContextId(this.eventAccessPoint);
				this.headerToolbar.add(name, control);
			}.bind(this));
		}

		if (configuration.controls.hasOwnProperty("footer")) {
			$.each(configuration.controls.footer, function(name, cfg) {
				var control = ControlFactory.spawn(cfg.renderer, cfg);
				control.setEventContextId(this.eventAccessPoint);
				this.footerToolbar.add(name, control);
			}.bind(this));
		}

		this.elements = {};

		$.each(configuration.elements, function(name, elementCfg) {
			this.elements[name] = ElementFactory.spawn(elementCfg.viewer, elementCfg);
		}.bind(this));
	}

	createElement() {
		return $('<div class="app-form-wrap"></div>');
	}

	updateChildrenEventContextId() {
		this.headerToolbar.setEventContextId(this.eventAccessPoint);
		this.footerToolbar.setEventContextId(this.eventAccessPoint);
	}

	setErrors(errors) {
		this.errorsConsole.clear();
		for (var i in errors) {
			if (errors[i].hasOwnProperty("message")) {
				this.errorsConsole.add(errors[i].message);
			}
		}
		this.errorsConsole.update();
	}

	dropErrors() {
		this.errorsConsole.clear();
		this.errorsConsole.update();
	}

	fill(data) {
		for (var i in this.elements) {
			if (typeof data[i] != "undefined") {
				this.elements[i].update(data[i]);
			}
		}
	}

	reset() {
		for (var i in this.elements) {
			this.elements[i].reset();
		}

		this.dropErrors();
	}

	export() {
		var scope = {};

		for (var name in this.elements) {
			this.elements[name].export(scope);
		}

		return scope;
	}

	render(holder, data) {
		this.header = $('<div class="app-form-header"></div>').appendTo(this.element);
		this.errorsConsole.render(this.header);
		this.headerToolbar.render(this.header);

		if (this.markup.type == "tabbedLayout") {
			// this.tabBar = new UIControls.TabBar(this.toolbar);
		} else if (this.markup.legend != undefined) {
			//$('<div class="app-form-legend">'+this.markup.legend+'</div>').appendTo(this.element);
		}

		$('<div class="clear"></div>').appendTo(this.element);

		this.form = $('<form class="app-form"></form>').appendTo(this.element);
		this.rootMarkupElement = MarkupFactory.spawn(this.markup.type);
		this.rootMarkupElement.render(this.form, this.markup, data, this.elements);

// console.log(this.markup)
//
// 		return;
// 		$.each(this.elements, function(name, element) {
// 			// if (elementCfg.viewer == 'Hidden') {
//
// 			if (typeof data["subject"] == "object" && data["subject"][name] != "undefined") {
// 				var property = data["subject"][name];
// 				element.render(this.element, property.value, property.context);
// 			}
//
// 			// f.context.form = this;
//
// 			// var field = this.settings.fieldBuilder.spawn(f.viewer, this.element, f.name, f.value, f.settings, f.context);
// 			// this.fields[i] = field;
// 			// i++;
//
// 			// if (f.settings.observers) {
// 			// 	f.settings.observers.each(function(obs){
// 			// 		var name = obs.name ? obs.name : f.name + "_obserevr_" + $H(this.observers).size();
// 			// 		this.observers[name] = new FormObserver(this, field, obs);
// 			// 	}.bind(this));
// 			// }
//
// 		}.bind(this));

		this.footer = $('<div class="app-form-footer"></div>').appendTo(this.element);
		this.footerToolbar.render(this.footer);

		super.render(holder);
	}
}