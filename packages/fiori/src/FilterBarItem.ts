import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type Label from "@ui5/webcomponents/dist/Label.js";

// Template
import FilterBarItemTemplate from "./FilterBarItemTemplate.js";

// Styles
import FilterBarItemCss from "./generated/themes/FilterBarItem.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-filterbar-item` component represents a single filter item within the `ui5-filterbar`.
 * It is used to define individual filter criteria that can be applied to data.
 *
 * ### Usage
 *
 * The `ui5-filterbar-item` is used as a child element of `ui5-filterbar` to provide filtering options.
 * Each filter bar item represents a specific filter criterion.
 *
 * **Note:** Properties `text`, `groupName`, `visible`, `required`, `key`, and `additionalText`
 * are primarily used by `ui5-adapt-filters-dialog` for filter management functionality.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/FilterBarItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 */
@customElement({
	tag: "ui5-filterbar-item",
	renderer: jsxRenderer,
	styles: FilterBarItemCss,
	template: FilterBarItemTemplate,
})
class FilterBarItem extends UI5Element {
	/**
	 * Defines the label of the filter item.
	 *
	 * @public
	 */
	@slot()
	label!: Array<Label>;

	/**
	 * Defines the control element for the filter item.
	 * This can be any UI5 Web Component such as Input, Select, DatePicker, etc. or any HTML input element.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	control!: Array<HTMLElement>;

	/**
	 * Defines the text label for the filter.
	 * Alternative to label slot. If not provided, text will be extracted from label slot.
	 *
	 * **Note:** Used by AdaptFiltersDialog for displaying filter names.
	 *
	 * @default undefined
	 * @public
	 * @since 2.6.0
	 */
	@property()
	text?: string;

	/**
	 * Defines the group name for organizing filters.
	 *
	 * **Note:** Used by AdaptFiltersDialog to organize filters in the Groups view.
	 *
	 * @default undefined
	 * @public
	 * @since 2.6.0
	 */
	@property()
	groupName?: string;

	/**
	 * Defines the order index for the group in Groups view.
	 * Lower numbers appear first. "Basic" group typically uses 0.
	 *
	 * **Note:** Used by AdaptFiltersDialog to order groups.
	 *
	 * @default undefined
	 * @public
	 * @since 2.6.0
	 */
	@property({ type: Number })
	groupOrder?: number;

	/**
	 * Defines the visibility state of the filter in the FilterBar.
	 *
	 * **Note:** Managed by AdaptFiltersDialog to control filter visibility.
	 *
	 * @default true
	 * @public
	 * @since 2.6.0
	 */
	@property({ type: Boolean })
	visible = true;

	/**
	 * Defines whether the filter is required.
	 * Required filters cannot be removed in AdaptFiltersDialog.
	 *
	 * **Note:** Used by AdaptFiltersDialog to prevent removal of critical filters.
	 *
	 * @default false
	 * @public
	 * @since 2.6.0
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Defines a unique key for the filter item.
	 * If not provided, a key will be auto-generated.
	 *
	 * **Note:** Used by AdaptFiltersDialog for stable identification across interactions.
	 *
	 * @default undefined
	 * @public
	 * @since 2.6.0
	 */
	@property()
	key?: string;

	/**
	 * Defines additional text to display (e.g., current filter values).
	 * If not provided, values will be auto-extracted from the control element.
	 *
	 * **Note:** Used by AdaptFiltersDialog to show filter value summaries like "=1984 × =1995 ×".
	 *
	 * @default undefined
	 * @public
	 * @since 2.6.0
	 */
	@property()
	additionalText?: string;

	/**
	 * Internal flag set by AdaptFiltersDialog to mark filter items used within the dialog.
	 * @private
	 * @default false
	 */
	@property({ type: Boolean })
	_adapt_filters_item = false;

	/**
	 * Gets the effective text for this filter item.
	 * Returns the text property if set, otherwise extracts from label slot.
	 *
	 * **Note:** Used internally by AdaptFiltersDialog.
	 *
	 * @readonly
	 * @public
	 * @since 2.6.0
	 */
	get effectiveText(): string {
		if (this.text) {
			return this.text;
		}

		const labelElement = this.label?.[0];
		return labelElement?.textContent?.trim() || "";
	}

	/**
	 * Gets the effective key for this filter item.
	 * Returns the key property if set, otherwise generates a stable key.
	 *
	 * **Note:** Used internally by AdaptFiltersDialog.
	 *
	 * @readonly
	 * @public
	 * @since 2.6.0
	 */
	get effectiveKey(): string {
		if (this.key) {
			return this.key;
		}

		// Use internal ID if available
		if ((this as any)._id) {
			return String((this as any)._id);
		}

		// Generate from text
		const text = this.effectiveText;
		if (text) {
			return text.toLowerCase().replace(/\s+/g, "-");
		}

		// Last resort: generate unique ID
		return `filter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}
}

FilterBarItem.define();

export default FilterBarItem;
