import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getIconDataSync } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

// Template
import AvatarBadgeTemplate from "./AvatarBadgeTemplate.js";

// Styles
import AvatarBadgeCss from "./generated/themes/AvatarBadge.css.js";

import { AVATAR_TOOLTIP } from "./generated/i18n/i18n-defaults.js";

import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

/**
 * @class
 * ### Overview
 *
 * The `ui5-avatar-badge` component is used to display a badge on top of `ui5-avatar` component.
 * The badge can display an icon and supports different states for visual affordance.
 *
 * ### Usage
 *
 * The badge should be used as a child element of `ui5-avatar` in the `badge` slot.
 *
 * ```html
 * <ui5-avatar>
 *   <ui5-avatar-badge icon="edit" slot="badge"></ui5-avatar-badge>
 * </ui5-avatar>
 * ```
 *
 * ### Keyboard Handling
 *
 * The badge does not receive keyboard focus.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/AvatarBadge.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.19.0
 * @public
 */
@customElement({
	tag: "ui5-avatar-badge",
	renderer: jsxRenderer,
	styles: AvatarBadgeCss,
	template: AvatarBadgeTemplate,
})
class AvatarBadge extends UI5Element {
	/**
	 * Defines the icon name to be displayed inside the badge.
	 *
	 * **Note:** You should import the desired icon first, then use its name as "icon".
	 *
	 * `import "@ui5/webcomponents-icons/dist/{icon_name}.js"`
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines the custom text alternative of the badge icon.
	 *
	 * **Note:** If not provided, the badge uses the icon accessible name.
	 * If no icon accessible name is available, a generic fallback text is used.
	 * @default undefined
	 * @public
 	 * @since 2.22.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the state of the badge, which determines its styling.
	 *
	 * Available options:
	 * - `None` (default) - Standard appearance
	 * - `Positive` - Green, used for success/approved states
	 * - `Critical` - Orange, used for warning states
	 * - `Negative` - Red, used for error/rejected states
	 * - `Information` - Blue, used for informational states
	 *
	 * @default "None"
	 * @public
	 */
	@property()
	state: `${ValueState}` = ValueState.None;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	invalid = false;

	/**
	 * @private
	 */
	@property({ noAttribute: true })
	effectiveAccessibleName?: string;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onBeforeRendering() {
		const iconData = this.icon ? getIconDataSync(this.icon) : undefined;
		this.invalid = !this.icon || !iconData;

		if (this.invalid) {
			this.effectiveAccessibleName = undefined;
		} else if (this.accessibleName) {
			// User-provided accessible name takes precedence
			this.effectiveAccessibleName = this.accessibleName;
		} else {
			// Derive from icon name (e.g., "edit" -> "Edit")
			// If not possible, fall back to i18n "Avatar" text
			this.effectiveAccessibleName = this.icon
				? this.icon.charAt(0).toUpperCase() + this.icon.slice(1)
				: AvatarBadge.i18nBundle.getText(AVATAR_TOOLTIP);
		}
	}
}

AvatarBadge.define();

export default AvatarBadge;
