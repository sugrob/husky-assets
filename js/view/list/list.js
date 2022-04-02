class List extends View {
	constructor(configuration) {
		super("list");

		if (typeof configuration.subject !== "string") {
			throw "Missing argument: subject";
		}

		this.subject = atob(configuration.subject);

		if (this.subject.length == 0) {
			throw "Wrong argument: subject";
		}

		ControlFactory.add("list.controls.row.moveAnchorRenderer", MoveListRowControl);
		ControlFactory.add("list.controls.row.copyButtonRenderer", CopyListRowControl);
		ControlFactory.add("list.controls.row.editButtonRenderer", EditListRowControl);
		ControlFactory.add("list.controls.row.dropButtonRenderer", DropListRowControl);
		ControlFactory.add("list.controls.row.dropButtonRenderer", DropListRowControl);
		ControlFactory.add("list.controls.toolbar.addControlRenderer", AddListToolbarControl);
		ControlFactory.add("list.controls.toolbar.dropControlRenderer", DropListToolbarControl);
		ControlFactory.add("list.controls.toolbar.filterControlRenderer", FilterListToolbarControl);
		ControlFactory.add("list.controls.toolbar.settingsControlRenderer", SettingsListToolbarControl);
		ControlFactory.add("list.controls.footer.paginatorControlRenderer", PaginatorControl);

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

		this.canvas = null;
		this.table = null;

		this.columns = [];
		this.rows = []; //Array of ListRow objects

		this.filter;

		if (configuration.hasOwnProperty("filter")) {
			this.filter = new ListFilter(configuration.filter);
		}

		this.toolbar = new ListToolbar();
		this.header = new ListHeader();
		this.footer = new ListFooter();
		this.controls = configuration.controls;

		var leftRowControls = this.__getRowControlsByRenderOption("appear", "left");
		if (Object.keys(leftRowControls).length > 0) {
			var leftControlsColumn = new ListControlColumn({
				name:"leftControlsColumn",
				className: "husky-list-control-cell husky-list-left-control-cell"
			});
			leftControlsColumn.setControls(leftRowControls);
			this.header.add("leftControlsColumn", leftControlsColumn);
			this.columns.push(leftControlsColumn);
		}

		$.each(configuration.columns, function(name, cfg) {
			var column = new ListColumn(cfg);
			this.columns.push(column);
			this.header.add(name, column);
		}.bind(this));

		if (this.controls.hasOwnProperty("toolbar")) {
			$.each(this.controls.toolbar, function(name, cfg) {
				var control = ControlFactory.spawn(cfg.renderer, cfg);
				this.toolbar.add(name, control);
			}.bind(this));
		}

		if (this.controls.hasOwnProperty("footer")) {
			$.each(this.controls.footer, function(name, cfg) {
				var control = ControlFactory.spawn(cfg.renderer, cfg);
				this.footer.add(name, control);
			}.bind(this));
		}

		var rightRowControls = this.__getRowControlsByRenderOption("appear", "right");
		if (Object.keys(rightRowControls).length > 0) {
			var rightControlsColumn = new ListControlColumn({
				name:"rightControlsColumn",
				className: "husky-list-control-cell husky-list-right-control-cell"
			});
			rightControlsColumn.setControls(rightRowControls);
			this.header.add("rightControlsColumn", rightControlsColumn);
			this.columns.push(rightControlsColumn);
		}

	}

	updateChildrenEventContextId(contextId) {
		this.toolbar.setEventContextId(this.eventAccessPoint);
		this.filter.setEventContextId(this.eventAccessPoint);
		this.footer.setEventContextId(this.eventAccessPoint);

		if (this.rows.length > 0) {
			for (var i = 0; i < this.rows.length; i++) {
				this.rows[i].setEventContextId(this.eventAccessPoint);
			}
		}
	}

	render(holder, data) {
		this.canvas = $('<div class="app-table-wrap"></div>').appendTo(this.element);
		this.toolbar.render(this.canvas);

		if (this.filter) {
			this.filter.render(this.canvas);
		}

		this.table = $('<table class="app-table"></table>').appendTo(this.canvas);
		this.header.render(this.table);
		this.removeRows();

		if (data != undefined && data["objectList"] != undefined) {
			this.fill(data);
		}

		super.render(holder);

		if (Object.keys(this.__getRowControlsByProperty("actionName", "move")).length > 0) {
			$(this.table).sortable({
				cursor: 'grabbing',
				axis: "y",
				handle: ".row-control-move",
				items: ".app-table-row",
				update: function(event, ui) {
					if (ui.item.length == 1
						&& $(ui.item[0]).find(".row-control-move").length == 1
					) {
						try {
							var controlElement = $(ui.item[0]).find(".row-control-move")[0];
							controlElement.produceMoveEvent(event);
						} catch (e){}
					}
				}
			});
		}

		this.footer.render(this.canvas);
	}

	fill(data) {
		if (data != undefined && data["objectList"] != undefined) {
			for (var i = 0; i < data["objectList"].length; i++) {
				data["objectList"][i].identifier = new ObjectIdentifier(this.subject, data["objectList"][i].id);
				this.rows.push(new ListRow(this.columns));
				this.rows[i].setEventContextId(this.eventAccessPoint);
				this.rows[i].render(
					this.table,
					data["objectList"][i]
				)
			}
		}
	}

	removeRows() {
		for (var i in this.rows) {
			this.rows[i].remove();
			delete this.rows[i];
		}

		this.rows = [];
	}

	update(data) {
		this.removeRows();
		this.fill(data);
	}

	getIdentifiersListByPosition() {
		var list = [];
		$(this.table).find(">tbody.app-table-row").each(function(i, element) {
			list[i] = element.identifier;
		});
		return list;
	}

	getRowByIdentifier(identifier) {
		if (identifier instanceof ObjectIdentifier) {
			identifier = identifier.id;
		} else if (isNaN(identifier)) {
			throw ("ObjectIdentifier or integer expected");
		}

		// $.each(this.rows, function(i, row){
		// 	if (row.identifier.id == identifier.id) {
		// 		console.log(row)
		// 	}
		// });
	}

	__getRowControlsByRenderOption(key, value) {
		var result = {};

		$.each(this.controls.row, function(name, control) {
			if (control.hasOwnProperty("rendererOptions")
				&& control.rendererOptions.hasOwnProperty(key)
			) {
				if (control.rendererOptions[key] == value) {
					result[name] = control;
				}
			}
		}.bind(this));

		return result;
	}

	__getRowControlsByProperty(key, value) {
		var result = {};

		$.each(this.controls.row, function(name, control) {
			if (control.hasOwnProperty(key)) {
				if (control[key] == value) {
					result[name] = control;
				}
			}
		}.bind(this));

		return result;
	}
}