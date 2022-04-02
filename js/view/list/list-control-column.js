class ListControlColumn extends ListColumn {
	constructor(configuration) {
		super(Object.assign({
			name: "",
			viewer: "ControlListCellViewer",
			label: "",
			className: "husky-list-control-cell",
			sortable: false,
			editable: false,
			wrap: false,
			stretch:false,
		}, configuration));

		this.controls = {};

		if (typeof controls !== 'undefined') {
			this.controls = controls;
		}
	}

	setControls(controls) {
		this.controls = controls;
	}

	spawnViewer() {
		return new ControlListCellViewer({controls: this.controls});
	}
}