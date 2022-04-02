class View extends Component {
	constructor(name) {
		super();
		this.name = name;
		this.controls = [];
	}

	/* abstract render (holder, data) {}*/

	createElement() {
		return $('<div></div>');
	}
}