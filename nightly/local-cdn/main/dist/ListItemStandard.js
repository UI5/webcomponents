var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ListItemStandard_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import ListItem from "./ListItem.js";
import ListItemStandardTemplate from "./ListItemStandardTemplate.js";
/**
 * Maximum number of characters to display for small screens (Size S)
 * @private
 */
const MAX_CHARACTERS_SIZE_S = 100;
/**
 * Maximum number of characters to display for medium and larger screens (Size M and above)
 * @private
 */
const MAX_CHARACTERS_SIZE_M = 300;
/**
 * @class
 * The `ui5-li` represents the simplest type of item for a `ui5-list`.
 *
 * This is a list item,
 * providing the most common use cases such as `text`,
 * `image` and `icon`.

 * @csspart title - Used to style the title of the list item
 * @csspart description - Used to style the description of the list item
 * @csspart additional-text - Used to style the additionalText of the list item
 * @csspart icon - Used to style the icon of the list item
 * @csspart native-li - Used to style the main li tag of the list item
 * @csspart content - Used to style the content area of the list item
 * @csspart detail-button - Used to style the button rendered when the list item is of type detail
 * @csspart delete-button - Used to style the button rendered when the list item is in delete mode
 * @csspart radio - Used to style the radio button rendered when the list item is in single selection mode
 * @csspart checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode
 * @constructor
 * @extends ListItem
 * @public
 */
let ListItemStandard = ListItemStandard_1 = class ListItemStandard extends ListItem {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the `icon` should be displayed in the beginning of the list item or in the end.
         *
         * @default false
         * @public
         */
        this.iconEnd = false;
        /**
         * Defines the state of the `additionalText`.
         *
         * Available options are: `"None"` (by default), `"Positive"`, `"Critical"`, `"Information"` and `"Negative"`.
         * @default "None"
         * @public
         * @since 1.0.0-rc.15
         */
        this.additionalTextState = "None";
        /**
         * Defines whether the item is movable.
         * @default false
         * @public
         * @since 2.0.0
         */
        this.movable = false;
        /**
         * Defines if the text of the component should wrap when it's too long.
         * When set to "Normal", the content (title, description) will be wrapped
         * using the `ui5-expandable-text` component.<br/>
         *
         * The text can wrap up to 100 characters on small screens (size S) and
         * up to 300 characters on larger screens (size M and above). When text exceeds
         * these limits, it truncates with an ellipsis followed by a text expansion trigger.
         *
         * Available options are:
         * - `None` (default) - The text will truncate with an ellipsis.
         * - `Normal` - The text will wrap (without truncation).
         *
         * @default "None"
         * @public
         * @since 2.10.0
         */
        this.wrappingType = "None";
        /**
         * Indicates if the list item has text content.
         * @private
         */
        this.hasTitle = false;
        this._hasImage = false;
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        this.hasTitle = !!(this.text || this.textContent);
        this._hasImage = this.hasImage;
        // Only load ExpandableText if "Normal" wrapping is used
        if (this.wrappingType === "Normal") {
            // If feature is already loaded (preloaded by the user via importing ListItemStandardExpandableText.js), the template is already available
            if (ListItemStandard_1.ExpandableTextTemplate) {
                this.expandableTextTemplate = ListItemStandard_1.ExpandableTextTemplate;
                // If feature is not preloaded, load the template dynamically
            }
            else {
                import("./features/ListItemStandardExpandableTextTemplate.js").then(module => {
                    this.expandableTextTemplate = module.default;
                });
            }
        }
    }
    /**
     * Returns the content text, either from text property or from the default slot
     * @private
     */
    get _textContent() {
        return this.text || this.textContent || "";
    }
    /**
     * Determines the maximum characters to display based on the current media range.
     * - Size S: 100 characters
     * - Size M and larger: 300 characters
     * @private
     */
    get _maxCharacters() {
        return this.mediaRange === "S" ? MAX_CHARACTERS_SIZE_S : MAX_CHARACTERS_SIZE_M;
    }
    get displayIconBegin() {
        return !!(this.icon && !this.iconEnd);
    }
    get displayIconEnd() {
        return !!(this.icon && this.iconEnd);
    }
    get hasImage() {
        return !!this.image.length;
    }
};
__decorate([
    property()
], ListItemStandard.prototype, "text", void 0);
__decorate([
    property()
], ListItemStandard.prototype, "description", void 0);
__decorate([
    property()
], ListItemStandard.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], ListItemStandard.prototype, "iconEnd", void 0);
__decorate([
    property()
], ListItemStandard.prototype, "additionalText", void 0);
__decorate([
    property()
], ListItemStandard.prototype, "additionalTextState", void 0);
__decorate([
    property({ type: Boolean })
], ListItemStandard.prototype, "movable", void 0);
__decorate([
    property()
], ListItemStandard.prototype, "accessibleName", void 0);
__decorate([
    property()
], ListItemStandard.prototype, "wrappingType", void 0);
__decorate([
    property({ type: Boolean })
], ListItemStandard.prototype, "hasTitle", void 0);
__decorate([
    property({ type: Boolean })
], ListItemStandard.prototype, "_hasImage", void 0);
__decorate([
    property({ noAttribute: true })
], ListItemStandard.prototype, "expandableTextTemplate", void 0);
__decorate([
    slot({ type: Node, "default": true })
], ListItemStandard.prototype, "content", void 0);
__decorate([
    slot()
], ListItemStandard.prototype, "image", void 0);
ListItemStandard = ListItemStandard_1 = __decorate([
    customElement({
        tag: "ui5-li",
        renderer: jsxRenderer,
        template: ListItemStandardTemplate,
    })
], ListItemStandard);
ListItemStandard.define();
export default ListItemStandard;
//# sourceMappingURL=ListItemStandard.js.map