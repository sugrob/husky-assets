class State {
	constructor(data, history, options) {
		this.prefix = "__state__";
		this.currentUID = null;
		this.history = false;
		this.storage = new RingStorage(new ULocalStorage(true), 10);
		this.options = Object.assign({
			onafterchange: function (){/*do nothing*/},
		}, options);

		if (history instanceof History) {
			this.history = history;
		}

		this.push(data);
	}

	replace(data, force = false) {
		var current = this.current();

		if (current !== null) {
			current.data = this.__clone(data);
			this.storage.set(this.currentUID, current);

			if (this.history) {
				this.history.replace(current);
			}

			this.__onAfterChange();
			console.log("REPLACE OUT:", this.current())

			return true;
		} else if (force == true) {
			this.push(data);
			return true;
		}
		// console.log("REPLACE OUT")
		return false;
	}

	push(ext_data, extend = false) {
		var data = this.__clone(ext_data);
		var state = {};
		var uid = this.prefix + '.' + Math.random().toString().substr(2, 10);
		var current = this.current();

		if (current === null) {
			state = {current: uid, previous: null, next: null, data: data};
			this.storage.set(uid, state);

			if (this.history) {
				this.history.push(state);
			}
		} else {
			current.next = uid;

			if (extend === true) {
				data = this.__merge(this.__clone(current.data), data);
			}

			state = {current: uid, previous: this.currentUID, next: null, data: data};
			this.storage.set(uid, state);

			if (this.history) {
				this.history.push(state);
			}
		}

		this.currentUID = uid;
		this.__onAfterChange();
		console.log("PUSH OUT:", this.current())
	}

	getByUID(uid) {
		return this.storage.has(uid) ? this.__clone(this.storage.get(uid)) : null;
	}

	current() {
		return this.__clone(this.__current());
	}

	next() {
		return this.__clone(this.__next());
	}

	previous() {
		return this.__clone(this.__previous());
	}

	__onAfterChange(data) {
		if (typeof this.options.onafterchange == "function") {
			this.options.onafterchange(document.createEvent('Event'), this.current());
		}
	}

	__merge(target, source) {
		return mergeRecursive(target, source);
	}

	__clone(obj) {
		return JSON.parse(JSON.stringify(obj))
	}

	__current() {
		if (this.currentUID !== null && this.storage.has(this.currentUID)) {
			return this.storage.get(this.currentUID);
		}

		return null;
	}

	__next() {
		var current = this.__current();

		if (current !== null) {
			var current = this.storage.has(this.currentUID);

			if (current.next !== null && this.storage.has(current.next)) {
				return this.storage.get(current.next);
			}
		}

		return null;
	}

	__previous() {
		var current = this.__current();

		if (current !== null) {
			var current = this.storage.has(this.currentUID);

			if (current.previous !== null && this.storage.has(current.previous)) {
				return this.storage.get(current.previous);
			}
		}

		return null;
	}
}