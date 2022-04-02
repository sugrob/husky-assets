class RingStorage extends UnifiedStorage {
	constructor(storage, size) {
		super();

		if (storage instanceof UnifiedStorage) {
			this.storage = storage;
		} else
			throw ("First argument must be instance of UnifiedStorage");

		this.maxSize = size;
		this.keys = new Array();
	}

	set(key, value) {
		if (this.keys.indexOf(key) != -1) {
			this.storage.set(key, value);
		} else {
			if (this.keys.length >= this.maxSize) {
				var oldKey = this.keys.shift();
				this.storage.remove(oldKey);
			}

			this.storage.set(key, value);
			this.keys.push(key);
		}
	}

	remove(key) {
		if (this.keys.indexOf(key) != -1) {
			this.keys.splice(this.keys.indexOf(key), 1);
			this.storage.remove(key);
		}
	}

	has(key) {
		return this.keys.indexOf(key) != -1 && this.storage.has(key);
	}

	get(key) {
		return this.storage.get(key);
	}

	clear() {
		for (var i in this.keys) {
			this.storage.remove(this.keys[i]);
		}
		this.keys.splice(0);
	}
}