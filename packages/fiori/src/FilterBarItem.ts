import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

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
 * **Note:** Properties `groupName`, `hidden`, `hiddenInFilterBar`, `required`, and `filterKey`
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
	 * @default undefined
	 * @public
	 */
	@property()
	label?: string;

	/**
	 * Defines the tooltip of the filter item's label.
	 * If not set, the `label` is used as a fallback.
	 *
	 * @default undefined
	 * @public
	 * @since 2.17.0
	 */
	@property()
	labelTooltip?: string;

	/**
	 * Defines the control element for the filter item.
	 * This can be any UI5 Web Component such as Input, Select, DatePicker, etc. or any HTML input element.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	control!: Array<HTMLElement>;

	/**
	 * Defines the group name for organizing filters.
	 *
	 * **Note:** Used by AdaptFiltersDialog to organize filters in the Groups view.
	 * The value `"default"` is treated as "ungrouped".
	 *
	 * @default "default"
	 * @public
	 * @since 2.17.0
	 */
	@property()
	groupName = "default";

	/**
	 * Defines the order index for the group in Groups view.
	 * Lower numbers appear first. "Basic" group typically uses 0.
	 *
	 * **Note:** Used by AdaptFiltersDialog to order groups. This property is specific to the
	 * web component and has no equivalent in the React `FilterGroupItem`.
	 *
	 * @default undefined
	 * @public
	 * @since 2.17.0
	 */
	@property({ type: Number })
	groupOrder?: number;

	/**
	 * Defines whether the filter item is hidden everywhere - both in the FilterBar and in the
	 * AdaptFiltersDialog list.
	 *
	 * @default false
	 * @public
	 * @since 2.17.0
	 */
	@property({ type: Boolean })
	hidden = false;

	/**
	 * Defines whether the filter item is hidden in the FilterBar but still shown in the
	 * AdaptFiltersDialog list (so it can be made visible again).
	 *
	 * **Note:** An item renders in the FilterBar only when it is neither `hidden` nor `hiddenInFilterBar`.
	 *
	 * @default false
	 * @public
	 * @since 2.17.0
	 */
	@property({ type: Boolean })
	hiddenInFilterBar = false;

	/**
	 * Defines whether the filter is required.
	 * Required filters cannot be removed in AdaptFiltersDialog.
	 *
	 * **Note:** Used by AdaptFiltersDialog to prevent removal of critical filters.
	 *
	 * @default false
	 * @public
	 * @since 2.17.0
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Defines whether the filter currently holds a value (is "active").
	 * Used by AdaptFiltersDialog to show a value-active indicator.
	 *
	 * @default false
	 * @public
	 * @since 2.17.0
	 */
	@property({ type: Boolean })
	active = false;

	/**
	 * Defines a unique key for the filter item.
	 *
	 * **Note:** Used by AdaptFiltersDialog for stable identification across interactions and to
	 * link the FilterBar item with its AdaptFiltersDialog counterpart. Should be unique and must
	 * not contain whitespace. Setting it is strongly recommended - the fallback to the internal
	 * element id is unstable across element instances.
	 *
	 * @default undefined
	 * @public
	 * @since 2.17.0
	 */
	@property()
	filterKey?: string;

	/**
	 * Internal flag set by AdaptFiltersDialog to mark filter items used within the dialog.
	 * @private
	 * @default false
	 */
	@property({ type: Boolean })
	_adaptFiltersItem = false;

	_warnedMissingKey = false;

	onBeforeRendering() {
		if (!this.filterKey && !this._warnedMissingKey) {
			this._warnedMissingKey = true;
			console.warn(`FilterBarItem :: missing "filterKey" - falling back to an unstable internal id. Set a unique "filterKey" to ensure correct FilterBar / AdaptFiltersDialog linking.`); // eslint-disable-line
		}
	}

	/**
	 * Gets the effective text for this filter item, derived from the `label` property.
	 *
	 * **Note:** Used internally by AdaptFiltersDialog.
	 *
	 * @readonly
	 * @public
	 * @since 2.17.0
	 */
	get effectiveText(): string {
		return this.label || "";
	}

	/**
	 * Gets the effective tooltip for this filter item's label.
	 * Falls back to the `label` when `labelTooltip` is not set.
	 *
	 * @private
	 */
	get _effectiveLabelTooltip(): string {
		return this.labelTooltip || this.label || "";
	}

	/**
	 * Gets the effective key for this filter item.
	 * Returns the `filterKey` property if set, otherwise falls back to the internal UI5Element ID.
	 *
	 * **Note:** Used internally by AdaptFiltersDialog.
	 *
	 * @readonly
	 * @public
	 * @since 2.17.0
	 */
	get effectiveKey(): string {
		return this.filterKey || this._id;
	}
}

FilterBarItem.define();

export default FilterBarItem;
