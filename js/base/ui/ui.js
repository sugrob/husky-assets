UI = {
	select: function(cfg) {
		return new UI_Select(cfg);
	},

	button: function() {
		//return new UI_Button();
	}
}

class UI_Select extends Component {
	constructor(cfg) {
		super();
		this.cfg = Object.assign({
			show_arrow: true,
			onselect: null,
			onchange: null
		}, cfg);

		this.list = [];
		this.defaultValue;
		this.selectBox = $('<div class="husky-ui-select-box"></div>');
		this.text = $('<div class="text"></div>').appendTo(this.selectBox);
		this.arrow = $('<div class="arrow"></div>').appendTo(this.selectBox);

		if (!this.cfg.show_arrow) {
			this.arrow.hide();
		}

		this.options = $('<ul class="husky-ui-select-box-options"></ul>');
		this.__hideOptions();
		this.options.mouseleave(function(e){
			this.__hideOptions();
		}.bind(this));

		this.selectBox.click(function(e){
			this.__showOptions();
		}.bind(this));
	}

	createElement() {
		return $('<div class="husky-ui-select-box-wrap"></div>');
	}

	createInput() {
		return $('<input name="'+this.name+'" id="'+this.id+'" type="hidden" value="1" autocomplete="off"/>');
	}

	getValue() {
		if (typeof this.input == "undefined")
			throw "Input is still not exists";

		return this.input.val();
	}

	setValue(value) {
		for (var i in this.list) {
			if (this.list[i].value == value) {
				this.input.val(value);
				this.text.html(this.list[i].name);
			}
		}
	}

	reset() {
		this.input.val("");

		for (var i in this.list) {
			if (this.list[i].hasOwnProperty("default") && this.list[i].default == true) {
				this.setValue(this.list[i].value);
			}
		}
	}

	render(holder, list) {
		this.list = list;
		this.input = this.createInput();
		this.input.appendTo(this.element);
		this.selectBox.appendTo(this.element);
		this.__hideOptions();
		this.options.appendTo(this.element);

		this.__fill(list);
		super.render(holder);

		$(document).ready(function() {
			this.__onReady();
		}.bind(this));
	}

	__fill(list) {
		for (var i in list) {
			var el = $('<li rel="'+list[i].value+'">'+list[i].name+'</li>').appendTo(this.options);

			if (list[i].hasOwnProperty("default") && list[i].default == true) {
				this.setValue(list[i].value);
			}

			el.click(function(e){
				var value = e.target.getAttribute("rel");
				var oldValue = this.getValue();
				this.__hideOptions();
				this.setValue(value)

				if (typeof this.cfg.onselect == "function") {
					this.cfg.onselect(e, this.getValue(), this);
				}

				if (typeof this.cfg.onchange == "function" && oldValue != this.getValue()) {
					this.cfg.onchange(e, this.getValue(), this);
				}
			}.bind(this));
		}
	}

	__showOptions() {
		this.options.css({"visibility":"visible"});
		this.selectBox.addClass("husky-ui-select-box-active");
	}

	__hideOptions() {
		this.options.css({"visibility":"hidden"});
		this.selectBox.removeClass("husky-ui-select-box-active");
	}

	__onReady() {
		this.text.css({"min-width":this.options.outerWidth()+"px"});
		this.options.css({"width":"100%"});
	}
}