var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ListItemGroupHeader_1;
import { slotStrict as slot, property, customElement } from "@ui5/webcomponents-base/dist/decorators.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import toLowercaseEnumValue from "@ui5/webcomponents-base/dist/util/toLowercaseEnumValue.js";
import ListItemBase from "./ListItemBase.js";
import { GROUP_HEADER_TEXT } from "./generated/i18n/i18n-defaults.js";
// Template
import ListItemGroupHeaderTemplate from "./ListItemGroupHeaderTemplate.js";
// Styles
import ListItemGroupHeaderCss from "./generated/themes/ListItemGroupHeader.css.js";
import ListItemAccessibleRole from "./types/ListItemAccessibleRole.js";
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
 * The `ui5-li-group-header` is a special list item, used only to separate other list items into logical groups.
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @constructor
 * @extends ListItemBase
 * @private
 */
let ListItemGroupHeader = ListItemGroupHeader_1 = class ListItemGroupHeader extends ListItemBase {
    constructor() {
        super(...arguments);
        this.accessibleRole = ListItemAccessibleRole.ListItem;
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
         * @since 2.15.0
         */
        this.wrappingType = "None";
        /**
         * Defines the current media query size.
         * @default "S"
         * @private
         */
        this.mediaRange = "S";
    }
    get effectiveAccRole() {
        return toLowercaseEnumValue(this.accessibleRole);
    }
    get groupItem() {
        return true;
    }
    get _pressable() {
        return false;
    }
    get groupHeaderText() {
        return ListItemGroupHeader_1.i18nBundle.getText(GROUP_HEADER_TEXT);
    }
    get defaultSlotText() {
        return this.textContent;
    }
    get ariaLabelText() {
        return [this.textContent, this.accessibleName].filter(Boolean).join(" ");
    }
    get hasSubItems() {
        return this.subItems.length > 0;
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        // Only load ExpandableText if "Normal" wrapping is used
        if (this.wrappingType === "Normal") {
            // If feature is already loaded (preloaded by the user via importing ListItemGroupHeaderExpandableText.js), the template is already available
            if (ListItemGroupHeader_1.ExpandableTextTemplate) {
                this.expandableTextTemplate = ListItemGroupHeader_1.ExpandableTextTemplate;
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
     * Determines the maximum characters to display based on the current media range.
     * - Size S: 100 characters
     * - Size M and larger: 300 characters
     * @private
     */
    get _maxCharacters() {
        return this.mediaRange === "S" ? MAX_CHARACTERS_SIZE_S : MAX_CHARACTERS_SIZE_M;
    }
    /**
     * Returns the content text, either from text property or from the default slot
     * @private
     */
    get _textContent() {
        return this.defaultSlotText || this.groupHeaderText || "";
    }
};
__decorate([
    property()
], ListItemGroupHeader.prototype, "accessibleName", void 0);
__decorate([
    property()
], ListItemGroupHeader.prototype, "accessibleRole", void 0);
__decorate([
    property()
], ListItemGroupHeader.prototype, "wrappingType", void 0);
__decorate([
    property()
], ListItemGroupHeader.prototype, "mediaRange", void 0);
__decorate([
    property({ noAttribute: true })
], ListItemGroupHeader.prototype, "expandableTextTemplate", void 0);
__decorate([
    slot()
], ListItemGroupHeader.prototype, "subItems", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], ListItemGroupHeader, "i18nBundle", void 0);
ListItemGroupHeader = ListItemGroupHeader_1 = __decorate([
    customElement({
        tag: "ui5-li-group-header",
        languageAware: true,
        template: ListItemGroupHeaderTemplate,
        styles: [ListItemBase.styles, ListItemGroupHeaderCss],
    })
], ListItemGroupHeader);
ListItemGroupHeader.define();
export default ListItemGroupHeader;
//# sourceMappingURL=ListItemGroupHeader.js.map