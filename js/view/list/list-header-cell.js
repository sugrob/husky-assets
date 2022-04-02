class ListHeaderCell extends Component {
	constructor(column) {
		super();
		this.column = column;
		this.column.registerCell(this);
		this.label = column.label;
	}

	createElement() {
		return $('<th class="app-table-header-cell"></th>');
	}

	render(holder) {
		this.layout = $('<div class="app-table-header-cell-layout"></div>')
			.text(this.label)
			.appendTo(this.element);

		super.render(holder);
	}
}