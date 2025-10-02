import type TableCell from "./TableCell.js";

export default function TableCellTemplate(this: TableCell) {
	return (
		<>
			{ this._popin ?
				<>
					<div id="popin-header" ref={this._injectHeaderNodes.bind(this)}></div>
					<span id="popin-colon" aria-hidden="true">{this._i18nPopinColon}</span>
					<slot id="popin-content"></slot>
				</>
				:
				<slot></slot>
			}
		</>
	);
}
