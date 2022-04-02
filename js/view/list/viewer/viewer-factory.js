class ListCellViewerFactory {
	constructor(type, configuration) {
		if(type === "String")
			return new StringListCellViewer(configuration);

		if(type === "Checkbox")
			return new CheckboxListCellViewer(configuration);

		throw "Wrong cell viewer type: '"+type+"'";
	}
}