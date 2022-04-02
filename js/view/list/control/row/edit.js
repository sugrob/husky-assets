class EditListRowControl extends ListRowControl {
	constructor(configuration) {
		super(configuration);
	}

	createElement() {
		return $('<div class="row-control-item row-control-edit"></div>');
	}
}