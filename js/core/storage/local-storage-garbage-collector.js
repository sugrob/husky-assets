var LocalStorageGarbageCollector = (function () {
	var instance;

	function createInstance() {
		var object = {};
		return object;
	}

	return {
		clear: function () {
			if (!instance) {
				instance = createInstance();
				localStorage.clear();
				return true;
			}
			return false;
		}
	};
})();