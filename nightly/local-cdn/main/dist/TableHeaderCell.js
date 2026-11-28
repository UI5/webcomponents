var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property, slotStrict as slot, eventStrict as event, } from "@ui5/webcomponents-base/dist/decorators.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { toggleAttribute, isFocusedElementInside } from "./TableUtils.js";
import TableCellBase from "./TableCellBase.js";
import TableHeaderCellTemplate from "./TableHeaderCellTemplate.js";
import TableHeaderCellStyles from "./generated/themes/TableHeaderCell.css.js";
import SortOrder from "@ui5/webcomponents-base/dist/types/SortOrder.js";
import Icon from "./Icon.js";
import SortAscending from "@ui5/webcomponents-icons/dist/sort-ascending.js";
import SortDescending from "@ui5/webcomponents-icons/dist/sort-descending.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-header-cell` component represents a column in the `ui5-table`.
 *
 * As it is tightly coupled to the `ui5-table`, it should only be used in the `ui5-table-header-row`
 * to ensure correct layout and design.
 *
 * ### Accessibility
 *
 * When the `header-click` event is used to open a menu or a dialog, set the `aria-haspopup` attribute
 * on the `ui5-table-header-cell` correspondingly.
 * This allows assistive technologies to properly announce the associated popup.
 *
 * ```html
 * <ui5-table-header-cell interactive aria-haspopup="menu">Column Header</ui5-table-header-cell>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderCell.js";`
 *
 * @constructor
 * @extends TableCellBase
 * @since 2.0.0
 * @public
 */
let TableHeaderCell = class TableHeaderCell extends TableCellBase {
    constructor() {
        super(...arguments);
        /**
         * Defines the importance of the column.
         *
         * This property affects the popin behaviour.
         * Columns with higher importance will move into the popin area later then less important
         * columns.
         *
         * @default 0
         * @public
         */
        this.importance = 0;
        /**
         * Defines the sort indicator of the column.
         *
         * @default "None"
         * @since 2.8.0
         * @public
         */
        this.sortIndicator = "None";
        /**
         * Defines if the column is hidden in the popin.
         *
         * **Note:** Please be aware that hiding the column in the popin might lead to accessibility issues as
         * users might not be able to access the content of the column on small screens.
         *
         * @default false
         * @since 2.8.0
         * @public
         */
        this.popinHidden = false;
        /**
         * Defines whether the column header is interactive.
         *
         * If set to `true`, the column header can be activated by a click, <kbd>Enter</kbd> or <kbd>Space</kbd>,
         * which fires the `header-click` event and can be used, for example, to open a column menu.
         * A hover effect is shown to signal the interactivity to the user.
         *
         * **Note:** If the click opens a menu or dialog, set the `aria-haspopup` attribute on the `ui5-table-header-cell`
         * correspondingly. This allows assistive technologies to properly announce the associated popup.
         *
         * @default false
         * @since 2.29.0
         * @public
         */
        this.interactive = false;
        this.ariaRole = "columnheader";
        this._popinWidth = 0;
    }
    get _sortIconComponent() {
        return this.sortIndicator === SortOrder.None ? undefined : Icon;
    }
    get _sortIcon() {
        switch (this.sortIndicator) {
            case SortOrder.Ascending:
                return SortAscending;
            case SortOrder.Descending:
                return SortDescending;
            default:
                return undefined;
        }
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        this.style.textAlign = this.horizontalAlign || "";
        this.style.justifyContent = this.horizontalAlign || "";
        toggleAttribute(this, "aria-sort", this.sortIndicator !== SortOrder.None, this.sortIndicator.toLowerCase());
    }
    async _onclick(e) {
        if (this.interactive && !await isFocusedElementInside(this, e)) {
            this.fireDecoratorEvent("header-click");
        }
    }
    _onkeydown(e, eventOrigin) {
        if (eventOrigin !== this || !this.interactive) {
            return;
        }
        if (isEnter(e)) {
            this._setActive("keyup");
            this.fireDecoratorEvent("header-click");
        }
        else if (isSpace(e)) {
            e.preventDefault(); // prevent the table from scrolling
            this.toggleAttribute("_active", true);
        }
    }
    _onkeyup(e, eventOrigin) {
        if (eventOrigin === this && this.interactive && isSpace(e)) {
            this.removeAttribute("_active");
            this.fireDecoratorEvent("header-click");
        }
    }
    async _onpointerdown(e) {
        if (e.button !== 0 || !this.interactive) {
            return;
        }
        if (!await isFocusedElementInside(this, e)) {
            this._setActive("pointerup");
        }
    }
    _setActive(deactivationEvent) {
        this.toggleAttribute("_active", true);
        document.addEventListener(deactivationEvent, () => {
            this.removeAttribute("_active");
        }, { once: true });
    }
    get accessibilityInfo() {
        return {
            children: [this._defaultSlot, this._actionSlot],
        };
    }
};
__decorate([
    property()
], TableHeaderCell.prototype, "width", void 0);
__decorate([
    property()
], TableHeaderCell.prototype, "minWidth", void 0);
__decorate([
    property({ type: Number })
], TableHeaderCell.prototype, "importance", void 0);
__decorate([
    property()
], TableHeaderCell.prototype, "popinText", void 0);
__decorate([
    property()
], TableHeaderCell.prototype, "sortIndicator", void 0);
__decorate([
    property({ type: Boolean })
], TableHeaderCell.prototype, "popinHidden", void 0);
__decorate([
    property({ type: Boolean })
], TableHeaderCell.prototype, "interactive", void 0);
__decorate([
    slot()
], TableHeaderCell.prototype, "action", void 0);
__decorate([
    query("slot:not([name])")
], TableHeaderCell.prototype, "_defaultSlot", void 0);
__decorate([
    query("slot[name=action]")
], TableHeaderCell.prototype, "_actionSlot", void 0);
TableHeaderCell = __decorate([
    customElement({
        tag: "ui5-table-header-cell",
        styles: [TableCellBase.styles, TableHeaderCellStyles],
        template: TableHeaderCellTemplate,
    })
    /**
     * Fired when the column header is activated by a click, <kbd>Enter</kbd> or <kbd>Space</kbd>.
     *
     * **Note:** This event is only fired if the `interactive` property is set to `true`.
     *
     * @public
     * @since 2.29.0
     */
    ,
    event("header-click")
], TableHeaderCell);
TableHeaderCell.define();
export default TableHeaderCell;
//# sourceMappingURL=TableHeaderCell.js.map