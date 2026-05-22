import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import SideNavigationSubItemTemplate from "./SideNavigationSubItemTemplate.js";
import "@ui5/webcomponents/dist/Tag.js";

// Styles
import SideNavigationSubItemCss from "./generated/themes/SideNavigationSubItem.css.js";

/**
 * @class
 *
 * ### Overview
 * Represents a single navigation action within `ui5-side-navigation-item`.
 * The `ui5-side-navigation-sub-item` is intended to be used inside a `ui5-side-navigation-item` only.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";`
 *
 * @constructor
 * @extends SideNavigationSelectableItemBase
 * @public
 * @abstract
 * @since 1.0.0-rc.8
 */
@customElement({
	tag: "ui5-side-navigation-sub-item",
	renderer: jsxRender,
	template: SideNavigationSubItemTemplate,
	styles: SideNavigationSubItemCss,
})
class SideNavigationSubItem extends SideNavigationSelectableItemBase {
	/**
	 * Defines the tag to be displayed.
	 *
	 * **Note:** Only one `ui5-tag` is allowed. The tag should use `design="Set2"`, `hide-state-icon`,
	 * and `colorScheme` values 5-10 to avoid confusion with semantic colors (1-4).
	 *
	 * **Note:** It is recommended to limit tag width to 64px (4rem). If tag text exceeds this,
	 * use shortened forms or abbreviations (e.g., "Experimental" → "Exp").
	 *
	 * @public
	 * @since 2.7.0
	 */
	@slot({ type: HTMLElement })
	tag!: Slot<HTMLElement>;

	get hasTag() {
		return !!this.tag.length;
	}

	get _textId() {
		return `${this._id}-text`;
	}

	get _describedBy() {
		return this.hasTag ? this._tagId : undefined;
	}

	_onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);
	}

	_onkeyup(e: KeyboardEvent) {
		super._onkeyup(e);
	}

	_onfocusin(e: FocusEvent) {
		super._onfocusin(e);
	}

	_onclick(e: MouseEvent) {
		super._onclick(e);
	}

	get classesArray() {
		const classes = super.classesArray;

		if (this.icon) {
			classes.push("ui5-sn-item-has-icon");
		}

		if (this.effectiveDisabled) {
			classes.push("ui5-sn-item-disabled");
		}

		return classes;
	}
}

SideNavigationSubItem.define();

export default SideNavigationSubItem;
