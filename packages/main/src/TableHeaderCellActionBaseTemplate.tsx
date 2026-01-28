import Button from "./Button.js";
import ButtonDesign from "./types/ButtonDesign.js";
import type TableHeaderCellActionBase from "./TableHeaderCellActionBase.js";

export default function TableHeaderCellActionBaseTemplate(this: TableHeaderCellActionBase) {
	return (
		<Button
			icon={this._icon}
			tooltip={this._tooltip}
			onClick={this._onClick}
			design={ButtonDesign.Transparent}
		></Button>
	);
}
