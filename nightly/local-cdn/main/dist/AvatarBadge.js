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
import { getIconDataSync } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
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
    onBeforeRendering() {
        this.invalid = !this.icon || !getIconDataSync(this.icon);
    }
};
__decorate([
    property()
], AvatarBadge.prototype, "icon", void 0);
__decorate([
    property()
], AvatarBadge.prototype, "state", void 0);
__decorate([
    property({ type: Boolean })
], AvatarBadge.prototype, "invalid", void 0);
AvatarBadge = __decorate([
    customElement({
        tag: "ui5-avatar-badge",
        renderer: jsxRenderer,
        styles: AvatarBadgeCss,
        template: AvatarBadgeTemplate,
    })
], AvatarBadge);
AvatarBadge.define();
export default AvatarBadge;
//# sourceMappingURL=AvatarBadge.js.map