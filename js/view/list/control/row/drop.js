class DropListRowControl extends ListRowControl {
	constructor(configuration) {
		super(configuration);
	}

	createElement() {
		return $('<div class="row-control-item row-control-drop"></div>');
	}
}