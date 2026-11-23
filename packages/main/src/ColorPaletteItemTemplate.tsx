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
			data-ui5-has-tooltip={this.getLabelText ? `${this._id}-tooltip` : undefined}
			onClick={this._onClick}
		></div>
		{ this.getLabelText &&
			// Review (double-announcement): the item's accessible name is
			// `getLabelText` (aria-label), which equals the tooltip text, so no
			// `aria-describedby` here. Tooltip is visual only; `data-ui5-has-tooltip`
			// drives the gesture.
			<Tooltip id={`${this._id}-tooltip`}>{this.getLabelText}</Tooltip>
		}
		</>
	);
}
