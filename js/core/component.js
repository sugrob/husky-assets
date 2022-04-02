class Component {
	constructor() {
		this.element = this.createElement();
		this.eventAccessPoint = new EventAccessPoint();
		this.data;
		this.parent;
	}

	/* abstract */ createElement() {
		console.error("You forgot to define createElement() of your component");
	}

	setEventContextId(contextId) {
		this.eventAccessPoint.setContextId(contextId);
		this.updateChildrenEventContextId();
	}

	updateChildrenEventContextId() {
		/* your code must be here */
	}

	render(holder) {
		if (this.element !== null
			&& typeof this.element !== undefined
			&& this.holder !== holder
		) {
			this.element.appendTo(holder);
			this.holder = holder;
		}

		this.updateChildrenEventContextId();
	}

	show() {
		this.element.show();
	}

	hide() {
		this.element.hide();
	}

	clear() {
		$(this.element).empty();
	}

	remove() {
		$(this.element).remove();
	}
}