class FilterListToolbarControl extends ListToolbarControl {
	constructor(configuration) {
		super(configuration);
	}

	createElement() {
		return $('<div class="toolbar-control-item toolbar-control-filter"></div>');
	}

	__isIdentifiableEvent() {
		return false;
	}
}