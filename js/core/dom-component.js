class DomComponent {
	constructor() {
		this.element = this.createElement();
	}

	/* abstract */ createElement() {
		console.error("You forgot to define createElement() of your component");
	}
}