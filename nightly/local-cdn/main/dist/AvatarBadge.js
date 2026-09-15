var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AvatarBadge = class AvatarBadge extends UI5Element {
    constructor() {
        super(...arguments);
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
        this.state = ValueState.None;
        /**
         * @private
         */
        this.invalid = false;
    }
    async onBeforeRendering() {
        const icon = this.icon;
        if (!icon) {
            this.invalid = true;
            this.effectiveTooltip = undefined;
            return;
        }
        const iconData = getIconDataSync(icon) || await getIconData(icon);
        this.invalid = !iconData || iconData === ICON_NOT_FOUND;
        if (this.invalid) {
            this.effectiveTooltip = undefined;
        }
        else if (this.tooltip) {
            // User-provided tooltip takes precedence
            this.effectiveTooltip = this.tooltip;
        }
        else if (iconData && iconData !== ICON_NOT_FOUND && iconData.accData) {
            // Use the icon's registered i18n label (e.g., message-error -> "Error")
            if (iconData.packageName) {
                const i18nBundle = await getI18nBundle(iconData.packageName);
                this.effectiveTooltip = i18nBundle.getText(iconData.accData) || undefined;
            }
            else {
                this.effectiveTooltip = iconData.accData.defaultText || undefined;
            }
        }
        else {
            // Derive from icon name (e.g., "edit" -> "Edit")
            this.effectiveTooltip = icon.charAt(0).toUpperCase() + icon.slice(1);
        }
    }
};
__decorate([
    property()
], AvatarBadge.prototype, "icon", void 0);
__decorate([
    property()
], AvatarBadge.prototype, "tooltip", void 0);
__decorate([
    property()
], AvatarBadge.prototype, "state", void 0);
__decorate([
    property({ type: Boolean })
], AvatarBadge.prototype, "invalid", void 0);
__decorate([
    property({ noAttribute: true })
], AvatarBadge.prototype, "effectiveTooltip", void 0);
AvatarBadge = __decorate([
    customElement({
        tag: "ui5-avatar-badge",
        languageAware: true,
        renderer: jsxRenderer,
        styles: AvatarBadgeCss,
        template: AvatarBadgeTemplate,
    })
], AvatarBadge);
AvatarBadge.define();
export default AvatarBadge;
//# sourceMappingURL=AvatarBadge.js.map