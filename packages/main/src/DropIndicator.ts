import UI5Element, { customElement, property, jsxRenderer } from "@ui5/webcomponents-base";
import type MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import type Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";

import DropIndicatorTemplate from "./DropIndicatorTemplate.js";

// Styles
import DropIndicatorCss from "./generated/themes/DropIndicator.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/DropIndicator.js";`
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
@customElement({
	tag: "ui5-drop-indicator",
	renderer: jsxRenderer,
	styles: DropIndicatorCss,
	template: DropIndicatorTemplate,
})
class DropIndicator extends UI5Element {
	/**
	 * Element where the drop indicator will be shown.
	 *
	 * @public
	 * @default null
	 */
	@property({ type: Object })
	targetReference: HTMLElement | null = null;

	/**
	 * Owner of the indicator and the target.
	 * @public
	 * @default null
	 */
	@property({ type: Object })
	ownerReference: HTMLElement | null = null;

	/**
	 * Placement of the indicator relative to the target.
	 *
	 * @default "Before"
	 * @public
	 */
	@property()
	placement: `${MovePlacement}` = "Before";

	/**
	 * Orientation of the indicator.
	 *
	 * @default "Vertical"
	 * @public
	 */
	@property()
	orientation: `${Orientation}` = "Vertical";

	get _positionProperty() {
		if (this.orientation === "Vertical") {
			return "left";
		}

		return "top";
	}

	constructor() {
		super();
	}

	onAfterRendering() {
		if (!this.targetReference || !this.ownerReference) {
			Object.assign(this.style, {
				display: "none",
			});

			return;
		}

		const {
			left, width, right, top, bottom, height,
		} = this.targetReference.getBoundingClientRect();
		const {
			top: containerTop,
			height: containerHeight,
		} = this.ownerReference.getBoundingClientRect();
		const style = {
			display: "",
			[this._positionProperty]: "",
			width: "",
			height: "",
		};
		let position = 0;
		let isLast = false;
		let isFirst = false;

		if (this.orientation === "Vertical") {
			switch (this.placement) {
			case "Before":
				position = left;
				break;
			case "On":
				style.width = `${width}px`;
				position = left;
				break;
			case "After":
				position = right;
				break;
			}

			style.height = `${height}px`;
		}

		if (this.orientation === "Horizontal") {
			switch (this.placement) {
			case "Before":
				position = top;
				break;
			case "On":
				style.height = `${height}px`;
				position = top;
				break;
			case "After":
				position = bottom;
				break;
			}

			style.width = `${width}px`;
			position -= containerTop;

			if (position <= 0) {
				isFirst = true;
			}

			if (position >= containerHeight) {
				isLast = true;
			}
		}

		style[this._positionProperty] = `${position}px`;
		this.toggleAttribute("first", isFirst);
		this.toggleAttribute("last", isLast);

		Object.assign(this.style, style);
	}
}

DropIndicator.define();

export default DropIndicator;
