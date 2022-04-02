class PaginatorControl extends BaseControlComponent {
	constructor(configuration) {
		super(configuration);

		this.count  = 0;
		this.page = 0;
		this.pages = [];

		if (this.rendererOptions.hasOwnProperty("limit")
			&& isNaN(this.rendererOptions.limit) == false
		) {
			this.limit = parseInt(this.rendererOptions.limit);
		} else {
			throw ("One of the expected Paginator renderer options is not defined: limit")
		}

		if (this.rendererOptions.hasOwnProperty("limits")
			&& typeof this.rendererOptions.limits == "string"
		) {
			this.limits = this.rendererOptions.limits.split(",");
		} else {
			throw ("One of the expected Paginator renderer options is not defined: limits")
		}

		this.maxNumberOfPages = this.rendererOptions.hasOwnProperty("maxNumberOfPages") ? this.rendererOptions.maxNumberOfPages : 5;

		EventDispatcher.subscribe(this.eventAccessPoint, "onStateChange", this.onStateChangeHandler.bind(this));
		EventDispatcher.subscribe(this.eventAccessPoint, "historyOnPopState", this.onStateChangeHandler.bind(this));
	}

	createElement() {
		return $('<div class="app-table-paginator"></div>');
	}

	render(holder) {
		var currentState = AppMap.get(this.eventAccessPoint).getState().current();

		if (currentState.data.hasOwnProperty("views")
			&& currentState.data.views.hasOwnProperty("list")
			&& currentState.data.views.list.hasOwnProperty("count")
			&& currentState.data.views.list.hasOwnProperty("page")
		) {
			this.count = currentState.data.views.list.count;
			this.page = currentState.data.views.list.page;
			this.limit = currentState.data.views.list.limit;

			if (this.holder !== holder) {
				this.pagesList = $("<div class='pages'></div>");
				this.pagesList.appendTo(this.element);

				this.__renderPages();

				if (this.rendererOptions.hasOwnProperty("limitPickerLabel")) {
					this.limitPicker = $("<div class='limit-picker'></div>");
					this.limitPicker.appendTo(this.element);
				}
				this.__renderLimitPicker();

				this.info = $("<div class='info'></div>").hide();
				this.info.appendTo(this.element);
				this.__renderInfo();

				super.render(holder);
			} else {
				this.__renderPages();
				this.__renderLimitPicker();
				this.__renderInfo();
			}
		}
	}

	onStateChangeHandler(src) {
		if (src.hasOwnProperty("context")
			&& src.context.hasOwnProperty("data")
			&& src.context.data.hasOwnProperty("views")
			&& src.context.data.views.hasOwnProperty("list")
		) {
			var listStateData = src.context.data.views.list;

			if (listStateData.hasOwnProperty("limit")
				&& listStateData.hasOwnProperty("page")
				&& listStateData.hasOwnProperty("count")
			) {
				this.limit = listStateData.limit;
				this.page = listStateData.page;
				this.count = listStateData.count;
			}
			this.__renderPages();
			this.__renderLimitPicker();
			this.__renderInfo();
		}
	}

	produceEvent(e) {
		e.preventDefault();

		if (this.eventName !== null) {
			var app = AppMap.get(this.eventAccessPoint);
			var subject = app.getView("list").subject;

			EventDispatcher.call(
				this.eventAccessPoint,
				this.eventName,
				e,
				{
					views:{
						list: {
							page: this.page,
							limit: this.limit
						}
					}
				}
			);
		}
	}

	__renderLimitPicker() {
		this.limitPicker.html('');
		if (this.rendererOptions.hasOwnProperty("limitPickerLabel")) {
			$("<span></span>").text(this.rendererOptions.limitPickerLabel).appendTo(this.limitPicker);
			var options = [];

			for (var i in this.limits) {
				options.push({value:this.limits[i], name: this.limits[i], default: (this.limits[i] == this.limit)});
			}

			UI.select({
				onchange:function (e, value) {
					this.__onPageChange(e,{limit: value});
				}.bind(this)
			}).render(this.limitPicker, options);
		}
	}

	__renderInfo() {
		this.info.html('');

		if (this.rendererOptions.hasOwnProperty("infoTemplate")) {
			if (this.count > 0) {
				this.info.show();
			} else {
				this.info.hide();
			}

			var internalVars = {
				start : (this.page - 1) * this.limit + 1,
				end : Math.min(this.page * this.limit, this.count),
				count : this.count,
				nop : this.__getNumberOfPages(),
			}

			var info = this.rendererOptions.infoTemplate;

			for (var key in internalVars) {
				info = info.replaceAll('{'+key+'}', internalVars[key]);
			}

			this.info.html("<span>" + info + "</span>")
		}
	}

	__renderPages() {
		var numberOfPages = this.__getNumberOfPages();
		var tailsLenght = this.maxNumberOfPages - 1;
		var leftTail = tailsLenght/2;
		var rightTail = leftTail;
		this.pagesList.html('');

		if (this.page - leftTail < 1) {
			leftTail = this.page - 1;
			var leftPageNumber = 1;
			rightTail = tailsLenght - leftTail;
		} else {
			var leftPageNumber = this.page - leftTail;
		}

		if (this.page + rightTail > numberOfPages) {
			rightTail = numberOfPages - this.page;
			var rightPageNumber = numberOfPages;

			if (this.page - (tailsLenght - rightTail) >= 1) {
				leftTail = tailsLenght - rightTail;
				leftPageNumber = this.page - leftTail;
			}
		} else {
			var rightPageNumber = this.page + rightTail;
		}

		var bp = (this.page - tailsLenght - 1 >= 1)
			? (this.page - tailsLenght - 1)
			: (this.page - leftTail > 1 ? 1 : null);

		var fp = (this.page + tailsLenght + 1 <= numberOfPages)
				? (this.page + tailsLenght + 1)
				: (this.page + rightTail < numberOfPages ? numberOfPages : null);

		var backButton = $("<div class='back-button'><</div>");

		if (this.rendererOptions.hasOwnProperty("backButtonLabel")) {
			backButton.html(this.rendererOptions.backButtonLabel);
		}

		if (bp == null) {
			backButton.addClass("off")
		}

		this.__addPageButton(backButton, bp);

		for(var i = 1; i <= numberOfPages; i++) {
			if (i >= leftPageNumber && i <= rightPageNumber) {
				this.__addPageButton($("<div class='page"+(i==this.page?' off':'')+"'>"+i+"</div>"), i);
			}
		}

		var forwardButton = $("<div class='forward-button'>></div>");

		if (this.rendererOptions.hasOwnProperty("forwardButtonLabel")) {
			forwardButton.html(this.rendererOptions.forwardButtonLabel);
		}

		if (fp == null) {
			forwardButton.addClass("off")
		}

		this.__addPageButton(forwardButton, fp);
	}

	__addPageButton(b, page) {
		b.appendTo(this.pagesList);
		b.click(function (e) {this.__onPageChange(e, {page:page})}.bind(this));
	}

	__getNumberOfPages() {
		return this.limit > 0 ? Math.ceil(this.count/this.limit) : 0;
	}

	__isIdentifiableEvent() {
		return false;
	}

	__onPageChange(e, listOptions) {
		if (listOptions.hasOwnProperty("limit")) {
			this.limit = listOptions.limit;
			this.page = 1;
		}

		if (listOptions.hasOwnProperty("page")) {
			this.page = listOptions.page;
		}

		this.__renderPages();
		this.__renderLimitPicker();
		this.__renderInfo();

		this.produceEvent(e);
	}
}