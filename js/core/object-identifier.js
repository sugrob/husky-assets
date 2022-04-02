class ObjectIdentifier {
	constructor(subject, id) {
		if (typeof subject != "undefined"
			&& typeof subject == "string"
		) {
			this.subject = subject;
		} else {
			throw "ObjectIdentifier: first argument must be a valid class name";
		}
		this.id = null;
		this.setId(id);
	}

	setId(id) {
		if (id != "undefined"
			&& isNaN(id) == false
			&& parseInt(id) == id
		) {
			this.id = id;
		} else {
			this.id = function (new_id) {
				this.setId(new_id);
			}.bind(this);
		}
	}

	isNotEmpty() {
		return this.__isIdentifierNumerical();
	}

	__isIdentifierNumerical() {
		return (this.id != "undefined"
			&& typeof this.id != "function"
			&& isNaN(this.id) == false
			&& parseInt(this.id) == this.id
		);
	}
}