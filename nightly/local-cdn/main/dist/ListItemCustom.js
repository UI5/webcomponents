var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ListItemCustom_1;
import { isTabNext, isTabPrevious, isF2, isF7, isUp, isDown, } from "@ui5/webcomponents-base/dist/Keys.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ListItem from "./ListItem.js";
import ListItemCustomTemplate from "./ListItemCustomTemplate.js";
import { getCustomAnnouncement, applyCustomAnnouncement } from "./CustomAnnouncement.js";
import { LISTITEMCUSTOM_TYPE_TEXT, } from "./generated/i18n/i18n-defaults.js";
// Styles
import ListItemCustomCss from "./generated/themes/ListItemCustom.css.js";
/**
 * @class
 *
 * A component to be used as custom list item within the `ui5-list`
 * the same way as the standard `ui5-li`.
 *
 * The component accepts arbitrary HTML content to allow full customization.
 * @csspart native-li - Used to style the main li tag of the list item
 * @csspart content - Used to style the content area of the list item
 * @csspart detail-button - Used to style the button rendered when the list item is of type detail
 * @csspart delete-button - Used to style the button rendered when the list item is in delete mode
 * @csspart radio - Used to style the radio button rendered when the list item is in single selection mode
 * @csspart checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode
 * @slot {Node[]} default - Defines the content of the component.
 * @constructor
 * @extends ListItem
 * @public
 */
let ListItemCustom = ListItemCustom_1 = class ListItemCustom extends ListItem {
    constructor() {
        super(...arguments);
        /**
         * Defines whether the item is movable.
         * @default false
         * @public
         * @since 2.0.0
         */
        this.movable = false;
    }
    _onkeydown(e) {
        const isFocused = this.matches(":focus");
        const shouldHandle = isFocused
            || isTabNext(e) || isTabPrevious(e)
            || isF2(e) || isF7(e)
            || isUp(e) || isDown(e);
        if (shouldHandle) {
            super._onkeydown(e);
        }
    }
    _onkeyup(e) {
        const isFocused = this.matches(":focus");
        const shouldHandle = isFocused
            || isTabNext(e) || isTabPrevious(e)
            || isF2(e) || isF7(e)
            || isUp(e) || isDown(e);
        if (shouldHandle) {
            super._onkeyup(e);
        }
    }
    get _accessibleNameRef() {
        return `${this._id}-invisibleText`;
    }
    _onfocusin(e) {
        super._onfocusin(e);
        // Skip updating invisible text during drag operations
        if (!this._isDragging() && !this.accessibleName) {
            this._updateInvisibleTextContent();
        }
    }
    _onfocusout(e) {
        super._onfocusout(e);
        // Skip clearing invisible text during drag operations
        if (!this._isDragging() && !this.accessibleName) {
            this._clearInvisibleTextContent();
        }
    }
    /**
     * Checks if this element is currently being dragged
     * @returns True if this element is being dragged
     * @private
     */
    _isDragging() {
        // Check if this specific element has the data-moving attribute
        return this.hasAttribute("data-moving");
    }
    _updateInvisibleTextContent() {
        const listItem = this._listItem;
        if (!listItem) {
            return;
        }
        // Get accessibility announcements
        const accessibilityText = getCustomAnnouncement(this);
        // Apply the announcement using the shared invisible text element from CustomAnnouncement
        applyCustomAnnouncement(listItem, accessibilityText);
    }
    _clearInvisibleTextContent() {
        const listItem = this._listItem;
        if (!listItem) {
            return;
        }
        // Clear the announcement by passing empty text
        applyCustomAnnouncement(listItem, "");
    }
    /**
     * Gets delete button nodes to process for accessibility
     * @returns Array of nodes to process
     * @private
     */
    _getDeleteButtonNodes() {
        if (!this.modeDelete) {
            return [];
        }
        if (this.hasDeleteButtonSlot) {
            // Return custom delete buttons from slot
            return this.deleteButton;
        }
        // Return the built-in delete button from the shadow DOM if it exists
        const deleteButton = this.shadowRoot?.querySelector(`#${this._id}-deleteSelectionElement`);
        return deleteButton ? [deleteButton] : [];
    }
    get classes() {
        const result = super.classes;
        result.main["ui5-custom-li-root"] = true;
        return result;
    }
    get accessibilityInfo() {
        const children = [];
        // Get slotted content elements (default slot)
        const defaultSlot = this.shadowRoot?.querySelector("slot:not([name])");
        if (defaultSlot) {
            const assignedNodes = defaultSlot.assignedNodes({ flatten: true });
            children.push(...assignedNodes);
        }
        // Get delete button nodes
        const deleteButtonNodes = this._getDeleteButtonNodes();
        children.push(...deleteButtonNodes);
        return {
            type: ListItemCustom_1.i18nBundle.getText(LISTITEMCUSTOM_TYPE_TEXT),
            children,
        };
    }
};
__decorate([
    property({ type: Boolean })
], ListItemCustom.prototype, "movable", void 0);
__decorate([
    property()
], ListItemCustom.prototype, "accessibleName", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], ListItemCustom, "i18nBundle", void 0);
ListItemCustom = ListItemCustom_1 = __decorate([
    customElement({
        tag: "ui5-li-custom",
        template: ListItemCustomTemplate,
        renderer: jsxRenderer,
        styles: [ListItem.styles, ListItemCustomCss],
    })
], ListItemCustom);
ListItemCustom.define();
export default ListItemCustom;
//# sourceMappingURL=ListItemCustom.js.map