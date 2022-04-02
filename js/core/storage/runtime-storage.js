var RuntimeStorage = (function () {
	var instance;

	function createInstance() {
		var object = {};
		return object;
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		},

		set: function(key, value) {
			this.getInstance()[key] = value;
		},

		remove: function(key) {
			delete this.getInstance()[key];
		},

		has: function(key) {
			return typeof this.getInstance()[key] !== "undefined";
		},

		get: function(key) {
			if (typeof this.getInstance()[key] !== "undefined") {
				return this.getInstance()[key];
			}

			throw "Store: know's nothing about key: '"+key+"'";
		}
	};
})();