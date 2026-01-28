import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	isBackSpace,
	isSpace,
	isDelete,
	isSpaceCtrl,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { TOKEN_ARIA_DELETABLE, TOKEN_ARIA_LABEL, TOKEN_ARIA_REMOVE } from "./generated/i18n/i18n-defaults.js";

import type { IIcon } from "./Icon.js";
import type { IToken } from "./MultiInput.js";
import TokenTemplate from "./TokenTemplate.js";

// Styles
import tokenStyles from "./generated/themes/Token.css.js";

type TokenDeleteEventDetail = {
	backSpace?: boolean;
	delete?: boolean;
}

/**
 * @class
 *
 * ### Overview
 *
 * Tokens are small items of information (similar to tags) that mainly serve to visualize previously selected items.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Token.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.9
 * @implements {IToken}
 * @public
 */
@customElement({
	tag: "ui5-token",
	languageAware: true,
	renderer: jsxRenderer,
	template: TokenTemplate,
	styles: tokenStyles,
})
/**
 * Fired when the the component is selected by user interaction with mouse or by clicking space.
 * @private
 */
@event("select", {
	bubbles: true,
})

/**
 * Fired when the backspace, delete or close icon of the token is pressed
 * @param {Boolean} backSpace Indicates whether token is deleted by backspace key.
 * @param {Boolean} delete Indicates whether token is deleted by delete key.
 * @private
 */
@event("delete", {
	bubbles: true,
})
class Token extends UI5Element implements IToken {
	eventDetails!: {
		"select": void
		"delete": TokenDeleteEventDetail
	}
	/**
	 * Defines the text of the token.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines whether the component is selected or not.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines whether the component is read-only.
	 *
	 * **Note:** A read-only component can not be deleted or selected,
	 * but still provides visual feedback upon user interaction.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	readonly = false;

	/**
	 * Set by the tokenizer when a token is in the "more" area (overflowing)
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	overflows = false;

	@property({ type: Boolean })
	singleToken = false;

	/**
	 * Defines whether the component is focused or not.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	focused = false;

	/**
	 * Defines whether the token is being deleted
	 * This flag is used in the ui5-multi-combobox
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	toBeDeleted = false;

	/**
	 * Defines the tabIndex of the component.
	 * @private
	 */
	@property({ noAttribute: true })
	forcedTabIndex = "-1";

	/**
	 * Defines the close icon for the token. If nothing is provided to this slot, the default close icon will be used.
	 * Accepts `ui5-icon`.
	 * @public
	 * @since 1.0.0-rc.9
	 */
	@slot()
	closeIcon!: Slot<IIcon[]>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	_handleSelect() {
		if (!this.toBeDeleted) {
			this.selected = !this.selected;
			this.fireDecoratorEvent("select");
		}
	}

	_focusin() {
		this.focused = true;
	}

	_focusout() {
		this.focused = !this.focused;
	}

	_delete() {
		this.toBeDeleted = true;
		this.fireDecoratorEvent("delete");
	}

	_onmousedown(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;

		if (target === this.shadowRoot?.querySelector("[ui5-icon]")) {
			this.toBeDeleted = true;
		}
	}

	_keydown(e: KeyboardEvent) {
		const isBackSpacePressed = isBackSpace(e);
		const isDeletePressed = isDelete(e);

		if (!this.readonly && (isBackSpacePressed || isDeletePressed)) {
			e.preventDefault();

			this.fireDecoratorEvent("delete", {
				backSpace: isBackSpacePressed,
				"delete": isDeletePressed,
			});
		}

		if (isSpace(e) || isSpaceCtrl(e)) {
			e.preventDefault();

			this._handleSelect();
		}
	}

	get tokenDeletableText() {
		return Token.i18nBundle.getText(TOKEN_ARIA_REMOVE);
	}

	get textDom() {
		return this.getDomRef()?.querySelector(".ui5-token--text");
	}

	get isTruncatable() {
		if (!this.textDom) {
			return false;
		}

		return Math.ceil(this.textDom.getBoundingClientRect().width) < Math.ceil(this.textDom.scrollWidth);
	}

	get ariaDescription() {
		let description = Token.i18nBundle.getText(TOKEN_ARIA_LABEL);

		if (!this.readonly) {
			description += ` ${Token.i18nBundle.getText(TOKEN_ARIA_DELETABLE)}`;
		}

		return description;
	}

	// fireMyEvent(name: keyof this["_events"]) {
	// 	console.log(name);
	// }
}

Token.define();

export default Token;
export type { TokenDeleteEventDetail };
