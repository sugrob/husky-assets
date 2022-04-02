class ListCell extends Component {
	constructor(column) {
		super();
		this.column = column;
		this.column.registerCell(this);
		this.viewer = column.spawnViewer();
	}

	createElement() {
		return $('<td ></td>');
	}

	setEventContextId(contextId) {
		super.setEventContextId(contextId);
		this.viewer.setEventContextId(this.eventAccessPoint);
	}

	render(holder, value) {
		this.viewer.render(this.element, value);

		if (this.column.hasOwnProperty("className") && this.column.className.length > 0) {
			$(this.element).addClass(this.column.className);
		}

		super.render(holder);
	}
}