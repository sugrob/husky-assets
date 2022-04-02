class BaseListCellViewer extends Component {
	constructor(configuration) {
		super();
		this.name = configuration.name;
		this.editable = configuration.editable;
		this.input; /* if editable... */
	}

	createElement() {
		return $('<div></div>');
	}

	render(holder) {
		super.render(holder);
	}
}