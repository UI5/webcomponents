import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/vertical-grip.js";
import type { PassiveEventListenerObject, AriaLandmarkRole } from "@ui5/webcomponents-base";
import FCLLayout from "./types/FCLLayout.js";
import type { LayoutConfiguration } from "./fcl-utils/FCLLayout.js";
declare enum MEDIA {
    PHONE = "phone",
    TABLET = "tablet",
    DESKTOP = "desktop"
}
declare const COLUMN: {
    readonly START: 0;
    readonly MID: 1;
    readonly END: 2;
};
type SeparatorMovementSession = {
    separator: HTMLElement;
    cursorPositionX: number;
    tmpFCLLayout: FCLLayout;
};
type FlexibleColumnLayoutColumnLayout = Array<string | number>;
type FlexibleColumnLayoutLayoutChangeEventDetail = {
    layout: `${FCLLayout}`;
    columnLayout: FlexibleColumnLayoutColumnLayout;
    startColumnVisible: boolean;
    midColumnVisible: boolean;
    endColumnVisible: boolean;
    separatorsUsed: boolean;
    resized: boolean;
};
type FCLAccessibilityRoles = Extract<AriaLandmarkRole, "none" | "complementary" | "contentinfo" | "main" | "region">;
type FCLAccessibilityAttributes = {
    startColumn?: {
        role: FCLAccessibilityRoles;
        name: string;
    };
    midColumn?: {
        role: FCLAccessibilityRoles;
        name: string;
    };
    endColumn?: {
        role: FCLAccessibilityRoles;
        name: string;
    };
    startSeparator?: {
        role: FCLAccessibilityRoles;
        name: string;
    };
    endSeparator?: {
        role: FCLAccessibilityRoles;
        name: string;
    };
};
type UserDefinedColumnLayouts = {
    "tablet": {
        [layoutName in FCLLayout]?: FlexibleColumnLayoutColumnLayout;
    };
    "desktop": {
        [layoutName in FCLLayout]?: FlexibleColumnLayoutColumnLayout;
    };
};
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
declare class FlexibleColumnLayout extends UI5Element {
    eventDetails: {
        "layout-change": FlexibleColumnLayoutLayoutChangeEventDetail;
    };
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
    layout: `${FCLLayout}`;
    /**
    * Specifies if the user is allowed to change the columns layout by dragging the separator between the columns.
    * @default false
    * @public
    * @since 2.0.0
    */
    disableResizing: boolean;
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
    accessibilityAttributes: FCLAccessibilityAttributes;
    /**
    * Defines the component width in px.
    * @default 0
    * @private
    */
    _width: number;
    /**
    * Defines the effective columns layout,
    * based on both the `layout` property and the screen size.
    * Example: [67%, 33%, 0], [25%, 50%, 25%], etc.
    * @default undefined
    * @private
    */
    _columnLayout?: FlexibleColumnLayoutColumnLayout;
    /**
    * Defines the visible columns count - 1, 2 or 3.
    * @default 1
    * @private
    */
    _visibleColumns: number;
    /**
    * Defines if the user is currently resizing the columns by dragging their separator.
    * @default false
    * @private
    */
    _resizing: boolean;
    /**
    * Allows the user to replace the whole layouts configuration
    * @private
    */
    _layoutsConfiguration?: LayoutConfiguration;
    /**
    * Defines the content in the start column.
    * @public
    */
    startColumn: Array<HTMLElement>;
    /**
    * Defines the content in the middle column.
    * @public
    */
    midColumn: Array<HTMLElement>;
    /**
    * Defines the content in the end column.
    * @public
    */
    endColumn: Array<HTMLElement>;
    initialRendering: boolean;
    _handleResize: () => void;
    _onSeparatorMove: (e: TouchEvent | MouseEvent) => void;
    _onSeparatorMoveEnd: (e: TouchEvent | MouseEvent) => void;
    onColumnCollapseAnimationEndRef: (e: TransitionEvent) => void;
    static i18nBundle: I18nBundle;
    _prevLayout: `${FCLLayout}` | null;
    _userDefinedColumnLayouts: UserDefinedColumnLayouts;
    _ontouchstart: PassiveEventListenerObject;
    separatorMovementSession?: SeparatorMovementSession | null;
    constructor();
    static get ANIMATION_DURATION(): 0 | 560;
    onEnterDOM(): void;
    onExitDOM(): void;
    onAfterRendering(): void;
    handleInitialRendering(): void;
    handleResize(): void;
    updateLayout(): void;
    syncLayout(): void;
    toggleColumns(): void;
    toggleColumn(column: string): void;
    expandColumn(columnDOM: HTMLElement, columnWidth: string | number): void;
    collapseColumn(columnDOM: HTMLElement): void;
    onColumnCollapseAnimationEnd: (e: Event) => void;
    nextColumnLayout(layout: `${FCLLayout}`): FlexibleColumnLayoutColumnLayout;
    calcVisibleColumns(colLayout: FlexibleColumnLayoutColumnLayout): number;
    fireLayoutChange(separatorUsed: boolean, resized: boolean): void;
    onSeparatorPress(e: TouchEvent | MouseEvent): void;
    onSeparatorMove(e: TouchEvent | MouseEvent): void;
    private onSeparatorMoveEnd;
    initSeparatorMovementSession(separator: HTMLElement, cursorPositionX: number, isTouch: boolean): {
        separator: HTMLElement;
        cursorPositionX: number;
        tmpFCLLayout: FCLLayout;
    };
    exitSeparatorMovementSession(): void;
    saveUserDefinedColumnLayout(newLayout: FCLLayout, newColumnLayout: FlexibleColumnLayoutColumnLayout): void;
    private isSeparatorAheadOfCursor;
    calculateNewColumnWidth(columnToResize: typeof COLUMN.START | typeof COLUMN.END, widthDelta: number): number;
    moveSeparator(separator: HTMLElement, offsetX: number, fclLayoutBeforeMove: FCLLayout): FCLLayout;
    adjustColumnLayout(columnToResize: typeof COLUMN.START | typeof COLUMN.END, newSize: number, createNewArray?: boolean): FlexibleColumnLayoutColumnLayout | undefined;
    _onArrowKeydown(e: KeyboardEvent): void;
    _onSeparatorKeydown(e: KeyboardEvent): Promise<void>;
    _onSeparatorKeyUp(): void;
    private attachMoveListeners;
    private detachMoveListeners;
    private toggleSideAnimations;
    private getPageXValueFromEvent;
    convertColumnWidthToPixels(width: string | number): number;
    convertToRelativeColumnWidth(pxWidth: string | number): string;
    getNextLayoutOnSeparatorMovement(separator: HTMLElement, isStartToEndDirection: boolean, fclLayoutBeforeMove: FCLLayout, columnLayoutAfterMove: FlexibleColumnLayoutColumnLayout): FCLLayout;
    switchLayoutOnArrowPress(): void;
    get _availableWidthForColumns(): number;
    /**
     * Checks if a column is hidden based on its width.
     */
    private _isColumnHidden;
    /**
    * Returns the current column layout, based on both the `layout` property and the screen size.
    *
    * **For example:** ["67%", "33%", 0], ["100%", 0, 0], ["25%", "50%", "25%"], etc,
    * where the numbers represents the width of the start, middle and end columns.
    * @default undefined
    * @public
    */
    get columnLayout(): FlexibleColumnLayoutColumnLayout | undefined;
    /**
    * Returns if the `start` column is visible.
    * @default true
    * @public
    */
    get startColumnVisible(): boolean;
    /**
    * Returns if the `middle` column is visible.
    * @default false
    * @public
    */
    get midColumnVisible(): boolean;
    /**
    * Returns if the `end` column is visible.
    * @default false
    * @public
    */
    get endColumnVisible(): boolean;
    /**
    * Returns the number of currently visible columns.
    * @default 1
    * @public
    */
    get visibleColumns(): number;
    get startColumnWidth(): string | number;
    get midColumnWidth(): string | number;
    get endColumnWidth(): string | number;
    get showStartSeparator(): boolean;
    get showEndSeparator(): boolean;
    get showStartSeparatorGrip(): boolean | undefined;
    get showStartSeparatorArrow(): boolean | undefined;
    get showEndSeparatorGrip(): boolean | undefined;
    get startSeparatorGripVisibility(): boolean | undefined;
    get endSeparatorGripVisibility(): boolean | undefined;
    get startSeparatorArrowVisibility(): boolean | undefined;
    get startSeparatorValue(): number;
    get endSeparatorValue(): number;
    get startArrowDirection(): "forward" | "backward" | undefined;
    get startArrowDOM(): HTMLElement;
    get effectiveSeparatorsInfo(): {
        visible: boolean;
        gripVisible?: boolean;
        arrowVisible?: boolean;
        arrowDirection?: "forward" | "backward";
    }[];
    get effectiveLayout(): "OneColumn" | "TwoColumnsStartExpanded" | "TwoColumnsMidExpanded" | "ThreeColumnsMidExpanded" | "ThreeColumnsEndExpanded" | "ThreeColumnsStartExpandedEndHidden" | "ThreeColumnsMidExpandedEndHidden" | "ThreeColumnsStartHiddenMidExpanded" | "ThreeColumnsStartHiddenEndExpanded" | "MidColumnFullScreen" | "EndColumnFullScreen" | FCLLayout;
    get startSeparatorDOM(): HTMLElement;
    get endSeparatorDOM(): HTMLElement;
    get startSeparatorTabIndex(): 0 | undefined;
    get endSeparatorTabIndex(): 0 | undefined;
    get media(): MEDIA;
    get widthDOM(): number;
    get startColumnDOM(): HTMLElement;
    get midColumnDOM(): HTMLElement;
    get endColumnDOM(): HTMLElement;
    get isStartColumnCollapsing(): boolean;
    get isMidColumnCollapsing(): boolean;
    get isEndColumnCollapsing(): boolean;
    get accStartColumnText(): string;
    get accMiddleColumnText(): string;
    get accEndColumnText(): string;
    get accStartSeparatorText(): string | undefined;
    get accEndSeparatorText(): string;
    get accStartColumnRole(): FCLAccessibilityRoles | undefined;
    get accMiddleColumnRole(): FCLAccessibilityRoles | undefined;
    get accEndColumnRole(): FCLAccessibilityRoles | undefined;
    get accStartSeparatorRole(): "separator" | FCLAccessibilityRoles;
    get accEndSeparatorRole(): "separator" | FCLAccessibilityRoles;
    get _effectiveLayoutsByMedia(): LayoutConfiguration;
    get _accAttributes(): {
        columns: {
            start: {
                role: FCLAccessibilityRoles | undefined;
                ariaHidden: true | undefined;
            };
            middle: {
                role: FCLAccessibilityRoles | undefined;
                ariaHidden: true | undefined;
            };
            end: {
                role: FCLAccessibilityRoles | undefined;
                ariaHidden: true | undefined;
            };
        };
    };
}
export default FlexibleColumnLayout;
export type { MEDIA, FlexibleColumnLayoutLayoutChangeEventDetail, FCLAccessibilityAttributes, FlexibleColumnLayoutColumnLayout, };
