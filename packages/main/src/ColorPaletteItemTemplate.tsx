import type ColorPaletteItem from "./ColorPaletteItem.js";
import Tooltip from "./Tooltip.js";

export default function ColorPaletteItemTemplate(this: ColorPaletteItem) {
	return (
		<>
		<div
			id={`${this._id}-root`}
			class="ui5-cp-item"
			tabindex={parseInt(this.forcedTabIndex)}
			role="button"
			aria-label={this.getLabelText}
			aria-pressed={this.selected}
			onClick={this._onClick}
		></div>
		{ this.getLabelText &&
			<Tooltip text={this.getLabelText} opener={`${this._id}-root`} />
		}
		</>
	);
}
