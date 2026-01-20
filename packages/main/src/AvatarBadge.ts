import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

// Template
import AvatarBadgeTemplate from "./AvatarBadgeTemplate.js";

// Styles
import AvatarBadgeCss from "./generated/themes/AvatarBadge.css.js";

import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

/**
 * @class
 * ### Overview
 *
 * The `ui5-avatar-badge` component is used to display a badge on top of `ui5-avatar` component.
 * The badge can display an icon and supports different value states for visual affordance.
 *
 * ### Usage
 *
 * The badge should be used as a child element of `ui5-avatar` in the `badge` slot.
 *
 * ```html
 * <ui5-avatar size="M">
 *   <img src="..." alt="Avatar Image">
 *   <ui5-avatar-badge icon="accept" value-state="Positive" slot="badge"></ui5-avatar-badge>
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
	 * @since 2.19.0
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines the value state of the badge, which determines its styling.
	 *
	 * Available options:
	 * - `None` (default) - Standard appearance
	 * - `Positive` - Green, used for success/approved states
	 * - `Critical` - Orange, used for warning states
	 * - `Negative` - Red, used for error/rejected states
	 * - `Information` - Blue, used for informational states
	 *
	 * @default "None"
	 * @since 2.19.0
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = ValueState.None;
}

AvatarBadge.define();

export default AvatarBadge;
