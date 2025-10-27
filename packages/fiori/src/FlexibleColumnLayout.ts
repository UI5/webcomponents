import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { supportsTouch } from "@ui5/webcomponents-base/dist/Device.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/vertical-grip.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import {
	isLeft,
	isRight,
	isLeftShift,
	isRightShift,
	isHome,
	isEnd,
	isEnter,
	isSpace,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type { PassiveEventListenerObject, AriaLandmarkRole } from "@ui5/webcomponents-base";
import FCLLayout from "./types/FCLLayout.js";
import type { LayoutConfiguration } from "./fcl-utils/FCLLayout.js";
import {
	getLayoutsByMedia,
	getNextLayoutByArrowPress,
} from "./fcl-utils/FCLLayout.js";

// Texts
import {
	FCL_START_COLUMN_TXT,
	FCL_MIDDLE_COLUMN_TXT,
	FCL_END_COLUMN_TXT,
	FCL_START_SEPARATOR_TOOLTIP,
	FCL_END_SEPARATOR_TOOLTIP,
} from "./generated/i18n/i18n-defaults.js";

// Template
import FlexibleColumnLayoutTemplate from "./FlexibleColumnLayoutTemplate.js";

// Styles
import FlexibleColumnLayoutCss from "./generated/themes/FlexibleColumnLayout.css.js";

enum MEDIA {
	PHONE = "phone",
	TABLET = "tablet",
	DESKTOP = "desktop",
}

const BREAKPOINTS = {
	"PHONE": 599,
	"TABLET": 1023,
} as const;

const COLUMN = {
	START: 0,
	MID: 1,
	END: 2,
} as const;

const SEPARATOR_DEFAULT_VALUES = {
	START: 50,
	END: 75,
} as const;

const COLUMN_MIN_WIDTH = 248;

type SeparatorMovementSession = {
	separator: HTMLElement,
	cursorPositionX: number, // the position X of the mouse/finger that indicates where to move the separator
	tmpFCLLayout: FCLLayout, // the layout that corresponds to the latest separator position
};

type FlexibleColumnLayoutColumnLayout = Array<string | number>;

type FlexibleColumnLayoutLayoutChangeEventDetail = {
	layout: `${FCLLayout}`,
	columnLayout: FlexibleColumnLayoutColumnLayout,
	startColumnVisible: boolean,
	midColumnVisible: boolean,
	endColumnVisible: boolean,
	separatorsUsed: boolean,
	resized: boolean,
};

type FCLAccessibilityRoles = Extract<AriaLandmarkRole, "none" | "complementary" | "contentinfo" | "main" | "region">
type FCLAccessibilityAttributes = {
	startColumn?: {
		role: FCLAccessibilityRoles,
		name: string,
	},
	midColumn?: {
		role: FCLAccessibilityRoles,
		name: string,
	},
	endColumn?: {
		role: FCLAccessibilityRoles,
		name: string,
	},
	startSeparator?: {
		role: FCLAccessibilityRoles,
		name: string,
	},
	endSeparator?: {
		role: FCLAccessibilityRoles,
		name: string,
	},
}

type UserDefinedColumnLayouts = {
	"tablet": {
		[layoutName in FCLLayout]?: FlexibleColumnLayoutColumnLayout;
	},
	"desktop": {
		[layoutName in FCLLayout]?: FlexibleColumnLayoutColumnLayout;
	},
}

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
@customElement({
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
@event("layout-change", {
	bubbles: true,
})
class FlexibleColumnLayout extends UI5Element {
	eventDetails!: {
		"layout-change": FlexibleColumnLayoutLayoutChangeEventDetail,
	}
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
	@property()
	layout: `${FCLLayout}` = "OneColumn";

	/**
	* Specifies if the user is allowed to change the columns layout by dragging the separator between the columns.
	* @default false
	* @public
	* @since 2.0.0
	*/
	@property({ type: Boolean })
	disableResizing = false;

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
	@property({ type: Object })
	accessibilityAttributes: FCLAccessibilityAttributes = {};

	/**
	* Defines the component width in px.
	* @default 0
	* @private
	*/
	@property({ type: Number })
	_width = 0;

	/**
	* Defines the effective columns layout,
	* based on both the `layout` property and the screen size.
	* Example: [67%, 33%, 0], [25%, 50%, 25%], etc.
	* @default undefined
	* @private
	*/
	@property({ type: Array })
	_columnLayout?: FlexibleColumnLayoutColumnLayout;

	/**
	* Defines the visible columns count - 1, 2 or 3.
	* @default 1
	* @private
	*/
	@property({ type: Number })
	_visibleColumns = 1;

	/**
	* Defines if the user is currently resizing the columns by dragging their separator.
	* @default false
	* @private
	*/
	@property({ type: Boolean })
	_resizing = false;

	/**
	* Allows the user to replace the whole layouts configuration
	* @private
	*/
	@property({ type: Object })
	_layoutsConfiguration?: LayoutConfiguration;

	/**
	* Defines the content in the start column.
	* @public
	*/
	@slot()
	startColumn!: Array<HTMLElement>;

	/**
	* Defines the content in the middle column.
	* @public
	*/
	@slot()
	midColumn!: Array<HTMLElement>;

	/**
	* Defines the content in the end column.
	* @public
	*/
	@slot()
	endColumn!: Array<HTMLElement>;

	initialRendering: boolean;
	_handleResize: () => void;
	_onSeparatorMove: (e: TouchEvent | MouseEvent) => void;
	_onSeparatorMoveEnd: (e: TouchEvent | MouseEvent) => void;
	onColumnCollapseAnimationEndRef: (e: TransitionEvent) => void;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	_prevLayout: `${FCLLayout}` | null;
	_userDefinedColumnLayouts: UserDefinedColumnLayouts = {
		tablet: {},
		desktop: {},
	};
	_ontouchstart: PassiveEventListenerObject;
	separatorMovementSession?: SeparatorMovementSession | null;

	constructor() {
		super();

		this._prevLayout = null;
		this.initialRendering = true;
		this._handleResize = this.handleResize.bind(this);
		this._onSeparatorMove = this.onSeparatorMove.bind(this);
		this._onSeparatorMoveEnd = this.onSeparatorMoveEnd.bind(this);
		this.onColumnCollapseAnimationEndRef = this.onColumnCollapseAnimationEnd.bind(this);

		const handleTouchStartEvent = (e: TouchEvent) => {
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
		const prevLayoutHash = this.columnLayout!.join();

		// update the column layout, based on the current width
		this.updateLayout();

		// fire layout-change if the column layout changed
		if (prevLayoutHash !== this.columnLayout!.join()) {
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

	toggleColumns() {
		this.toggleColumn("start");
		this.toggleColumn("mid");
		this.toggleColumn("end");
	}

	toggleColumn(column: string) {
		let columnWidth;
		let columnDOM;

		if (column === "start") {
			columnWidth = this.startColumnWidth;
			columnDOM = this.startColumnDOM;
		} else if (column === "mid") {
			columnWidth = this.midColumnWidth;
			columnDOM = this.midColumnDOM;
		} else {
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

	expandColumn(columnDOM: HTMLElement, columnWidth: string | number) {
		columnDOM.removeEventListener("transitionend", this.onColumnCollapseAnimationEndRef);

		columnDOM.classList.remove("ui5-fcl-column--hidden");
		columnDOM.style.width = typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth;
	}

	collapseColumn(columnDOM: HTMLElement) {
		const hasAnimation = getAnimationMode() !== AnimationMode.None && !this.initialRendering;
		columnDOM.style.width = "0px";

		if (hasAnimation) {
			// hide column with delay to allow the animation runs entirely
			columnDOM.classList.add("ui5-fcl-column-collapse-animation");
			columnDOM.addEventListener("transitionend", this.onColumnCollapseAnimationEndRef);
		} else {
			columnDOM.classList.add("ui5-fcl-column--hidden");
		}
	}

	onColumnCollapseAnimationEnd = (e: Event) => {
		const columnDOM = e.target as HTMLElement;
		columnDOM.classList.add("ui5-fcl-column--hidden");
		columnDOM.classList.remove("ui5-fcl-column-collapse-animation");
		columnDOM.removeEventListener("transitionend", this.onColumnCollapseAnimationEndRef);
	}

	nextColumnLayout(layout: `${FCLLayout}`) {
		let userDefinedLayout;
		if (this.media !== MEDIA.PHONE) {
			userDefinedLayout = this._userDefinedColumnLayouts[this.media][layout];
		}
		return userDefinedLayout || this._effectiveLayoutsByMedia[this.media][layout].layout;
	}

	calcVisibleColumns(colLayout: FlexibleColumnLayoutColumnLayout) {
		return colLayout.filter(colWidth => !this._isColumnHidden(colWidth)).length;
	}

	fireLayoutChange(separatorUsed: boolean, resized: boolean) {
		this.fireDecoratorEvent("layout-change", {
			layout: this.layout,
			columnLayout: this._columnLayout!,
			startColumnVisible: this.startColumnVisible,
			midColumnVisible: this.midColumnVisible,
			endColumnVisible: this.endColumnVisible,
			separatorsUsed: separatorUsed,
			resized,
		});
	}

	onSeparatorPress(e: TouchEvent | MouseEvent) {
		if (e.target as HTMLElement === this.startArrowDOM) {
			return;
		}
		const pressedSeparator = (e.target as HTMLElement).closest(".ui5-fcl-separator") as HTMLElement;
		if ((pressedSeparator.classList.contains("ui5-fcl-separator-start") && !this.showStartSeparatorGrip)
			|| (pressedSeparator.classList.contains("ui5-fcl-separator-end") && !this.showEndSeparatorGrip)) {
			return;
		}

		const isTouch = supportsTouch() && e instanceof TouchEvent,
			cursorPositionX = this.getPageXValueFromEvent(e);

		this.separatorMovementSession = this.initSeparatorMovementSession(pressedSeparator, cursorPositionX, isTouch);
	}

	onSeparatorMove(e: TouchEvent | MouseEvent) {
		e.preventDefault(); // prevent text selection etc. while dragging

		if (!this.separatorMovementSession) {
			return;
		}

		const latestCursorX = this.getPageXValueFromEvent(e),
			movementDelta = latestCursorX - this.separatorMovementSession.cursorPositionX;

		if (!movementDelta) {
			return;
		}

		const movedSeparator = this.separatorMovementSession.separator,
			latestSeparatorX = movedSeparator.getBoundingClientRect().x,
			isForwardMove = movementDelta > 0; // is start-to-end direction

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

	private onSeparatorMoveEnd() {
		if (!this.separatorMovementSession) {
			return;
		}
		const newLayout = this.separatorMovementSession.tmpFCLLayout;
		const newColumnLayout = this._columnLayout!;

		this.saveUserDefinedColumnLayout(newLayout, newColumnLayout);
		this.exitSeparatorMovementSession();
	}

	initSeparatorMovementSession(separator: HTMLElement, cursorPositionX: number, isTouch: boolean) {
		this.attachMoveListeners(isTouch);
		this.toggleSideAnimations(separator, false); // disable animations for side colmns to prevent slowdown while dragging
		this._resizing = true;

		return {
			separator,
			cursorPositionX,
			tmpFCLLayout: this.layout as FCLLayout,
		};
	}

	exitSeparatorMovementSession() {
		const movedSeparator = this.separatorMovementSession!.separator;
		const hasAnimation = getAnimationMode() !== AnimationMode.None;

		this.detachMoveListeners();
		this.toggleSideAnimations(movedSeparator, hasAnimation); // restore animations for side columns
		this._resizing = false;

		movedSeparator.focus();
		this.separatorMovementSession = null;
	}

	saveUserDefinedColumnLayout(newLayout: FCLLayout, newColumnLayout: FlexibleColumnLayoutColumnLayout) {
		const media = this.media as MEDIA.TABLET | MEDIA.DESKTOP;

		this._userDefinedColumnLayouts[media][newLayout] = newColumnLayout;
		if (this.layout !== newLayout) {
			this.layout = newLayout;
			this.fireLayoutChange(true, false);
		}
	}

	private isSeparatorAheadOfCursor(cursorX: number, separatorX: number, isForwardMove: boolean) {
		if (isForwardMove) {
			return separatorX > cursorX;
		}
		return separatorX < cursorX;
	}

	calculateNewColumnWidth(columnToResize: typeof COLUMN.START | typeof COLUMN.END, widthDelta: number) {
		const columnWidths: Array<number> = this._columnLayout!.map(x => this.convertColumnWidthToPixels(x)),
			adjacentColumnToResize = COLUMN.MID, // column to compensate the resize of the given column
			columnNewWidth = columnWidths[columnToResize] + widthDelta,
			adjacentColumnNewWidth = columnWidths[adjacentColumnToResize] - widthDelta;

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

	moveSeparator(separator: HTMLElement, offsetX: number, fclLayoutBeforeMove: FCLLayout) {
		const isStartSeparator = separator === this.startSeparatorDOM,
			isRTL = this.effectiveDir === "rtl";
		let selectedColumnToResize,
			columnWidthDelta;

		if (isRTL) {
			offsetX = -offsetX;
		}

		if (isStartSeparator) {
			selectedColumnToResize = COLUMN.START;
			// move in direction start-to-end expands start column
			columnWidthDelta = offsetX;
		} else {
			selectedColumnToResize = COLUMN.END;
			// move in direction start-to-end shrinks end column
			columnWidthDelta = -offsetX;
		}

		const isStartToEndDirection = offsetX > 0,
			newColumnWidth = this.calculateNewColumnWidth(selectedColumnToResize, columnWidthDelta),
			newColumnLayout = this.adjustColumnLayout(selectedColumnToResize, newColumnWidth, true)!,
			newFCLLayout = this.getNextLayoutOnSeparatorMovement(separator, isStartToEndDirection, fclLayoutBeforeMove, newColumnLayout) as FCLLayout;

		if (fclLayoutBeforeMove !== newFCLLayout) {
			this._columnLayout = this.nextColumnLayout(newFCLLayout);
			this._visibleColumns = this.calcVisibleColumns(this._columnLayout);
		}

		// apply the requested resize on <code>this._columnLayout</code>
		this.adjustColumnLayout(selectedColumnToResize, newColumnWidth);

		this.toggleColumns();

		return newFCLLayout;
	}

	adjustColumnLayout(columnToResize: typeof COLUMN.START | typeof COLUMN.END, newSize: number, createNewArray = false) {
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

	_onArrowKeydown(e: KeyboardEvent) {
		if (isEnter(e) || isSpace(e)) {
		  e.preventDefault();
		  const focusedElement = e.target as HTMLElement;
		  if (focusedElement === this.startArrowDOM) {
				this.switchLayoutOnArrowPress();
		  }
		}
	  }

	async _onSeparatorKeydown(e: KeyboardEvent) {
		const separator = e.target as HTMLElement;
		if (!separator.classList.contains("ui5-fcl-separator")) {
			return;
		}
		const stepSize = 2,
			bigStepSize = this._width,
			isRTL = this.effectiveDir === "rtl";
		let step = 0;

		if (isLeft(e)) {
			step = -stepSize * 10;
		} else if (isRight(e)) {
			step = stepSize * 10;
		} else if (isLeftShift(e)) {
			step = -stepSize;
		} else if (isRightShift(e)) {
			step = stepSize;
		} else if (isHome(e)) {
			e.preventDefault();
			step = isRTL ? bigStepSize : -bigStepSize;
		} else if (isEnd(e)) {
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

	private attachMoveListeners(isTouch: boolean) {
		const domRef = this.getDomRef();
		if (!domRef) {
			return;
		}
		if (isTouch && supportsTouch()) {
			domRef.addEventListener("touchmove", this._onSeparatorMove);
			domRef.addEventListener("touchend", this._onSeparatorMoveEnd);
		} else {
			domRef.addEventListener("mousemove", this._onSeparatorMove);
			domRef.addEventListener("mouseup", this._onSeparatorMoveEnd);
		}
	}

	private detachMoveListeners() {
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

	private toggleSideAnimations(separator: HTMLElement, shouldAnimate: boolean) {
		const adjacentColumns = [
			separator.previousElementSibling,
			separator.nextElementSibling,
		];

		adjacentColumns.forEach(column => column!.classList.toggle("ui5-fcl-column-animation", shouldAnimate));
	}

	private getPageXValueFromEvent(e: TouchEvent | MouseEvent): number {
		if (supportsTouch() && e instanceof TouchEvent) {
			if (e.changedTouches && e.changedTouches.length > 0) {
				return e.changedTouches[0].pageX;
			}
			return 0;
		}

		return (e as MouseEvent).pageX; // MouseEvent
	}

	convertColumnWidthToPixels(width: string | number) {
		if (typeof width === "number") {
			return width;
		}
		const parsedValue = parseFloat(width),
			totalWidth = this._availableWidthForColumns;

		if (width.endsWith("%")) {
			return (totalWidth / 100) * parsedValue;
		}
		return parsedValue;
	}

	convertToRelativeColumnWidth(pxWidth: string | number) {
		if (typeof pxWidth === "string") {
			return pxWidth;
		}
		if (pxWidth === 0) {
			return "0px";
		}
		return `${(pxWidth / this._availableWidthForColumns) * 100}%`;
	}

	getNextLayoutOnSeparatorMovement(separator: HTMLElement, isStartToEndDirection: boolean, fclLayoutBeforeMove: FCLLayout, columnLayoutAfterMove: FlexibleColumnLayoutColumnLayout) {
		const isStartSeparator = separator === this.startSeparatorDOM,
			separatorName = isStartSeparator ? "start" : "end",
			moved = (options: {separator: "start" | "end", from: FCLLayout, forward: boolean}) => {
				return options.from === fclLayoutBeforeMove
				&& options.separator === separatorName
				&& options.forward === isStartToEndDirection;
			},
			newColumnLayout = columnLayoutAfterMove.map(x => this.convertColumnWidthToPixels(x)),
			newColumnWidths = {
				start: newColumnLayout[0],
				mid: newColumnLayout[1],
				end: newColumnLayout[2],
			},
			startColumnPxWidth = newColumnWidths.start,
			startColumnPercentWidth = (startColumnPxWidth / this.widthDOM) * 100,
			isTablet = this.media === MEDIA.TABLET;

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
		const lastUsedLayout = this.layout as FCLLayout;
		this.layout = getNextLayoutByArrowPress()[lastUsedLayout as keyof typeof getNextLayoutByArrowPress];
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
	private _isColumnHidden(columnWidth: number | string): boolean {
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
	get columnLayout(): FlexibleColumnLayoutColumnLayout | undefined {
		return this._columnLayout;
	}

	/**
	* Returns if the `start` column is visible.
	* @default true
	* @public
	*/
	get startColumnVisible(): boolean {
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
	get midColumnVisible(): boolean {
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
	get endColumnVisible(): boolean {
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
	get visibleColumns(): number {
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
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-fcl-arrow--start")!;
	}

	get effectiveSeparatorsInfo() {
		return this._effectiveLayoutsByMedia[this.media][this.effectiveLayout].separators;
	}

	get effectiveLayout() {
		return this.separatorMovementSession?.tmpFCLLayout || this.layout;
	}

	get startSeparatorDOM() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-fcl-separator-start")!;
	}

	get endSeparatorDOM() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-fcl-separator-end")!;
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
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-fcl-column--start")!;
	}

	get midColumnDOM() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-fcl-column--middle")!;
	}

	get endColumnDOM() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-fcl-column--end")!;
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
		return this.accessibilityAttributes.startColumn?.name || FlexibleColumnLayout.i18nBundle.getText(FCL_START_COLUMN_TXT);
	}

	get accMiddleColumnText() {
		return this.accessibilityAttributes.midColumn?.name || FlexibleColumnLayout.i18nBundle.getText(FCL_MIDDLE_COLUMN_TXT);
	}

	get accEndColumnText() {
		return this.accessibilityAttributes.endColumn?.name || FlexibleColumnLayout.i18nBundle.getText(FCL_END_COLUMN_TXT);
	}

	get accStartSeparatorText() {
		let name = this.accessibilityAttributes.startSeparator?.name;
		if (!name && this.showStartSeparatorGrip) {
			name = FlexibleColumnLayout.i18nBundle.getText(FCL_START_SEPARATOR_TOOLTIP);
		}
		return name;
	}

	get accEndSeparatorText() {
		return this.accessibilityAttributes.endSeparator?.name || FlexibleColumnLayout.i18nBundle.getText(FCL_END_SEPARATOR_TOOLTIP);
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

	get _effectiveLayoutsByMedia() {
		return this._layoutsConfiguration || getLayoutsByMedia();
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
}

FlexibleColumnLayout.define();

export default FlexibleColumnLayout;

export type {
	MEDIA,
	FlexibleColumnLayoutLayoutChangeEventDetail,
	FCLAccessibilityAttributes,
	FlexibleColumnLayoutColumnLayout,
};
