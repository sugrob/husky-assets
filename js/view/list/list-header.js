class ListHeader extends Component {
	constructor() {
		super();
		this.rowElement = $('<tr></tr>');
		this.cells = {};
	}

	add(name, column) {
		if (column instanceof ListColumn) {
			this.cells[name] = new ListHeaderCell(column);
		} else {
			console.warn("Wrong column class.", column);
		}
	}

	has(name) {
		return this.cells.hasOwnProperty(name)
	}

	createElement() {
		return $('<tbody class="app-table-header"></tbody>');
	}

	render(holder) {
		this.rowElement.appendTo(this.element);

		$.each(this.cells, function(i, cell) {
			cell.render(this.rowElement);
		}.bind(this));

		super.render(holder);
	}
}