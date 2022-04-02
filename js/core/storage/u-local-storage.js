class ULocalStorage extends UnifiedStorage {
	/*It's just a localStorage wrap*/

	constructor(silent) {
		super();
		this.silent = true;
		LocalStorageGarbageCollector.clear();
	}

	set(key, value) {
		try {
			localStorage.setItem(key, JSON.stringify({value:value}));
		} catch (e) {
			if (!this.silent) {
				console.warn(e);
			}
		}
	}

	remove(key) {
		localStorage.removeItem(key);
	}

	has(key) {
		return localStorage.getItem(key) !== null;
	}

	get(key) {
		var obj = localStorage.getItem(key);

		if (obj === null)
			throw "Store: know's nothing about key: '"+key+"'";

		obj = JSON.parse(obj);
		return obj.value;
	}

	clear() {
		localStorage.clear();
	}
}