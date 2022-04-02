class AddListToolbarControl extends ListToolbarControl {
	constructor(configuration) {
		super(configuration);
	}

	createElement() {
		return $('<div class="toolbar-control-item toolbar-control-add">Добавить</div>');
	}

	__isIdentifiableEvent() {
		return false;
	}
}