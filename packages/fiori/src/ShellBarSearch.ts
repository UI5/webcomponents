import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import Search from "./Search.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ShellBarSearchTemplate from "./ShellBarSearchTemplate.js";
import ShellBarSearchCss from "./generated/themes/ShellBarSearch.css.js";

import {
	SEARCH_FIELD_SEARCH_ICON,
	SHELLBAR_SEARCH_EXPANDED,
	SHELLBAR_SEARCH_COLLAPSED,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 * Search field for the ShellBar component.
 * @constructor
 * @extends Search
 * @public
 * @since 2.10.0
 * @experimental
 */
@customElement({
	tag: "ui5-shellbar-search",
	template: ShellBarSearchTemplate,
	styles: [
		Search.styles,
		ShellBarSearchCss,
	],
})

class ShellBarSearch extends Search {
	/**
	 * Indicates whether the suggestions popover should be opened on focus.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	autoOpen = false;

	_handleSearchIconPress() {
		super._handleSearchIconPress();

		if (this.collapsed) {
			this.collapsed = false;
		} else if (!this.value) {
			this.collapsed = true;
		}
	}

	_onFocusOutSearch(e: FocusEvent) {
		if (isPhone()) {
			return;
		}

		super._onFocusOutSearch(e);
	}

	_handleInput(e: InputEvent) {
		super._handleInput(e);

		if (isPhone()) {
			this._performItemSelectionOnMobile = this._shouldPerformSelectionOnMobile(e.inputType);
		}
	}

	get _effectiveIconTooltip() {
		if (this.collapsed) {
			return ShellBarSearch.i18nBundle.getText(SHELLBAR_SEARCH_COLLAPSED);
		}

		if (this.value) {
			return ShellBarSearch.i18nBundle.getText(SEARCH_FIELD_SEARCH_ICON);
		}

		return ShellBarSearch.i18nBundle.getText(SHELLBAR_SEARCH_EXPANDED);
	}

	get nativeInput() {
		const domRef = this.shadowRoot;

		return isPhone() ? domRef?.querySelector<HTMLInputElement>(`[ui5-responsive-popover] input`) : super.nativeInput;
	}

	_onfocusin() {
		super._onfocusin();

		if (this.autoOpen) {
			this.open = true;
			this.fireDecoratorEvent("open");
		}
	}

	onBeforeRendering(): void {
		super.onBeforeRendering();

		if (isPhone()) {
			this.collapsed = true;
		}
	}
}

ShellBarSearch.define();

export default ShellBarSearch;
