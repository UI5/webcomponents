import type TableCell from "./TableCell.js";

export default function TableCellTemplate(this: TableCell) {
	return (
		<>
			{ this._popin &&
				<>
					<div class="popin-header" ref={this._injectHeaderNodes.bind(this)}></div>
					<span class="popin-colon">{this._i18nPopinColon}</span>
				</>
			}
			<slot></slot>
		</>
	);
}
