import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	customElement, property, eventStrict, i18n,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableGrowingMode from "./types/TableGrowingMode.js";
import TableGrowingTemplate from "./TableGrowingTemplate.js";
import TableGrowingCss from "./generated/themes/TableGrowing.css.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import type Table from "./Table.js";
import type { ITableGrowing } from "./Table.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	TABLE_MORE,
	TABLE_MORE_DESCRIPTION,
} from "./generated/i18n/i18n-defaults.js";
import { findVerticalScrollContainer } from "./TableUtils.js";

// The documentation should be similar to the Table.ts class documentation!
// Please only use that style where it uses markdown and the documentation is more readable.

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-growing` component is used inside the `ui5-table` to add a growing/data loading functionalities
 * to the table.
 *
 * The component offers two options:
 * * Button - a More button is displayed, clicking it will load more data.
 * * Scroll - additional data is loaded automatically when the user scrolls to the end of the table.
 *
 * ### Usage
 *
 * The `ui5-table-growing` component is only used inside the `ui5-table` component as a feature.
 * It has to be slotted inside the `ui5-table` in the `features` slot.
 * The component is not intended to be used as a standalone component.
 *
 * ```html
 * <ui5-table>
 * 	<ui5-table-growing mode="Button" text="More" slot="features"></ui5-table-growing>
 * </ui5-table>
 * ```
 *
 * **Notes**:
 * * When the `ui5-table-growing` component is used with the `Scroll` mode and the table is currently not scrollable,
 * the component will render a growing button instead to ensure growing capabilities until the table becomes scrollable.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableGrowing.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 */
@customElement({
	tag: "ui5-table-growing",
	renderer: jsxRenderer,
	template: TableGrowingTemplate,
	styles: TableGrowingCss,
})

/**
 * Fired when the growing button is pressed or the user scrolls to the end of the table.
 *
 * @public
 */
@eventStrict("load-more", {
	bubbles: false,
})

class TableGrowing extends UI5Element implements ITableGrowing {
	eventDetails!: {
		"load-more": void;
	}
	/**
	 * Defines the mode of the <code>ui5-table</code> growing.
	 *
	 * Available options are:
	 *
	 * Button - Shows a More button at the bottom of the table, pressing it will load more rows.
	 *
	 * Scroll - The rows are loaded automatically by scrolling to the bottom of the table. If the table is not scrollable,
	 * a growing button will be rendered instead to ensure growing functionality.
	 * @default "Button"
	 * @public
	 */
	@property()
	mode: `${TableGrowingMode}` = "Button";

	/**
	 * Defines the text that will be displayed inside the growing button.
	 * Has no effect when mode is set to `Scroll`.
	 *
	 * **Note:** When not provided and the mode is set to Button, a default text is displayed, corresponding to the
	 * current language.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the text that will be displayed below the `text` inside the growing button.
	 * Has no effect when mode is set to Scroll.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	subtext?: string;

	/**
	 * Defines the active state of the growing button.
	 * Used for keyboard interaction.
	 * @private
	 */
	@property({ type: Boolean, noAttribute: true })
	_activeState = false;

	@property({ type: Number, noAttribute: true })
	_invalidate = 0;

	readonly identifier = "TableGrowing";
	_table?: Table;
	_observer?: IntersectionObserver;
	_currentLastRow?: HTMLElement;
	_shouldFocusRow?: boolean;
	_renderContent = true;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onTableActivate(table: Table): void {
		this._table = table;
		this._shouldFocusRow = false;
	}

	onTableAfterRendering(): void {
		// Focus the first row after growing, when the growing button is used
		if (this._shouldFocusRow) {
			this._shouldFocusRow = false;
			let focusRow = this._currentLastRow?.nextElementSibling as HTMLElement;

			if (this.hasGrowingComponent()) {
				focusRow ||= this.getFocusDomRef() as HTMLElement;
			}

			focusRow ||= this._table?.rows[0] as HTMLElement;

			focusRow?.focus();
		}

		if (this._renderContent !== this.hasGrowingComponent()) {
			this._invalidate++;
			return;
		}

		if (this._hasScrollToLoad() && !this.hasGrowingComponent() && !this._observer) {
			this._observeTableEnd();
		}
	}

	onExitDOM(): void {
		this._table = undefined;
		this._observer?.disconnect();
		this._observer = undefined;
		this._currentLastRow = undefined;
	}

	onBeforeRendering(): void {
		this._observer?.disconnect();
		this._observer = undefined;
		this._renderContent = this.hasGrowingComponent();
		this._invalidateTable();
	}

	hasGrowingComponent(): boolean {
		if (this.mode === TableGrowingMode.Scroll) {
			return !!this._table && this._table._scrollContainer.clientHeight >= this._table._tableElement.scrollHeight;
		}

		return this.mode === `${TableGrowingMode.Button}`;
	}

	/**
	 * An event handler that can be used by the Table to notify the TableGrowing that
	 * the Table is growing either by pressing the load more button or by scrolling to the end of the table.
	 */
	loadMore(): void {
		// remembers the last row. only do this when the table has a growing component rendered.
		if (this._table && this.hasGrowingComponent()) {
			this._currentLastRow = this._table.rows[this._table.rows.length - 1];
			this._shouldFocusRow = true;
		}

		this.fireDecoratorEvent("load-more");
	}

	_hasScrollToLoad() {
		return this.mode === TableGrowingMode.Scroll;
	}

	/**
	 * Observes the end of the table.
	 * @private
	 */
	_observeTableEnd(): void {
		if (!this._table) {
			return;
		}

		this._getIntersectionObserver().observe(this._table._endRow);
	}

	/**
	 * Returns the IntersectionObserver instance. If it does not exist, it will be created.
	 * The observer will call the loadMore function when the end of the table is reached.
	 * @private
	 */
	_getIntersectionObserver(): IntersectionObserver {
		if (!this._observer) {
			this._observer = new IntersectionObserver(this._onIntersection.bind(this), {
				root: findVerticalScrollContainer(this._table ?? document.body),
				rootMargin: "5px",
			});
		}
		return this._observer;
	}

	_onIntersection(entries: Array<IntersectionObserverEntry>) {
		if (entries.some(entry => entry.isIntersecting)) {
			this.loadMore();
		}
	}

	_invalidateTable() {
		if (!this._table) {
			return;
		}
		this._table._invalidate++;
	}

	/**
	 * Handles the keydown event on the growing button.
	 *
	 * Calls the loadMore function when the Enter and Space keys are pressed.
	 * @private
	 */
	_onKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this._activeState = true;
		}

		if (isEnter(e)) {
			this.loadMore();
			this._activeState = true;
		}
	}

	_onKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.loadMore();
		}
		this._activeState = false;
	}

	_onFocusout() {
		this._activeState = false;
	}

	get _buttonText() {
		return this.text || TableGrowing.i18nBundle.getText(TABLE_MORE);
	}

	get _buttonDescription() {
		return TableGrowing.i18nBundle.getText(TABLE_MORE_DESCRIPTION);
	}

	get _hasButton() {
		return this.hasGrowingComponent();
	}
}

TableGrowing.define();

export default TableGrowing;
