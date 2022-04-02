class DropListToolbarControl extends ListToolbarControl {
	constructor(configuration) {
		super(configuration);
	}

	createElement() {
		return $('<div class="toolbar-control-item toolbar-control-drop"></div>');
	}
}