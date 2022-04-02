class ListColumn {
	constructor(configuration) {
		this.name = configuration.name;
		this.viewer = configuration.viewer;
		this.label = configuration.label;
		this.className = configuration.hasOwnProperty("className") ? configuration.className : "husky-list-cell";

		this.sortable = typeof configuration.sortable === 'boolean'
			? configuration.sortable
			: false;

		this.editable = typeof configuration.editable === 'boolean'
			? configuration.editable
			: false;

		this.wrap = typeof configuration.wrap === 'boolean'
			? configuration.wrap
			: false;

		this.stretch = typeof configuration.stretch === 'boolean'
			? configuration.stretch
			: false;

		this.cells = [];
	}

	spawnViewer() {
		return new ListCellViewerFactory(
			this.viewer,
			{
				name: this.name,
				editable: this.editable
			}
		);
	}

	registerCell(cell) {
		this.cells[this.cells.length] = cell;
	}

	unregisterCell() {

	}

	show() {
		for (var i in this.cells) {
			this.cells[i].show();
		}
	}

	hide() {
		for (var i in this.cells) {
			this.cells[i].hide();
		}
	}
}