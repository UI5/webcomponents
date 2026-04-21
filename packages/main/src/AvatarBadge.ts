import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import { getIconData, getIconDataSync } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Template
import AvatarBadgeTemplate from "./AvatarBadgeTemplate.js";

// Styles
import AvatarBadgeCss from "./generated/themes/AvatarBadge.css.js";

import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

const ICON_NOT_FOUND = "ICON_NOT_FOUND";

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

	async onBeforeRendering() {
		const icon = this.icon;
		if (!icon) {
			this.invalid = true;
			this.effectiveAccessibleName = undefined;
			return;
		}

		const iconData = getIconDataSync(icon) || await getIconData(icon);
		this.invalid = !iconData || iconData === ICON_NOT_FOUND;

		if (this.invalid) {
			this.effectiveAccessibleName = undefined;
		} else if (this.accessibleName) {
			// User-provided accessible name takes precedence
			this.effectiveAccessibleName = this.accessibleName;
		} else if (iconData && iconData !== ICON_NOT_FOUND && iconData.accData) {
			// Use the icon's registered i18n label (e.g., message-error -> "Error")
			if (iconData.packageName) {
				const i18nBundle = await getI18nBundle(iconData.packageName);
				this.effectiveAccessibleName = i18nBundle.getText(iconData.accData) || undefined;
			} else {
				this.effectiveAccessibleName = iconData.accData.defaultText || undefined;
			}
		} else {
			// Derive from icon name (e.g., "edit" -> "Edit")
			this.effectiveAccessibleName = icon.charAt(0).toUpperCase() + icon.slice(1);
		}
	}
}

AvatarBadge.define();

export default AvatarBadge;
