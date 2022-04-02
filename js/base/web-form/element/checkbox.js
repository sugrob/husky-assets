class CheckboxFormElementViewer extends BaseFormElementViewer {
	createInput() {
		return $('<input name="'+this.name+'" type="checkbox" value="1"/>');
	}

	import(value) {
		if (this.isValidValueType(value)) {
			this.value = this.parseValue(value);
			this.fill(value);
		}
	}

	export(scope) {
		if (this.getValue()) {
			scope[this.name] = true;
		}
	}

	getValue() {
		if (typeof this.input == "undefined")
			throw "Input is still not exists";

		return this.input.is(':checked');
	}

	fill(value) {
		if (typeof this.input == "undefined")
			throw "Input is still not exists";

		this.input.prop("checked", this.parseValue(value));
	}

	isValidValueType(value) {
		return typeof value != "string"
			|| typeof value != "number"
			|| typeof value != "bigint"
			|| typeof value != "boolean"
	}

	parseValue(value) {
		return value == 1 || value == 'true' || value == true;
	}
}