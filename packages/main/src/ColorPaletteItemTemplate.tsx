import type ColorPaletteItem from "./ColorPaletteItem.js";

export default function ColorPaletteItemTemplate(this: ColorPaletteItem) {
	return (
		<div
			class="ui5-cp-item"
			data-sap-focus-ref
			tabindex={parseInt(this.forcedTabIndex)}
			role="button"
			aria-label={`${this.colorLabel} - ${this.index}: ${this.value}`}
			aria-pressed={this.selected}
			title={`${this.colorLabel} - ${this.index}: ${this.value}`}
		></div>
	);
}
