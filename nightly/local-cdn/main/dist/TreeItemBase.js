var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TreeItemBase_1;
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import { isLeft, isRight } from "@ui5/webcomponents-base/dist/Keys.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import ListItem from "./ListItem.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import { TREE_ITEM_ARIA_LABEL, TREE_ITEM_EXPAND_NODE, TREE_ITEM_COLLAPSE_NODE, } from "./generated/i18n/i18n-defaults.js";
// Template
import TreeItemBaseTemplate from "./TreeItemBaseTemplate.js";
// Styles
import treeItemCss from "./generated/themes/TreeItem.css.js";
/**
 * A class to serve as a foundation
 * for the `TreeItem` and `TreeItemCustom` classes.
 * @abstract
 * @constructor
 * @extends ListItem
 * @public
 */
let TreeItemBase = TreeItemBase_1 = class TreeItemBase extends ListItem {
    constructor() {
        super(...arguments);
        /**
         * Defines the indentation of the tree list item. Use level 1 for tree list items, representing top-level tree nodes.
         * @protected
         * @default 1
         */
        this.level = 1;
        /**
         * Defines whether the tree list item should display an expand/collapse button.
         * @default false
         * @protected
         */
        this.showToggleButton = false;
        /**
         * Defines whether the tree list item will show a collapse or expand icon inside its toggle button.
         * @default false
         * @public
         */
        this.expanded = false;
        /**
         * Defines whether the item is movable.
         * @default false
         * @public
         * @since 2.0.0
         */
        this.movable = false;
        /**
         * Defines whether the tree node has children, even if currently no other tree nodes are slotted inside.
         *
         * **Note:** This property is useful for showing big tree structures where not all nodes are initially loaded due to performance reasons.
         * Set this to `true` for nodes you intend to load lazily, when the user clicks the expand button.
         * It is not necessary to set this property otherwise. If a tree item has children, the expand button will be displayed anyway.
         * @default false
         * @public
         */
        this.hasChildren = false;
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
         * @private
         * @since 1.0.0-rc.11
         */
        this.forcedSetsize = 1;
        /**
         * @private
         * @since 1.0.0-rc.11
         */
        this.forcedPosinset = 1;
        /**
         * Defines if the item should be collapsible or not.
         * @private
         * @default false
         * @since 1.10.0
         */
        this._fixed = false;
        /**
         * @private
         */
        this._hasImage = false;
    }
    onBeforeRendering() {
        this.showToggleButton = this.requiresToggleButton;
        this._hasImage = this.hasImage;
    }
    get classes() {
        const allClasses = super.classes;
        allClasses.main["ui5-li-root-tree"] = true;
        return allClasses;
    }
    get styles() {
        return {
            preContent: {
                "padding-inline-start": `calc(var(--_ui5-tree-indent-step) * ${this.effectiveLevel})`,
            },
        };
    }
    get requiresToggleButton() {
        return !this._fixed ? (this.hasChildren || this.items.length > 0) : false;
    }
    get effectiveLevel() {
        return this.level - 1;
    }
    get hasParent() {
        return this.level > 1;
    }
    get hasImage() {
        return !!this.image.length;
    }
    get _toggleIconName() {
        return this.expanded ? "navigation-down-arrow" : "navigation-right-arrow";
    }
    get _ariaLabel() {
        return TreeItemBase_1.i18nBundle.getText(TREE_ITEM_ARIA_LABEL);
    }
    get _accInfo() {
        const accInfoSettings = {
            role: "treeitem",
            ariaExpanded: this.showToggleButton ? this.expanded : undefined,
            ariaLevel: this.level,
            posinset: this.forcedPosinset,
            setsize: this.forcedSetsize,
            ariaSelectedText: this.ariaSelectedText,
            listItemAriaLabel: !this.accessibleName ? this._ariaLabel : undefined,
            ariaOwns: this.expanded ? `${this._id}-subtree` : undefined,
            ariaHaspopup: this.accessibilityAttributes.hasPopup,
        };
        return { ...super._accInfo, ...accInfoSettings };
    }
    /**
     * Used to duck-type TreeItem elements without using instanceof
     * @default true
     * @protected
     */
    get isTreeItem() {
        return true;
    }
    /**
     * Call this method to manually switch the `expanded` state of a tree item.
     * @public
     */
    toggle() {
        this.expanded = !this.expanded;
    }
    _toggleClick(e) {
        e.stopPropagation();
        this.fireDecoratorEvent("toggle", { item: this });
    }
    _onkeydown(e) {
        super._onkeydown(e);
        if (!this._fixed && this.showToggleButton && isRight(e)) {
            if (!this.expanded) {
                this.fireDecoratorEvent("toggle", { item: this });
            }
            else {
                this.fireDecoratorEvent("step-in", { item: this });
            }
        }
        if (!this._fixed && isLeft(e)) {
            if (this.expanded) {
                this.fireDecoratorEvent("toggle", { item: this });
            }
            else if (this.hasParent) {
                this.fireDecoratorEvent("step-out", { item: this });
            }
        }
    }
    get iconAccessibleName() {
        return this.expanded ? TreeItemBase_1.i18nBundle.getText(TREE_ITEM_COLLAPSE_NODE) : TreeItemBase_1.i18nBundle.getText(TREE_ITEM_EXPAND_NODE);
    }
};
__decorate([
    property({ type: Number })
], TreeItemBase.prototype, "level", void 0);
__decorate([
    property()
], TreeItemBase.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean })
], TreeItemBase.prototype, "showToggleButton", void 0);
__decorate([
    property({ type: Boolean })
], TreeItemBase.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean })
], TreeItemBase.prototype, "movable", void 0);
__decorate([
    property({ type: Boolean })
], TreeItemBase.prototype, "indeterminate", void 0);
__decorate([
    property({ type: Boolean })
], TreeItemBase.prototype, "hasChildren", void 0);
__decorate([
    property()
], TreeItemBase.prototype, "additionalTextState", void 0);
__decorate([
    property()
], TreeItemBase.prototype, "accessibleName", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], TreeItemBase.prototype, "forcedSetsize", void 0);
__decorate([
    property({ type: Number, noAttribute: true })
], TreeItemBase.prototype, "forcedPosinset", void 0);
__decorate([
    property({ type: Boolean })
], TreeItemBase.prototype, "_fixed", void 0);
__decorate([
    property({ type: Boolean })
], TreeItemBase.prototype, "_hasImage", void 0);
__decorate([
    slot({
        type: HTMLElement,
        invalidateOnChildChange: {
            properties: false,
            slots: ["default"],
        },
        "default": true,
    })
], TreeItemBase.prototype, "items", void 0);
__decorate([
    slot()
], TreeItemBase.prototype, "image", void 0);
__decorate([
    i18n("@ui5/webcomponents")
], TreeItemBase, "i18nBundle", void 0);
TreeItemBase = TreeItemBase_1 = __decorate([
    customElement({
        languageAware: true,
        renderer: jsxRenderer,
        template: TreeItemBaseTemplate,
        styles: [
            ListItem.styles,
            treeItemCss,
        ],
    })
    /**
     * Fired when the user interacts with the expand/collapse button of the tree list item.
     * @param {HTMLElement} item the toggled item.
     * @protected
     */
    ,
    event("toggle", {
        bubbles: true,
    })
    /**
     * Fired when the user drills down into the tree hierarchy by pressing the right arrow on the tree node.
     * @param {HTMLElement} item the item on which right arrow was pressed.
     * @protected
     */
    ,
    event("step-in", {
        bubbles: true,
    })
    /**
     * Fired when the user goes up the tree hierarchy by pressing the left arrow on the tree node.
     * @param {HTMLElement} item the item on which left arrow was pressed.
     * @protected
     */
    ,
    event("step-out", {
        bubbles: true,
    })
], TreeItemBase);
export default TreeItemBase;
//# sourceMappingURL=TreeItemBase.js.map