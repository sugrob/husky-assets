class ListRow extends Component {
	constructor(columns) {
		super();

		this.cells = {};
		this.rowElement = $('<tr></tr>').appendTo(this.element);

		for (var i = 0; i < columns.length; i++) {
			this.cells[columns[i].name] = new ListCell(columns[i]);
		}
	}

	createElement() {
		return $('<tbody class="app-table-row"></tbody>');
	}

	updateChildrenEventContextId() {
		$.each(this.cells, function(name, cell){
			cell.setEventContextId(this.eventAccessPoint);
		}.bind(this));
	}

	render(holder, data) {
		this.element[0].identifier = data.identifier;

		$.each(this.cells, function(name, cell) {
			if (typeof cell.column === "object"
				&& cell.column instanceof ListControlColumn
			) {
				cell.render(
					this.rowElement,
					data
				);
			} else {
				cell.render(
					this.rowElement,
					typeof data[name] !== "undefined"
						? data[name]
						: null
				);
			}
		}.bind(this));

		super.render(holder);
	}
}