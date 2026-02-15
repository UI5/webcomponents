var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FlexibleColumnLayout_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { supportsTouch } from "@ui5/webcomponents-base/dist/Device.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/vertical-grip.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isLeft, isRight, isLeftShift, isRightShift, isHome, isEnd, isEnter, isSpace, } from "@ui5/webcomponents-base/dist/Keys.js";
import FCLLayout from "./types/FCLLayout.js";
import { getDefaultLayoutsByMedia, getNextLayoutByArrowPress, } from "./fcl-utils/FCLLayout.js";
// Texts
import { FCL_START_COLUMN_TXT, FCL_MIDDLE_COLUMN_TXT, FCL_END_COLUMN_TXT, FCL_START_SEPARATOR_TOOLTIP, FCL_END_SEPARATOR_TOOLTIP, } from "./generated/i18n/i18n-defaults.js";
// Template
import FlexibleColumnLayoutTemplate from "./FlexibleColumnLayoutTemplate.js";
// Styles
import FlexibleColumnLayoutCss from "./generated/themes/FlexibleColumnLayout.css.js";
var MEDIA;
(function (MEDIA) {
    MEDIA["PHONE"] = "phone";
    MEDIA["TABLET"] = "tablet";
    MEDIA["DESKTOP"] = "desktop";
})(MEDIA || (MEDIA = {}));
const BREAKPOINTS = {
    "PHONE": 599,
    "TABLET": 1023,
};
const COLUMN = {
    START: 0,
    MID: 1,
    END: 2,
};
const SEPARATOR_DEFAULT_VALUES = {
    START: 50,
    END: 75,
};
const COLUMN_MIN_WIDTH = 248;
/**
 * @class
 *
 * ### Overview
 *
 * The `FlexibleColumnLayout` implements the list-detail-detail paradigm by displaying up to three pages in separate columns.
 * There are several possible layouts that can be changed either with the component API, or by dragging the column separators.
 *
 * ### Usage
 *
 * Use this component for applications that need to display several logical levels of related information side by side (e.g. list of items, item, sub-item, etc.).
 * The Component is flexible in a sense that the application can focus the user's attention on one particular column.
 *
 * ### Responsive Behavior
 *
 * The `FlexibleColumnLayout` automatically displays the maximum possible number of columns based on `layout` property and the window size.
 * The component would display 1 column for window size smaller than 599px, up to two columns between 599px and 1023px,
 * and 3 columns for sizes bigger than 1023px.
 *
 * **Note:** When the component displays more than one column, the minimal width of each column is 248px. Consequently, when the user drags a column separator to resize the columns, the minimal allowed width of any resized column is 248px.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 *
 * When a column separator is focused,  the following keyboard
 * shortcuts allow the user to resize the columns and change the layout:
 *
 * - [Shift] + [Left] or [Shift] + [Right] - Moves the separator to the left or right, which resizes the columns accordingly.
 * - [Left] or [Right] - Moves the separator to the left or right with a bigger step, which resizes the columns accordingly.
 * - [Home] - Moves the separator to the start position.
 * - [End] - Moves the separator to the end position.
 * - This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.8
 */
let FlexibleColumnLayout = FlexibleColumnLayout_1 = class FlexibleColumnLayout extends UI5Element {
    constructor() {
        super();
        /**
        * Defines the columns layout and their proportion.
        *
        * **Note:** The layout also depends on the screen size - one column for screens smaller than 599px,
        * two columns between 599px and 1023px and three columns for sizes bigger than 1023px.
        *
        * **For example:** layout=`TwoColumnsStartExpanded` means the layout will display up to two columns
        * in 67%/33% proportion.
        * @default "OneColumn"
        * @public
        */
        this.layout = "OneColumn";
        /**
        * Specifies if the user is allowed to change the columns layout by dragging the separator between the columns.
        * @default false
        * @public
        * @since 2.0.0
        */
        this.disableResizing = false;
        /**
        * Defines additional accessibility attributes on different areas of the component.
        *
        * The accessibilityAttributes object has the following fields,
        * where each field is an object supporting one or more accessibility attributes:
        *
        *  - **startColumn**: `startColumn.role` and `startColumn.name`.
        *  - **midColumn**: `midColumn.role` and `midColumn.name`.
        *  - **endColumn**: `endColumn.role` and `endColumn.name`.
        *  - **startSeparator**: `startSeparator.role` and `startSeparator.name`.
        *  - **endSeparator**: `endSeparator.role` and `endSeparator.name`.
        *
        * The accessibility attributes support the following values:
        *
        * - **role**: Defines the accessible ARIA landmark role of the area.
        * Accepts the following values: `none`, `complementary`, `contentinfo`, `main` or `region`.
        *
        * - **name**: Defines the accessible ARIA name of the area.
        * Accepts any string.
        *
        * @default {}
        * @public
        * @since 2.0.0
        */
        this.accessibilityAttributes = {};
        /**
        * Allows to customize the column proportions per screen size and layout.
        * If no custom proportion provided for a specific layout, the default will be used.
        *
        * **Notes:**
        *
        * - The proportions should be given in percentages. For example ["30%", "40%", "30%"], ["70%", "30%", 0], etc.
        * - The proportions should add up to 100%.
        * - Hidden columns are marked as "0px", e.g. ["0px", "70%", "30%"]. Specifying 0 or "0%" for hidden columns is also valid.
        * - If the proportions do not match the layout (e.g. if provided proportions ["70%", "30%", "0px"] for "OneColumn" layout), then the default proportions will be used instead.
        * - Whenever the user drags the columns separator to resize the columns, the `layoutsConfiguration` object will be updated with the user-specified proportions for the given layout (and the `layout-configuration-change` event will be fired).
        * - No custom configuration available for the phone screen size, as the default of 100% column width is always used there.
        * @default {}
        * @public
        * @since 2.16.0
        * @experimental
        */
        this.layoutsConfiguration = {};
        /**
        * Defines the component width in px.
        * @default 0
        * @private
        */
        this._width = 0;
        /**
        * Defines the visible columns count - 1, 2 or 3.
        * @default 1
        * @private
        */
        this._visibleColumns = 1;
        /**
        * Defines if the user is currently resizing the columns by dragging their separator.
        * @default false
        * @private
        */
        this._resizing = false;
        this.onColumnCollapseAnimationEnd = (e) => {
            const columnDOM = e.target;
            columnDOM.classList.add("ui5-fcl-column--hidden");
            columnDOM.classList.remove("ui5-fcl-column-collapse-animation");
            columnDOM.removeEventListener("transitionend", this.onColumnCollapseAnimationEndRef);
        };
        this._prevLayout = null;
        this._prevLayoutsConfiguration = null;
        this.initialRendering = true;
        this._handleResize = this.handleResize.bind(this);
        this._onSeparatorMove = this.onSeparatorMove.bind(this);
        this._onSeparatorMoveEnd = this.onSeparatorMoveEnd.bind(this);
        this.onColumnCollapseAnimationEndRef = this.onColumnCollapseAnimationEnd.bind(this);
        const handleTouchStartEvent = (e) => {
            this.onSeparatorPress(e);
        };
        this._ontouchstart = {
            handleEvent: handleTouchStartEvent,
            passive: true,
        };
    }
    static get ANIMATION_DURATION() {
        return getAnimationMode() !== AnimationMode.None ? 560 : 0;
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResize.bind(this));
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._handleResize);
    }
    onAfterRendering() {
        if (this.initialRendering) {
            this.handleInitialRendering();
            return;
        }
        this.syncLayoutsConfiguration();
        this.syncLayout();
    }
    handleInitialRendering() {
        this._prevLayout = this.layout;
        this.updateLayout();
        this.initialRendering = false;
    }
    handleResize() {
        if (this.initialRendering) {
            return;
        }
        // store the previous layout
        const prevLayoutHash = this.columnLayout.join();
        // update the column layout, based on the current width
        this.updateLayout();
        // fire layout-change if the column layout changed
        if (prevLayoutHash !== this.columnLayout.join()) {
            this.fireLayoutChange(false, true);
        }
    }
    updateLayout() {
        this._width = this.widthDOM;
        this._columnLayout = this.nextColumnLayout(this.effectiveLayout);
        this._visibleColumns = this.calcVisibleColumns(this._columnLayout);
        this.toggleColumns();
    }
    syncLayout() {
        if (this._prevLayout !== this.layout) {
            this.updateLayout();
            this._prevLayout = this.layout;
        }
    }
    syncLayoutsConfiguration() {
        if (this._prevLayoutsConfiguration !== this.layoutsConfiguration) {
            this._prevLayoutsConfiguration = this.layoutsConfiguration;
            if (this.nextColumnLayout(this.layout).join() !== this._columnLayout?.join() && !this.separatorMovementSession) {
                this.updateLayout();
            }
        }
    }
    toggleColumns() {
        this.toggleColumn("start");
        this.toggleColumn("mid");
        this.toggleColumn("end");
    }
    toggleColumn(column) {
        let columnWidth;
        let columnDOM;
        if (column === "start") {
            columnWidth = this.startColumnWidth;
            columnDOM = this.startColumnDOM;
        }
        else if (column === "mid") {
            columnWidth = this.midColumnWidth;
            columnDOM = this.midColumnDOM;
        }
        else {
            columnWidth = this.endColumnWidth;
            columnDOM = this.endColumnDOM;
        }
        const currentlyHidden = this._isColumnHidden(columnWidth);
        const previouslyHidden = this._isColumnHidden(columnDOM.style.width);
        // no change
        if (currentlyHidden && previouslyHidden) {
            return;
        }
        // column resizing: from 33% to 67%, from 25% to 50%, etc.
        if (!currentlyHidden && !previouslyHidden) {
            columnDOM.style.width = typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth;
            return;
        }
        // hide column: 33% to 0, 25% to 0, etc .
        if (currentlyHidden) {
            this.collapseColumn(columnDOM);
            return;
        }
        // show column: from 0 to 33%, from 0 to 25%, etc.
        if (previouslyHidden) {
            this.expandColumn(columnDOM, columnWidth);
        }
    }
    expandColumn(columnDOM, columnWidth) {
        columnDOM.removeEventListener("transitionend", this.onColumnCollapseAnimationEndRef);
        columnDOM.classList.remove("ui5-fcl-column--hidden");
        columnDOM.style.width = typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth;
    }
    collapseColumn(columnDOM) {
        const hasAnimation = getAnimationMode() !== AnimationMode.None && !this.initialRendering;
        columnDOM.style.width = "0px";
        if (hasAnimation) {
            // hide column with delay to allow the animation runs entirely
            columnDOM.classList.add("ui5-fcl-column-collapse-animation");
            columnDOM.addEventListener("transitionend", this.onColumnCollapseAnimationEndRef);
        }
        else {
            columnDOM.classList.add("ui5-fcl-column--hidden");
        }
    }
    nextColumnLayout(layout) {
        return this.getCustomColumnLayout(layout) || this.getDefaultColumnLayout(layout);
    }
    /**
     * Gets custom column layout configuration if available and valid.
     * Ensures all visible columns meet minimum width requirements.
     * @param layout The FCL layout to get configuration for
     * @returns Normalized column layout or undefined if invalid/unavailable
     */
    getCustomColumnLayout(layout) {
        // Only allow custom configuration for tablet and desktop (not phone)
        if (!this.mediaAllowsCustomConfiguration(this.media)) {
            return undefined;
        }
        const customLayout = this.layoutsConfiguration[this.media]?.[layout]?.layout;
        if (!customLayout) {
            return undefined;
        }
        // ensure visible columns are above min-width given the current fcl total width
        const constraintCompliantLayout = this.applyMinimumWidthConstraints(customLayout);
        if (this.isValidColumnLayout(constraintCompliantLayout)) { // satisfy layout-specific contraints
            return constraintCompliantLayout;
        }
    }
    getDefaultColumnLayout(layout) {
        return getDefaultLayoutsByMedia()[this.media][layout].layout;
    }
    mediaAllowsCustomConfiguration(media) {
        return media !== MEDIA.PHONE;
    }
    /**
     * Applies minimum width constraints to column layout configuration.
     * Ensures all visible columns meet the minimum width requirement by transferring
     * space from the wider columns to the undersized columns.
     * @param columnLayout Original column layout (percentages or pixels)
     * @returns Constraint-compliant column layout in same format as input
     */
    applyMinimumWidthConstraints(columnLayout) {
        return this.doWithPixelConversion(columnLayout, pxWidths => {
            return this.adjustColumnsToMinimumWidth(pxWidths);
        });
    }
    /**
     * Adjusts column widths to ensure minimum width constraints.
     * Takes width from the widest columns to bring undersized columns up to minimum.
     * @param pxWidths Array of column widths in pixels (modified in place)
     */
    adjustColumnsToMinimumWidth(pxWidths) {
        const adjustedWidths = [...pxWidths];
        let totalDeficit = 0;
        for (let i = 0; i < adjustedWidths.length; i++) {
            const width = adjustedWidths[i];
            const isBelowMinimum = Math.ceil(width) < COLUMN_MIN_WIDTH; // ceil to avoid floating point precision issues
            if (!this._isColumnHidden(width) && isBelowMinimum) {
                totalDeficit += COLUMN_MIN_WIDTH - width;
                adjustedWidths[i] = COLUMN_MIN_WIDTH;
            }
        }
        if (totalDeficit === 0) {
            return adjustedWidths; // no adjustments were needed
        }
        // Create proportions for redistribution of the deficit based on available space above COLUMN_MIN_WIDTH
        const columnProportions = this.getColumnProportionsAboveMinWidth(pxWidths);
        // Redistribute the deficit proportionally among columns that can contribute
        for (let i = 0; i < adjustedWidths.length; i++) {
            const isVisible = adjustedWidths[i] > 0;
            if (isVisible && columnProportions[i] > 0) {
                adjustedWidths[i] -= totalDeficit * columnProportions[i];
            }
        }
        return adjustedWidths;
    }
    getColumnProportionsAboveMinWidth(columnPxWidths) {
        const widthsAboveMinWidth = columnPxWidths.map(width => {
            if (width > COLUMN_MIN_WIDTH) {
                return width - COLUMN_MIN_WIDTH;
            }
            return 0;
        });
        const total = widthsAboveMinWidth.reduce((sum, width) => sum + width, 0);
        if (total === 0) {
            return widthsAboveMinWidth;
        }
        return widthsAboveMinWidth.map(width => width / total);
    }
    /**
     * Helper that handles pixel conversion for column width operations.
     * Converts input to pixels, applies the operation, then converts back to relative widths.
     * @param columnLayout Column layout in mixed formats
     * @param operation Function that operates on pixel widths
     * @returns Column layout in percentage format
     */
    doWithPixelConversion(columnLayout, operation) {
        // Convert to pixels for calculations
        const pxWidths = columnLayout.map(width => this.convertColumnWidthToPixels(width));
        // Apply the operation
        const adjustedPxWidths = operation(pxWidths);
        // Convert back to percentage-based widths
        return adjustedPxWidths.map(width => this.convertToRelativeColumnWidth(width));
    }
    isValidColumnLayout(columnLayout) {
        const pxWidths = columnLayout?.map(w => this.convertColumnWidthToPixels(w));
        const totalWidth = pxWidths.reduce((sum, i) => sum + i, 0);
        if (Math.round(totalWidth) !== Math.round(this._availableWidthForColumns)) {
            return false;
        }
        return this.verifyColumnWidthsMatchLayout(pxWidths);
    }
    verifyColumnWidthsMatchLayout(pxWidths) {
        const columnWidths = {
            start: pxWidths[0],
            mid: pxWidths[1],
            end: pxWidths[2],
        }, startWidth = columnWidths.start, startPercentWidth = parseInt(this.convertToRelativeColumnWidth(startWidth));
        switch (this.layout) {
            case FCLLayout.TwoColumnsStartExpanded: {
                return columnWidths.start >= columnWidths.mid;
            }
            case FCLLayout.TwoColumnsMidExpanded: {
                return columnWidths.mid > columnWidths.start;
            }
            case FCLLayout.ThreeColumnsEndExpanded: {
                return (columnWidths.end > columnWidths.mid) && (startPercentWidth < 33);
            }
            case FCLLayout.ThreeColumnsStartExpandedEndHidden: {
                return (columnWidths.start >= columnWidths.mid) && columnWidths.end === 0;
            }
            case FCLLayout.ThreeColumnsMidExpanded: {
                return (columnWidths.mid >= columnWidths.end)
                    && ((this.media === MEDIA.DESKTOP && startPercentWidth < 33) // desktop
                        || (this.media === MEDIA.TABLET && startPercentWidth === 0)); // tablet
            }
            case FCLLayout.ThreeColumnsMidExpandedEndHidden: {
                return (columnWidths.mid > columnWidths.start)
                    && columnWidths.end === 0
                    && ((this.media === MEDIA.DESKTOP && startPercentWidth >= 33)
                        || (this.media === MEDIA.TABLET && startWidth >= COLUMN_MIN_WIDTH));
            }
        }
        return false;
    }
    calcVisibleColumns(colLayout) {
        return colLayout.filter(colWidth => !this._isColumnHidden(colWidth)).length;
    }
    fireLayoutChange(separatorUsed, resized) {
        const columnLayout = [...this._columnLayout]; // do not leak reference to the private _columnLayout array to prevent apps modifying its content
        this.fireDecoratorEvent("layout-change", {
            layout: this.layout,
            columnLayout,
            startColumnVisible: this.startColumnVisible,
            midColumnVisible: this.midColumnVisible,
            endColumnVisible: this.endColumnVisible,
            separatorsUsed: separatorUsed,
            resized,
        });
    }
    fireLayoutConfigurationChange() {
        const columnLayout = [...this._columnLayout]; // do not leak reference to the private _columnLayout array to prevent apps modifying its content
        this.fireDecoratorEvent("layout-configuration-change", {
            layout: this.layout,
            media: this.media,
            columnLayout,
        });
    }
    onSeparatorPress(e) {
        if (e.target === this.startArrowDOM) {
            return;
        }
        const pressedSeparator = e.target.closest(".ui5-fcl-separator");
        if ((pressedSeparator.classList.contains("ui5-fcl-separator-start") && !this.showStartSeparatorGrip)
            || (pressedSeparator.classList.contains("ui5-fcl-separator-end") && !this.showEndSeparatorGrip)) {
            return;
        }
        const isTouch = supportsTouch() && e instanceof TouchEvent, cursorPositionX = this.getPageXValueFromEvent(e);
        this.separatorMovementSession = this.initSeparatorMovementSession(pressedSeparator, cursorPositionX, isTouch);
    }
    onSeparatorMove(e) {
        e.preventDefault(); // prevent text selection etc. while dragging
        if (!this.separatorMovementSession) {
            return;
        }
        const latestCursorX = this.getPageXValueFromEvent(e), movementDelta = latestCursorX - this.separatorMovementSession.cursorPositionX;
        if (!movementDelta) {
            return;
        }
        const movedSeparator = this.separatorMovementSession.separator, latestSeparatorX = movedSeparator.getBoundingClientRect().x, isForwardMove = movementDelta > 0; // is start-to-end direction
        // if the dragged separator was re-rendered away from the cursor
        // due to change of layout during drag
        // => check if the cursor lags-behind the separator
        // and skip resizing untill the cursor catches-up with the separator
        if (this.isSeparatorAheadOfCursor(latestCursorX, latestSeparatorX, isForwardMove)) {
            this.separatorMovementSession.cursorPositionX = latestCursorX;
            return;
        }
        const layoutBeforeMove = this.separatorMovementSession.tmpFCLLayout;
        // synchronously move the separator in DOM => resizes the columns accordingly
        const layoutAfterMove = this.moveSeparator(movedSeparator, movementDelta, layoutBeforeMove);
        this.separatorMovementSession.cursorPositionX = latestCursorX;
        this.separatorMovementSession.tmpFCLLayout = layoutAfterMove;
    }
    onSeparatorMoveEnd() {
        if (!this.separatorMovementSession) {
            return;
        }
        const newLayout = this.separatorMovementSession.tmpFCLLayout;
        const newColumnLayout = [...this._columnLayout]; // obtain the values only
        this.saveUserDefinedColumnLayout(newLayout, newColumnLayout);
        this.exitSeparatorMovementSession();
    }
    initSeparatorMovementSession(separator, cursorPositionX, isTouch) {
        this.attachMoveListeners(isTouch);
        this.toggleSideAnimations(separator, false); // disable animations for side colmns to prevent slowdown while dragging
        this._resizing = true;
        return {
            separator,
            cursorPositionX,
            tmpFCLLayout: this.layout,
        };
    }
    exitSeparatorMovementSession() {
        const movedSeparator = this.separatorMovementSession.separator;
        const hasAnimation = getAnimationMode() !== AnimationMode.None;
        this.detachMoveListeners();
        this.toggleSideAnimations(movedSeparator, hasAnimation); // restore animations for side columns
        this._resizing = false;
        movedSeparator.focus();
        this.separatorMovementSession = null;
    }
    saveUserDefinedColumnLayout(newLayout, newColumnLayout) {
        const oldColumnLayout = this.getCustomColumnLayout(newLayout);
        if (this.layout !== newLayout) {
            this.layout = newLayout;
            this.fireLayoutChange(true, false);
        }
        if (oldColumnLayout?.join() !== newColumnLayout.join()) { // compare arrays' content
            this.updateLayoutsConfiguration(newLayout, newColumnLayout);
            this.fireLayoutConfigurationChange();
        }
    }
    updateLayoutsConfiguration(layout, columnLayout) {
        if (this.mediaAllowsCustomConfiguration(this.media)) {
            this.layoutsConfiguration[this.media] ??= {};
            this.layoutsConfiguration[this.media][layout] ??= { layout: [] };
            this.layoutsConfiguration[this.media][layout].layout = columnLayout;
        }
    }
    isSeparatorAheadOfCursor(cursorX, separatorX, isForwardMove) {
        if (isForwardMove) {
            return separatorX > cursorX;
        }
        return separatorX < cursorX;
    }
    calculateNewColumnWidth(columnToResize, widthDelta) {
        const columnWidths = this._columnLayout.map(x => this.convertColumnWidthToPixels(x)), adjacentColumnToResize = COLUMN.MID, // column to compensate the resize of the given column
        columnNewWidth = columnWidths[columnToResize] + widthDelta, adjacentColumnNewWidth = columnWidths[adjacentColumnToResize] - widthDelta;
        if (columnNewWidth < COLUMN_MIN_WIDTH) {
            // user is trying to shrink a column below its min-width
            // or to reveal a hidden column
            return COLUMN_MIN_WIDTH;
        }
        if (adjacentColumnNewWidth < COLUMN_MIN_WIDTH) {
            const correction = COLUMN_MIN_WIDTH - adjacentColumnNewWidth;
            // constrain the new width to preserve the min-width of the adjacent column
            return columnNewWidth - correction;
        }
        return columnNewWidth;
    }
    moveSeparator(separator, offsetX, fclLayoutBeforeMove) {
        const isStartSeparator = separator === this.startSeparatorDOM, isRTL = this.effectiveDir === "rtl";
        let selectedColumnToResize, columnWidthDelta;
        if (isRTL) {
            offsetX = -offsetX;
        }
        if (isStartSeparator) {
            selectedColumnToResize = COLUMN.START;
            // move in direction start-to-end expands start column
            columnWidthDelta = offsetX;
        }
        else {
            selectedColumnToResize = COLUMN.END;
            // move in direction start-to-end shrinks end column
            columnWidthDelta = -offsetX;
        }
        const isStartToEndDirection = offsetX > 0, newColumnWidth = this.calculateNewColumnWidth(selectedColumnToResize, columnWidthDelta), newColumnLayout = this.adjustColumnLayout(selectedColumnToResize, newColumnWidth, true), newFCLLayout = this.getNextLayoutOnSeparatorMovement(separator, isStartToEndDirection, fclLayoutBeforeMove, newColumnLayout);
        if (fclLayoutBeforeMove !== newFCLLayout) {
            this._columnLayout = this.nextColumnLayout(newFCLLayout);
            this._visibleColumns = this.calcVisibleColumns(this._columnLayout);
        }
        // apply the requested resize on <code>this._columnLayout</code>
        this.adjustColumnLayout(selectedColumnToResize, newColumnWidth);
        this.toggleColumns();
        return newFCLLayout;
    }
    adjustColumnLayout(columnToResize, newSize, createNewArray = false) {
        if (!this._columnLayout) {
            return;
        }
        const columnLayoutInPx = this._columnLayout.map(x => this.convertColumnWidthToPixels(x));
        // apply the new size
        columnLayoutInPx[columnToResize] = newSize;
        columnLayoutInPx[COLUMN.MID] = this._availableWidthForColumns
            - columnLayoutInPx[COLUMN.START]
            - columnLayoutInPx[COLUMN.END];
        const columnLayoutToAdjust = createNewArray ? [] : this._columnLayout;
        columnLayoutInPx.forEach((x, i) => {
            columnLayoutToAdjust[i] = this.convertToRelativeColumnWidth(columnLayoutInPx[i]);
        });
        return columnLayoutToAdjust;
    }
    _onArrowKeydown(e) {
        if (isEnter(e) || isSpace(e)) {
            e.preventDefault();
            const focusedElement = e.target;
            if (focusedElement === this.startArrowDOM) {
                this.switchLayoutOnArrowPress();
            }
        }
    }
    async _onSeparatorKeydown(e) {
        const separator = e.target;
        if (!separator.classList.contains("ui5-fcl-separator")) {
            return;
        }
        const stepSize = 2, bigStepSize = this._width, isRTL = this.effectiveDir === "rtl";
        let step = 0;
        if (isLeft(e)) {
            step = -stepSize * 10;
        }
        else if (isRight(e)) {
            step = stepSize * 10;
        }
        else if (isLeftShift(e)) {
            step = -stepSize;
        }
        else if (isRightShift(e)) {
            step = stepSize;
        }
        else if (isHome(e)) {
            e.preventDefault();
            step = isRTL ? bigStepSize : -bigStepSize;
        }
        else if (isEnd(e)) {
            e.preventDefault();
            step = isRTL ? -bigStepSize : bigStepSize;
        }
        if (!step) {
            return;
        }
        if (!this.separatorMovementSession) {
            this.separatorMovementSession = this.initSeparatorMovementSession(separator, 0, false);
        }
        const layoutBeforeMove = this.separatorMovementSession.tmpFCLLayout;
        const layoutAfterMove = this.moveSeparator(separator, step, layoutBeforeMove);
        this.separatorMovementSession.tmpFCLLayout = layoutAfterMove;
        await renderFinished();
        separator.focus();
    }
    _onSeparatorKeyUp() {
        if (this.separatorMovementSession) {
            this.onSeparatorMoveEnd();
        }
    }
    attachMoveListeners(isTouch) {
        const domRef = this.getDomRef();
        if (!domRef) {
            return;
        }
        if (isTouch && supportsTouch()) {
            domRef.addEventListener("touchmove", this._onSeparatorMove);
            domRef.addEventListener("touchend", this._onSeparatorMoveEnd);
        }
        else {
            domRef.addEventListener("mousemove", this._onSeparatorMove);
            domRef.addEventListener("mouseup", this._onSeparatorMoveEnd);
        }
    }
    detachMoveListeners() {
        const domRef = this.getDomRef();
        if (!domRef) {
            return;
        }
        domRef.removeEventListener("mouseup", this._onSeparatorMoveEnd);
        domRef.removeEventListener("touchend", this._onSeparatorMoveEnd);
        // Only one of the following was attached, but it's ok to remove both as there is no error
        domRef.removeEventListener("mousemove", this._onSeparatorMove);
        domRef.removeEventListener("touchmove", this._onSeparatorMove);
    }
    toggleSideAnimations(separator, shouldAnimate) {
        const adjacentColumns = [
            separator.previousElementSibling,
            separator.nextElementSibling,
        ];
        adjacentColumns.forEach(column => column.classList.toggle("ui5-fcl-column-animation", shouldAnimate));
    }
    getPageXValueFromEvent(e) {
        if (supportsTouch() && e instanceof TouchEvent) {
            if (e.changedTouches && e.changedTouches.length > 0) {
                return e.changedTouches[0].pageX;
            }
            return 0;
        }
        return e.pageX; // MouseEvent
    }
    convertColumnWidthToPixels(width) {
        if (typeof width === "number") {
            return width;
        }
        const parsedValue = parseFloat(width), totalWidth = this._availableWidthForColumns;
        if (width.endsWith("%")) {
            return (totalWidth / 100) * parsedValue;
        }
        return parsedValue;
    }
    convertToRelativeColumnWidth(pxWidth) {
        if (typeof pxWidth === "string") {
            return pxWidth;
        }
        if (pxWidth === 0) {
            return "0px";
        }
        return `${(pxWidth / this._availableWidthForColumns) * 100}%`;
    }
    getNextLayoutOnSeparatorMovement(separator, isStartToEndDirection, fclLayoutBeforeMove, columnLayoutAfterMove) {
        const isStartSeparator = separator === this.startSeparatorDOM, separatorName = isStartSeparator ? "start" : "end", moved = (options) => {
            return options.from === fclLayoutBeforeMove
                && options.separator === separatorName
                && options.forward === isStartToEndDirection;
        }, newColumnLayout = columnLayoutAfterMove.map(x => this.convertColumnWidthToPixels(x)), newColumnWidths = {
            start: newColumnLayout[0],
            mid: newColumnLayout[1],
            end: newColumnLayout[2],
        }, startColumnPxWidth = newColumnWidths.start, startColumnPercentWidth = (startColumnPxWidth / this.widthDOM) * 100, isTablet = this.media === MEDIA.TABLET;
        if (moved({
            separator: "start",
            from: FCLLayout.TwoColumnsMidExpanded,
            forward: true,
        }) && (newColumnWidths.start >= newColumnWidths.mid)) {
            return FCLLayout.TwoColumnsStartExpanded;
        }
        if (moved({
            separator: "start",
            from: FCLLayout.TwoColumnsStartExpanded,
            forward: false,
        }) && (newColumnWidths.start < newColumnWidths.mid)) {
            return FCLLayout.TwoColumnsMidExpanded;
        }
        if (moved({
            separator: "start",
            from: FCLLayout.ThreeColumnsMidExpanded,
            forward: true,
        }) && startColumnPercentWidth >= 33) {
            return FCLLayout.ThreeColumnsMidExpandedEndHidden;
        }
        if (moved({
            separator: "start",
            from: FCLLayout.ThreeColumnsMidExpandedEndHidden,
            forward: false,
        }) && !isTablet && startColumnPercentWidth < 33) {
            return FCLLayout.ThreeColumnsMidExpanded;
        }
        if (moved({
            separator: "start",
            from: FCLLayout.ThreeColumnsStartHiddenMidExpanded,
            forward: true,
        }) && !isTablet && Math.ceil(startColumnPxWidth) >= COLUMN_MIN_WIDTH) {
            return FCLLayout.ThreeColumnsMidExpanded;
        }
        if (moved({
            separator: "end",
            from: FCLLayout.ThreeColumnsStartHiddenMidExpanded,
            forward: false,
        }) && newColumnWidths.mid < newColumnWidths.end) {
            return FCLLayout.ThreeColumnsStartHiddenEndExpanded;
        }
        if (moved({
            separator: "end",
            from: FCLLayout.ThreeColumnsStartHiddenEndExpanded,
            forward: true,
        }) && newColumnWidths.mid >= newColumnWidths.end) {
            return FCLLayout.ThreeColumnsStartHiddenMidExpanded;
        }
        if (moved({
            separator: "end",
            from: FCLLayout.ThreeColumnsMidExpandedEndHidden,
            forward: false,
            // ceil before comparing to avoid floating point precision issues
        }) && ((Math.ceil(newColumnWidths.end) >= COLUMN_MIN_WIDTH))) {
            return FCLLayout.ThreeColumnsMidExpanded;
        }
        if (moved({
            separator: "end",
            from: FCLLayout.ThreeColumnsMidExpanded,
            forward: false,
        }) && newColumnWidths.mid < newColumnWidths.end) {
            return FCLLayout.ThreeColumnsEndExpanded;
        }
        if (moved({
            separator: "end",
            from: FCLLayout.ThreeColumnsEndExpanded,
            forward: true,
        }) && newColumnWidths.mid >= newColumnWidths.end) {
            return FCLLayout.ThreeColumnsMidExpanded;
        }
        if (moved({
            separator: "start",
            from: FCLLayout.ThreeColumnsMidExpandedEndHidden,
            forward: true,
        }) && newColumnWidths.start >= newColumnWidths.mid) {
            return FCLLayout.ThreeColumnsStartExpandedEndHidden;
        }
        if (moved({
            separator: "start",
            from: FCLLayout.ThreeColumnsStartExpandedEndHidden,
            forward: false,
        }) && newColumnWidths.start < newColumnWidths.mid) {
            return FCLLayout.ThreeColumnsMidExpandedEndHidden;
        }
        if (moved({
            separator: "start",
            from: FCLLayout.ThreeColumnsMidExpanded,
            forward: true,
            // ceil before comparing to avoid floating point precision issues
        }) && isTablet && (Math.ceil(startColumnPxWidth) >= COLUMN_MIN_WIDTH)) {
            return FCLLayout.ThreeColumnsMidExpandedEndHidden;
        }
        if (moved({
            separator: "end",
            from: FCLLayout.ThreeColumnsMidExpandedEndHidden,
            forward: false,
            // ceil before comparing to avoid floating point precision issues
        }) && isTablet && (Math.ceil(newColumnWidths.end) >= COLUMN_MIN_WIDTH)) {
            return FCLLayout.ThreeColumnsMidExpanded;
        }
        return fclLayoutBeforeMove; // no layout change
    }
    switchLayoutOnArrowPress() {
        const lastUsedLayout = this.layout;
        this.layout = getNextLayoutByArrowPress()[lastUsedLayout];
        if (this.layout !== lastUsedLayout) {
            this.fireLayoutChange(true, false);
        }
    }
    get _availableWidthForColumns() {
        let width = this._width;
        if (this.showStartSeparator) {
            width -= this.startSeparatorDOM.offsetWidth;
        }
        if (this.showEndSeparator) {
            width -= this.endSeparatorDOM.offsetWidth;
        }
        return width;
    }
    /**
     * Checks if a column is hidden based on its width.
     */
    _isColumnHidden(columnWidth) {
        return columnWidth === 0 || columnWidth === "0px";
    }
    /**
    * Returns the current column layout, based on both the `layout` property and the screen size.
    *
    * **For example:** ["67%", "33%", 0], ["100%", 0, 0], ["25%", "50%", "25%"], etc,
    * where the numbers represents the width of the start, middle and end columns.
    * @default undefined
    * @public
    */
    get columnLayout() {
        return this._columnLayout;
    }
    /**
    * Returns if the `start` column is visible.
    * @default true
    * @public
    */
    get startColumnVisible() {
        if (this._columnLayout) {
            return !this._isColumnHidden(this._columnLayout[0]);
        }
        return false;
    }
    /**
    * Returns if the `middle` column is visible.
    * @default false
    * @public
    */
    get midColumnVisible() {
        if (this._columnLayout) {
            return !this._isColumnHidden(this._columnLayout[1]);
        }
        return false;
    }
    /**
    * Returns if the `end` column is visible.
    * @default false
    * @public
    */
    get endColumnVisible() {
        if (this._columnLayout) {
            return !this._isColumnHidden(this._columnLayout[2]);
        }
        return false;
    }
    /**
    * Returns the number of currently visible columns.
    * @default 1
    * @public
    */
    get visibleColumns() {
        return this._visibleColumns;
    }
    get startColumnWidth() {
        return this._columnLayout ? this._columnLayout[0] : "100%";
    }
    get midColumnWidth() {
        return this._columnLayout ? this._columnLayout[1] : "0px";
    }
    get endColumnWidth() {
        return this._columnLayout ? this._columnLayout[2] : "0px";
    }
    get showStartSeparator() {
        return this.effectiveSeparatorsInfo[0].visible;
    }
    get showEndSeparator() {
        return this.effectiveSeparatorsInfo[1].visible;
    }
    get showStartSeparatorGrip() {
        return this.disableResizing ? false : this.startSeparatorGripVisibility;
    }
    get showStartSeparatorArrow() {
        return this.disableResizing ? false : this.startSeparatorArrowVisibility;
    }
    get showEndSeparatorGrip() {
        return this.disableResizing ? false : this.endSeparatorGripVisibility;
    }
    get startSeparatorGripVisibility() {
        return this.effectiveSeparatorsInfo[0].gripVisible;
    }
    get endSeparatorGripVisibility() {
        return this.effectiveSeparatorsInfo[1].gripVisible;
    }
    get startSeparatorArrowVisibility() {
        return this.effectiveSeparatorsInfo[0].arrowVisible;
    }
    get startSeparatorValue() {
        const startColumnWidth = this.startColumnWidth;
        if (typeof startColumnWidth === "string" && startColumnWidth.endsWith("%")) {
            return parseInt(startColumnWidth);
        }
        return SEPARATOR_DEFAULT_VALUES.START;
    }
    get endSeparatorValue() {
        const startColumnWidth = this.startColumnWidth;
        const midColumnWidth = this.midColumnWidth;
        if (typeof startColumnWidth === "string" && startColumnWidth.endsWith("%")
            && typeof midColumnWidth === "string" && midColumnWidth.endsWith("%")) {
            return parseInt(startColumnWidth) + parseInt(midColumnWidth);
        }
        return SEPARATOR_DEFAULT_VALUES.END;
    }
    get startArrowDirection() {
        return this.effectiveSeparatorsInfo[0].arrowDirection;
    }
    get startArrowDOM() {
        return this.shadowRoot.querySelector(".ui5-fcl-arrow--start");
    }
    get effectiveSeparatorsInfo() {
        return getDefaultLayoutsByMedia()[this.media][this.effectiveLayout].separators;
    }
    get effectiveLayout() {
        return this.separatorMovementSession?.tmpFCLLayout || this.layout;
    }
    get startSeparatorDOM() {
        return this.shadowRoot.querySelector(".ui5-fcl-separator-start");
    }
    get endSeparatorDOM() {
        return this.shadowRoot.querySelector(".ui5-fcl-separator-end");
    }
    get startSeparatorTabIndex() {
        if (this.showStartSeparatorGrip) {
            return 0;
        }
    }
    get endSeparatorTabIndex() {
        if (this.showEndSeparatorGrip) {
            return 0;
        }
    }
    get media() {
        if (this._width <= BREAKPOINTS.PHONE) {
            return MEDIA.PHONE;
        }
        if (this._width <= BREAKPOINTS.TABLET) {
            return MEDIA.TABLET;
        }
        return MEDIA.DESKTOP;
    }
    get widthDOM() {
        return this.getBoundingClientRect().width;
    }
    get startColumnDOM() {
        return this.shadowRoot.querySelector(".ui5-fcl-column--start");
    }
    get midColumnDOM() {
        return this.shadowRoot.querySelector(".ui5-fcl-column--middle");
    }
    get endColumnDOM() {
        return this.shadowRoot.querySelector(".ui5-fcl-column--end");
    }
    get isStartColumnCollapsing() {
        return this.startColumnDOM?.classList.contains("ui5-fcl-column-collapse-animation");
    }
    get isMidColumnCollapsing() {
        return this.midColumnDOM?.classList.contains("ui5-fcl-column-collapse-animation");
    }
    get isEndColumnCollapsing() {
        return this.endColumnDOM?.classList.contains("ui5-fcl-column-collapse-animation");
    }
    get accStartColumnText() {
        return this.accessibilityAttributes.startColumn?.name || FlexibleColumnLayout_1.i18nBundle.getText(FCL_START_COLUMN_TXT);
    }
    get accMiddleColumnText() {
        return this.accessibilityAttributes.midColumn?.name || FlexibleColumnLayout_1.i18nBundle.getText(FCL_MIDDLE_COLUMN_TXT);
    }
    get accEndColumnText() {
        return this.accessibilityAttributes.endColumn?.name || FlexibleColumnLayout_1.i18nBundle.getText(FCL_END_COLUMN_TXT);
    }
    get accStartSeparatorText() {
        let name = this.accessibilityAttributes.startSeparator?.name;
        if (!name && this.showStartSeparatorGrip) {
            name = FlexibleColumnLayout_1.i18nBundle.getText(FCL_START_SEPARATOR_TOOLTIP);
        }
        return name;
    }
    get accEndSeparatorText() {
        return this.accessibilityAttributes.endSeparator?.name || FlexibleColumnLayout_1.i18nBundle.getText(FCL_END_SEPARATOR_TOOLTIP);
    }
    get accStartColumnRole() {
        if (this.startColumnVisible) {
            return this.accessibilityAttributes.startColumn?.role || "region";
        }
        return undefined;
    }
    get accMiddleColumnRole() {
        if (this.midColumnVisible) {
            return this.accessibilityAttributes.midColumn?.role || "region";
        }
        return undefined;
    }
    get accEndColumnRole() {
        if (this.endColumnVisible) {
            return this.accessibilityAttributes.endColumn?.role || "region";
        }
        return undefined;
    }
    get accStartSeparatorRole() {
        return this.accessibilityAttributes.startSeparator?.role || "separator";
    }
    get accEndSeparatorRole() {
        return this.accessibilityAttributes.endSeparator?.role || "separator";
    }
    get _accAttributes() {
        return {
            columns: {
                start: {
                    role: this.accStartColumnRole,
                    ariaHidden: !this.startColumnVisible || undefined,
                },
                middle: {
                    role: this.accMiddleColumnRole,
                    ariaHidden: !this.midColumnVisible || undefined,
                },
                end: {
                    role: this.accEndColumnRole,
                    ariaHidden: !this.endColumnVisible || undefined,
                },
            },
        };
    }
};
__decorate([
    property()
], FlexibleColumnLayout.prototype, "layout", void 0);
__decorate([
    property({ type: Boolean })
], FlexibleColumnLayout.prototype, "disableResizing", void 0);
__decorate([
    property({ type: Object })
], FlexibleColumnLayout.prototype, "accessibilityAttributes", void 0);
__decorate([
    property({ type: Object })
], FlexibleColumnLayout.prototype, "layoutsConfiguration", void 0);
__decorate([
    property({ type: Number })
], FlexibleColumnLayout.prototype, "_width", void 0);
__decorate([
    property({ type: Array })
], FlexibleColumnLayout.prototype, "_columnLayout", void 0);
__decorate([
    property({ type: Number })
], FlexibleColumnLayout.prototype, "_visibleColumns", void 0);
__decorate([
    property({ type: Boolean })
], FlexibleColumnLayout.prototype, "_resizing", void 0);
__decorate([
    property({ type: Object })
], FlexibleColumnLayout.prototype, "_layoutsConfiguration", void 0);
__decorate([
    slot()
], FlexibleColumnLayout.prototype, "startColumn", void 0);
__decorate([
    slot()
], FlexibleColumnLayout.prototype, "midColumn", void 0);
__decorate([
    slot()
], FlexibleColumnLayout.prototype, "endColumn", void 0);
__decorate([
    i18n("@ui5/webcomponents-fiori")
], FlexibleColumnLayout, "i18nBundle", void 0);
FlexibleColumnLayout = FlexibleColumnLayout_1 = __decorate([
    customElement({
        tag: "ui5-flexible-column-layout",
        fastNavigation: true,
        renderer: jsxRenderer,
        styles: FlexibleColumnLayoutCss,
        template: FlexibleColumnLayoutTemplate,
        dependencies: [Icon, Button],
    })
    /**
     * Fired when the layout changes via user interaction by dragging the separators
     * or by changing the component size due to resizing.
     * @param {FCLLayout} layout The current layout
     * @param {array} columnLayout The effective column layout, f.e [67%, 33%, 0]
     * @param {boolean} startColumnVisible Indicates if the start column is currently visible
     * @param {boolean} midColumnVisible Indicates if the middle column is currently visible
     * @param {boolean} endColumnVisible Indicates if the end column is currently visible
     * @param {boolean} separatorsUsed Indicates if the layout was changed by dragging the column separators
     * @param {boolean} resized Indicates if the layout was changed by resizing the entire component
     * @public
     */
    ,
    event("layout-change", {
        bubbles: true,
    })
    /**
     * Fired when the `layoutsConfiguration` changes via user interaction by dragging the separators.
     * @param {FCLLayout} layout The current layout
     * @param {MEDIA} media The current media type
     * @param {array} columnLayout The effective column layout, f.e ["67%", "33%", "0px"]
     * @public
     * @since 2.16.0
     * @experimental
     */
    ,
    event("layout-configuration-change", {
        bubbles: true,
    })
], FlexibleColumnLayout);
FlexibleColumnLayout.define();
export default FlexibleColumnLayout;
//# sourceMappingURL=FlexibleColumnLayout.js.map