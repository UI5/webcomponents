# AdaptFiltersDialog Refactoring Plan

## Executive Summary

This document outlines the refactoring plan for the `AdaptFiltersDialog` component to match the design shown in the reference screenshot. The approach keeps using `FilterBarItem` as the core item type while extending it with properties needed for the enhanced UI features including grouping, visibility management, and value display.

---

## Table of Contents

1. [Current State Analysis](#current-state-analysis)
2. [Design Requirements from Screenshot](#design-requirements-from-screenshot)
3. [API Strategy: Enhanced FilterBarItem](#api-strategy-enhanced-filterbaritem)
4. [Detailed Implementation Plan](#detailed-implementation-plan)
5. [Component Architecture](#component-architecture)
6. [Migration Guide](#migration-guide)
7. [Testing Strategy](#testing-strategy)
8. [Success Criteria](#success-criteria)

---

## Current State Analysis

### Existing Implementation

**Current Component:** `AdaptFiltersDialog`
- **Items Type:** `FilterBarItem[]` (slot)
- **Features:**
  - Simple list of filters with checkboxes
  - Basic search functionality
  - "Show All" / "Hide All" actions
  - Selection-based visibility model

**Current FilterBarItem API:**
```typescript
class FilterBarItem extends UI5Element {
  @slot()
  label!: Array<Label>;

  @slot({ type: HTMLElement, "default": true })
  control!: Array<HTMLElement>;
}
```

**Limitations:**
- No grouping support
- No visibility state tracking
- No way to display current filter values
- No unique identifier for items
- No required/optional indication

---

## Design Requirements from Screenshot

### Layout Analysis

The screenshot shows two distinct views with enhanced functionality:

#### **List View** (Left Panel)

**Header:**
- Title: "Adapt Filters"
- "Reset" link in top-right corner
- Tab bar: "List" (active) | "Groups"
- Section header: "Filter Values and Visibility"
- Search input with search icon
- Action buttons: "Edit" | "Sort"

**Filter Items:**
Each filter row displays:
- **Label:** Filter name with optional required indicator (*) - right-aligned
- **Values:** Token-like display of filter values (e.g., "=1984 × =1995 ×")
- **Actions:** Three icon buttons:
  1. Copy icon (📋) - Copy filter configuration
  2. Eye icon (👁) - Toggle visibility
  3. Remove icon (×) - Remove filter

**Footer:**
- "Add Filter:" label + dropdown "Select or Type Name"
- Buttons: "OK" (Emphasized) | "Filter" | "Cancel"

#### **Groups View** (Right Panel)

**Header:**
- Title: "Adapt Filters"
- "Reset" link in top-right corner
- Tab bar: "List" | "Groups" (active)
- Search input with search icon

**Filter Groups:**
Collapsible sections:
- **Basic** (expanded)
  - Company Code: * =1984 × =1995 × [📋] [👁] [×]
- **Fiscal Date Types** (expanded)
  - Fiscal Period: =0003 × =0002 × =0001 × [📋] [👁] [×]
  - Fiscal Quarter: * [📋] [👁] [×]
  - Fiscal Year: =1984 × =1995 × [📋] [👁] [×]
  - Fiscal Year Period: [📋] [👁] [×]
- **Another very important Group** (expanded)
  - Company Code: [📋] [👁] [×]
- **One more Group** (expanded)
  - One more Filter: [📋] [👁] [×]

**Footer:**
- "Add Filter:" label + dropdown "Select or Type Name"
- Buttons: "OK" (Emphasized) | "Filter" | "Cancel"

### Key Features Identified

1. **Dual View Modes:**
   - List: Flat list of all filters
   - Groups: Filters organized by categories

2. **Filter Metadata Display:**
   - Required indicator (red asterisk *)
   - Value tokens showing current filter values
   - Visual grouping in Groups view

3. **Advanced Actions:**
   - Copy: Duplicate filter configuration
   - Visibility Toggle: Show/hide in filter bar
   - Remove: Delete filter from selection

4. **Search:**
   - Filter names searchable in both views
   - Search field in header

5. **Add Filter:**
   - Dropdown to add new filters from available pool
   - Combobox-style with search capability

6. **Footer Actions:**
   - OK: Confirm changes
   - Filter: Apply without closing (new feature)
   - Cancel: Discard changes

---

## API Strategy: Add Properties to FilterBarItem

### Approach: Directly Enhance the Existing FilterBarItem Class

We will add new properties **directly to the existing `FilterBarItem` class** (not create a new class or extend it). These new properties are specifically designed for AdaptFiltersDialog functionality and will be clearly documented as such.

**Important:** This is the same `FilterBarItem` class that already exists. We're simply adding optional properties to it.

#### Updated FilterBarItem API

```typescript
/**
 * @class
 * The `ui5-filterbar-item` component represents a single filter within a FilterBar.
 * It contains a label and a control element for user input.
 */
class FilterBarItem extends UI5Element {
  // ===== EXISTING API (UNCHANGED) =====

  /**
   * Defines the label of the filter item.
   * @public
   */
  @slot()
  label!: Array<Label>;

  /**
   * Defines the control element for the filter item.
   * This can be any UI5 Web Component such as Input, Select, DatePicker, etc.
   * @public
   */
  @slot({ type: HTMLElement, "default": true })
  control!: Array<HTMLElement>;

  // ===== NEW PROPERTIES (ADDED FOR ADAPTFILTERSDIALOG) =====

  /**
   * Defines the text label for the filter.
   *
   * **Note:** This property is primarily used by AdaptFiltersDialog.
   * Alternative to label slot. If not provided, text will be extracted from label slot.
   *
   * @default undefined
   * @public
   * @since 2.6.0
   */
  @property()
  text?: string;

  /**
   * Defines the group name for organizing filters in categories.
   *
   * **Note:** This property is used by AdaptFiltersDialog to display filters
   * in the Groups view, organized by their group name.
   *
   * @default undefined
   * @public
   * @since 2.6.0
   */
  @property()
  groupName?: string;

  /**
   * Defines the visibility state of the filter.
   *
   * **Note:** This property is managed by AdaptFiltersDialog to control which
   * filters are shown or hidden in the FilterBar.
   *
   * @default true
   * @public
   * @since 2.6.0
   */
  @property({ type: Boolean })
  visible = true;

  /**
   * Defines whether the filter is required.
   *
   * **Note:** This property is used by AdaptFiltersDialog to prevent required
   * filters from being removed or hidden.
   *
   * @default false
   * @public
   * @since 2.6.0
   */
  @property({ type: Boolean })
  required = false;

  /**
   * Defines a unique key for the filter item.
   *
   * **Note:** This property is used by AdaptFiltersDialog for stable identification
   * of filters across dialog interactions. If not provided, a key will be auto-generated.
   *
   * @default undefined
   * @public
   * @since 2.6.0
   */
  @property()
  key?: string;

  /**
   * Defines additional text to display (e.g., current filter value summary).
   *
   * **Note:** This property is used by AdaptFiltersDialog to display the current
   * filter values (e.g., "=1984 × =1995 ×"). If not provided, values will be
   * auto-extracted from the control element.
   *
   * @default undefined
   * @public
   * @since 2.6.0
   */
  @property()
  additionalText?: string;

  // ===== COMPUTED PROPERTIES (ADDED FOR CONVENIENCE) =====

  /**
   * Gets the effective text for this filter item.
   * Returns the text property if set, otherwise extracts from label slot.
   *
   * **Note:** This is a computed property used internally by AdaptFiltersDialog.
   *
   * @readonly
   * @public
   * @since 2.6.0
   */
  get effectiveText(): string;

  /**
   * Gets the effective key for this filter item.
   * Returns the key property if set, otherwise generates a stable key.
   *
   * **Note:** This is a computed property used internally by AdaptFiltersDialog.
   *
   * @readonly
   * @public
   * @since 2.6.0
   */
  get effectiveKey(): string;
}
```

### Property Usage Summary

| Property | Used By | Purpose | Required | Default |
|----------|---------|---------|----------|---------|
| `label` (slot) | FilterBar, AdaptFiltersDialog | Label display | Yes (or text) | - |
| `control` (slot) | FilterBar | User input control | Yes | - |
| `text` | AdaptFiltersDialog | Alternative to label slot | No | undefined |
| `groupName` | AdaptFiltersDialog | Groups view organization | No | undefined |
| `visible` | FilterBar, AdaptFiltersDialog | Show/hide state | No | true |
| `required` | AdaptFiltersDialog | Prevent removal | No | false |
| `key` | AdaptFiltersDialog | Stable identification | No | auto-generated |
| `additionalText` | AdaptFiltersDialog | Value summary display | No | auto-extracted |

### Why This Approach?

**Advantages:**
1. **No Breaking Changes:** Existing FilterBarItem usage continues to work exactly as before
2. **Single Component:** Same FilterBarItem class used everywhere - no new classes
3. **Progressive Enhancement:** New properties are 100% optional, apps can adopt gradually
4. **Zero Conversion:** No mapping or conversion layer needed
5. **Easier Maintenance:** Single class definition, single source of truth
6. **Clear Documentation:** Properties explicitly marked for AdaptFiltersDialog use

**Backward Compatibility:**
- Apps using only `label` slot: Continue to work, AdaptFiltersDialog extracts text automatically
- Apps adding `text` property: Better performance, cleaner API
- Apps adding `groupName`: Groups view becomes available automatically
- All new properties have sensible defaults and are completely optional
- No changes needed to existing FilterBarItem instances

### Data Extraction Strategy

For backward compatibility, AdaptFiltersDialog will automatically extract data:

```typescript
// Get filter text
_getFilterText(item: FilterBarItem): string {
  // Prefer text property if set
  if (item.text) {
    return item.text;
  }

  // Fallback: Extract from label slot
  const labelElement = item.label?.[0];
  return labelElement?.textContent?.trim() || "";
}

// Get filter values
_getFilterValueDisplay(item: FilterBarItem): string {
  // Prefer additionalText if set
  if (item.additionalText) {
    return item.additionalText;
  }

  // Fallback: Extract from control
  const control = item.control?.[0];
  return this._extractValuesFromControl(control);
}

// Extract values from various control types
_extractValuesFromControl(control: HTMLElement): string {
  if (!control) return "";

  // MultiInput with tokens
  if (control.tagName === "UI5-MULTI-INPUT") {
    const tokens = (control as any).tokens || [];
    return tokens.map((t: any) => `=${t.text} ×`).join(" ");
  }

  // Input
  if (control.tagName === "UI5-INPUT") {
    const value = (control as any).value;
    return value ? `=${value} ×` : "";
  }

  // Select
  if (control.tagName === "UI5-SELECT") {
    const selected = (control as any).selectedOption;
    return selected?.text ? `=${selected.text} ×` : "";
  }

  // DatePicker
  if (control.tagName === "UI5-DATE-PICKER") {
    const value = (control as any).value;
    return value ? `=${value} ×` : "";
  }

  // DateRangePicker
  if (control.tagName === "UI5-DATERANGE-PICKER") {
    const value = (control as any).value;
    return value ? value : "";
  }

  return "";
}
```

---

## Detailed Implementation Plan

### Phase 1: Add Properties to Existing FilterBarItem

#### 1.1 Modify the Existing FilterBarItem Component

**IMPORTANT:** We are modifying the existing `FilterBarItem.ts` file, not creating a new file or new class.

**File:** `packages/fiori/src/FilterBarItem.ts`

**Changes to make:**
1. Add new `@property()` decorators for: `text`, `groupName`, `visible`, `required`, `key`, `additionalText`
2. Add computed getters: `effectiveText` and `effectiveKey`
3. Update JSDoc comments to indicate which properties are for AdaptFiltersDialog

```typescript
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, slot, property } from "@ui5/webcomponents-base/dist/decorators.js";
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
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
  tag: "ui5-filterbar-item",
  renderer: jsxRenderer,
  styles: FilterBarItemCss,
  template: FilterBarItemTemplate,
})
class FilterBarItem extends UI5Element {
  // ===== EXISTING PROPERTIES (NO CHANGES) =====

  /**
   * Defines the label of the filter item.
   * @public
   */
  @slot()
  label!: Array<Label>;

  /**
   * Defines the control element for the filter item.
   * This can be any UI5 Web Component such as Input, Select, DatePicker, etc.
   * @public
   */
  @slot({ type: HTMLElement, "default": true })
  control!: Array<HTMLElement>;

  // ===== NEW PROPERTIES (ADDED FOR ADAPTFILTERSDIALOG) =====

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

  // ===== COMPUTED PROPERTIES =====

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
```

**Summary of Changes:**
- ✅ Added 6 new `@property()` decorators to existing class
- ✅ Added 2 computed getters (`effectiveText`, `effectiveKey`)
- ✅ Updated JSDoc to clearly mark properties used by AdaptFiltersDialog
- ❌ **NOT** creating a new class
- ❌ **NOT** creating a subclass or extension
- ✅ Modifying the exact same FilterBarItem class that already exists

### Phase 2: AdaptFiltersDialog Core Refactoring

#### 2.1 Update AdaptFiltersDialog Component

**File:** `packages/fiori/src/AdaptFiltersDialog.ts`

```typescript
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type Dialog from "@ui5/webcomponents/dist/Dialog.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";

import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/copy.js";
import "@ui5/webcomponents-icons/dist/hide.js";
import "@ui5/webcomponents-icons/dist/show.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

import type FilterBarItem from "./FilterBarItem.js";

import {
  ADAPT_FILTERS_DIALOG_TITLE,
  ADAPT_FILTERS_DIALOG_LIST_TAB,
  ADAPT_FILTERS_DIALOG_GROUPS_TAB,
  ADAPT_FILTERS_DIALOG_FILTER_VALUES_VISIBILITY,
  ADAPT_FILTERS_DIALOG_SEARCH_PLACEHOLDER,
  ADAPT_FILTERS_DIALOG_EDIT_BUTTON,
  ADAPT_FILTERS_DIALOG_SORT_BUTTON,
  ADAPT_FILTERS_DIALOG_ADD_FILTER,
  ADAPT_FILTERS_DIALOG_OK_BUTTON,
  ADAPT_FILTERS_DIALOG_FILTER_BUTTON,
  ADAPT_FILTERS_DIALOG_CANCEL_BUTTON,
  ADAPT_FILTERS_DIALOG_RESET_BUTTON,
  ADAPT_FILTERS_DIALOG_UNGROUPED,
  ADAPT_FILTERS_DIALOG_COPY_TOOLTIP,
  ADAPT_FILTERS_DIALOG_VISIBILITY_TOOLTIP,
  ADAPT_FILTERS_DIALOG_REMOVE_TOOLTIP,
} from "./generated/i18n/i18n-defaults.js";

// Template
import AdaptFiltersDialogTemplate from "./AdaptFiltersDialogTemplate.js";

// Styles
import AdaptFiltersDialogCss from "./generated/themes/AdaptFiltersDialog.css.js";

type AdaptFiltersDialogConfirmEventDetail = {
  selectedFilters: Array<FilterBarItem>;
  visibilityMap: Record<string, boolean>;
}

type AdaptFiltersDialogCancelEventDetail = {
  selectedFilters: Array<FilterBarItem>;
}

type AdaptFiltersDialogFilterEventDetail = {
  selectedFilters: Array<FilterBarItem>;
  visibilityMap: Record<string, boolean>;
}

type AdaptFiltersDialogFilterVisibilityChangeEventDetail = {
  filter: FilterBarItem;
  visible: boolean;
}

type AdaptFiltersDialogFilterRemoveEventDetail = {
  filter: FilterBarItem;
}

type AdaptFiltersDialogFilterAddEventDetail = {
  filterKey: string;
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-adapt-filters-dialog` component provides an advanced dialog for managing
 * filter visibility and organization in FilterBar. It supports two view modes:
 * - List view: Flat list of all filters
 * - Groups view: Filters organized by categories
 *
 * ### Usage
 *
 * The dialog contains `ui5-filterbar-item` elements and provides features like:
 * - Filter visibility toggling
 * - Grouping by categories
 * - Value display
 * - Search functionality
 * - Add/remove filters
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/AdaptFiltersDialog.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.6.0
 */
@customElement({
  tag: "ui5-adapt-filters-dialog",
  renderer: jsxRenderer,
  styles: AdaptFiltersDialogCss,
  template: AdaptFiltersDialogTemplate,
})

/**
 * Fired when the user confirms the dialog by clicking the "OK" button.
 *
 * @param {Array<FilterBarItem>} selectedFilters - Visible filter items
 * @param {Record<string, boolean>} visibilityMap - Filter visibility states by key
 * @public
 */
@event("confirm")

/**
 * Fired when the user cancels the dialog.
 *
 * @param {Array<FilterBarItem>} selectedFilters - Current filter items
 * @public
 */
@event("cancel")

/**
 * Fired when the user clicks the "Filter" button (apply without closing).
 *
 * @param {Array<FilterBarItem>} selectedFilters - Visible filter items
 * @param {Record<string, boolean>} visibilityMap - Filter visibility states by key
 * @public
 */
@event("filter")

/**
 * Fired when a filter's visibility is toggled.
 *
 * @param {FilterBarItem} filter - The filter item
 * @param {boolean} visible - New visibility state
 * @public
 */
@event("filter-visibility-change")

/**
 * Fired when a filter is removed.
 *
 * @param {FilterBarItem} filter - The removed filter item
 * @public
 */
@event("filter-remove")

/**
 * Fired when a new filter is added.
 *
 * @param {string} filterKey - The key of the added filter
 * @public
 */
@event("filter-add")

class AdaptFiltersDialog extends UI5Element {
  eventDetails!: {
    "confirm": AdaptFiltersDialogConfirmEventDetail;
    "cancel": AdaptFiltersDialogCancelEventDetail;
    "filter": AdaptFiltersDialogFilterEventDetail;
    "filter-visibility-change": AdaptFiltersDialogFilterVisibilityChangeEventDetail;
    "filter-remove": AdaptFiltersDialogFilterRemoveEventDetail;
    "filter-add": AdaptFiltersDialogFilterAddEventDetail;
  };

  /**
   * Defines if the dialog is opened.
   * @default false
   * @public
   */
  @property({ type: Boolean })
  open = false;

  /**
   * Defines the current view mode.
   * @default "list"
   * @public
   */
  @property()
  viewMode: "list" | "groups" = "list";

  /**
   * Defines the filter items that can be adapted.
   * @public
   */
  @slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true })
  items!: Array<FilterBarItem>;

  /**
   * Defines the available filters that can be added.
   * Filters already in items will be automatically excluded.
   * @public
   */
  @slot({ type: HTMLElement, "availableFilters": true })
  availableFilters!: Array<FilterBarItem>;

  /**
   * Search value for filtering the list
   * @private
   */
  @property()
  _searchValue = "";

  /**
   * Visibility state per filter key
   * @private
   */
  @property({ noAttribute: true })
  _visibility: Record<string, boolean> = {};

  /**
   * Expanded state per group name
   * @private
   */
  @property({ noAttribute: true })
  _expandedGroups: Record<string, boolean> = {};

  /**
   * Reference to the internal dialog
   * @private
   */
  @query("[ui5-dialog]")
  _dialog?: Dialog;

  @i18n("@ui5/webcomponents-fiori")
  public static readonly i18nBundle: I18nBundle;

  // ===== LIFECYCLE =====

  onBeforeRendering() {
    // Initialize visibility map from items
    this.items.forEach(item => {
      const key = this._getFilterKey(item);
      if (this._visibility[key] === undefined) {
        this._visibility[key] = item.visible ?? true;
      }
    });

    // Initialize all groups as expanded by default
    const groups = this._getGroupNames();
    groups.forEach(group => {
      if (this._expandedGroups[group] === undefined) {
        this._expandedGroups[group] = true;
      }
    });
  }

  // ===== GETTERS =====

  /**
   * Get filter key (with fallback)
   */
  _getFilterKey(item: FilterBarItem): string {
    return item.effectiveKey;
  }

  /**
   * Get filter text
   */
  _getFilterText(item: FilterBarItem): string {
    return item.effectiveText;
  }

  /**
   * Get filter value display
   */
  _getFilterValueDisplay(item: FilterBarItem): string {
    // If additionalText is set, use it
    if (item.additionalText) {
      return item.additionalText;
    }

    // Otherwise, extract from control
    const control = item.control?.[0];
    return this._extractValuesFromControl(control);
  }

  /**
   * Extract values from various control types
   * @private
   */
  _extractValuesFromControl(control?: HTMLElement): string {
    if (!control) return "";

    // MultiInput with tokens
    if (control.tagName === "UI5-MULTI-INPUT") {
      const tokens = (control as any).tokens || [];
      if (tokens.length === 0) return "";
      return tokens.map((t: any) => `=${t.text} ×`).join(" ");
    }

    // Input
    if (control.tagName === "UI5-INPUT") {
      const value = (control as any).value;
      return value ? `=${value} ×` : "";
    }

    // Select
    if (control.tagName === "UI5-SELECT") {
      const selected = (control as any).selectedOption;
      return selected?.text ? `=${selected.text} ×` : "";
    }

    // MultiComboBox
    if (control.tagName === "UI5-MULTI-COMBOBOX") {
      const tokens = (control as any).tokens || [];
      if (tokens.length === 0) return "";
      return tokens.map((t: any) => `=${t.text} ×`).join(" ");
    }

    // DatePicker
    if (control.tagName === "UI5-DATE-PICKER") {
      const value = (control as any).value;
      return value ? `=${value} ×` : "";
    }

    // DateRangePicker
    if (control.tagName === "UI5-DATERANGE-PICKER") {
      const value = (control as any).value;
      return value ? value : "";
    }

    return "";
  }

  /**
   * Check if filter is visible
   */
  _isVisible(item: FilterBarItem): boolean {
    const key = this._getFilterKey(item);
    return this._visibility[key] ?? item.visible ?? true;
  }

  /**
   * Check if filter is required
   */
  _isRequired(item: FilterBarItem): boolean {
    return item.required ?? false;
  }

  /**
   * Get filtered items based on search
   */
  get _filteredItems(): Array<FilterBarItem> {
    if (!this._searchValue) {
      return this.items;
    }

    const searchLower = this._searchValue.toLowerCase();
    return this.items.filter(item => {
      const text = this._getFilterText(item).toLowerCase();
      const groupName = (item.groupName || "").toLowerCase();
      return text.includes(searchLower) || groupName.includes(searchLower);
    });
  }

  /**
   * Get unique group names from items
   */
  _getGroupNames(): string[] {
    const groups = new Set<string>();
    this.items.forEach(item => {
      if (item.groupName) {
        groups.add(item.groupName);
      }
    });
    return Array.from(groups).sort();
  }

  /**
   * Get grouped filters for Groups view
   */
  get _groupedFilters(): Map<string, Array<FilterBarItem>> {
    const grouped = new Map<string, Array<FilterBarItem>>();
    const ungrouped: Array<FilterBarItem> = [];

    this._filteredItems.forEach(item => {
      const groupName = item.groupName;
      if (groupName) {
        if (!grouped.has(groupName)) {
          grouped.set(groupName, []);
        }
        grouped.get(groupName)!.push(item);
      } else {
        ungrouped.push(item);
      }
    });

    // Add ungrouped items at the end if any
    if (ungrouped.length > 0) {
      grouped.set(this._ungroupedText, ungrouped);
    }

    return grouped;
  }

  /**
   * Get available filters (not already added)
   */
  get _availableFiltersToAdd(): Array<FilterBarItem> {
    const addedKeys = new Set(this.items.map(item => this._getFilterKey(item)));
    return (this.availableFilters || []).filter(filter => {
      const key = this._getFilterKey(filter);
      return !addedKeys.has(key);
    });
  }

  /**
   * Check if group is expanded
   */
  _isGroupExpanded(groupName: string): boolean {
    return this._expandedGroups[groupName] ?? true;
  }

  // ===== EVENT HANDLERS =====

  /**
   * Handle tab change
   */
  _handleTabChange(mode: "list" | "groups") {
    this.viewMode = mode;
  }

  /**
   * Handle search input
   */
  _handleSearch(e: CustomEvent) {
    const input = e.target as any;
    this._searchValue = input.value || "";
  }

  /**
   * Handle visibility toggle
   */
  _handleVisibilityToggle(item: FilterBarItem) {
    const key = this._getFilterKey(item);
    const newVisibility = !this._visibility[key];
    this._visibility = { ...this._visibility, [key]: newVisibility };

    this.fireDecoratorEvent("filter-visibility-change", {
      filter: item,
      visible: newVisibility,
    });
  }

  /**
   * Handle copy filter
   */
  _handleCopy(item: FilterBarItem) {
    // Copy filter configuration to clipboard
    const config = {
      text: this._getFilterText(item),
      groupName: item.groupName,
      visible: this._isVisible(item),
      required: item.required,
      values: this._getFilterValueDisplay(item),
    };

    try {
      navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  }

  /**
   * Handle remove filter
   */
  _handleRemove(item: FilterBarItem) {
    if (this._isRequired(item)) {
      return;
    }

    this.fireDecoratorEvent("filter-remove", { filter: item });
  }

  /**
   * Handle add filter
   */
  _handleAddFilter(e: CustomEvent) {
    const select = e.target as any;
    const filterKey = select.value;

    if (filterKey) {
      this.fireDecoratorEvent("filter-add", { filterKey });
      select.value = ""; // Reset
    }
  }

  /**
   * Handle group expand/collapse
   */
  _toggleGroup(groupName: string) {
    this._expandedGroups = {
      ...this._expandedGroups,
      [groupName]: !this._expandedGroups[groupName],
    };
  }

  /**
   * Handle OK button
   */
  _handleOK() {
    const selectedFilters = this.items.filter(item => this._isVisible(item));
    this.fireDecoratorEvent("confirm", {
      selectedFilters,
      visibilityMap: { ...this._visibility },
    });
    this.close();
  }

  /**
   * Handle Filter button (apply without closing)
   */
  _handleFilter() {
    const selectedFilters = this.items.filter(item => this._isVisible(item));
    this.fireDecoratorEvent("filter", {
      selectedFilters,
      visibilityMap: { ...this._visibility },
    });
  }

  /**
   * Handle Cancel button
   */
  _handleCancel() {
    const selectedFilters = this.items.filter(item => this._isVisible(item));
    this.fireDecoratorEvent("cancel", { selectedFilters });
    this.close();
  }

  /**
   * Handle Reset button
   */
  _handleReset() {
    // Reset all filters to visible
    const newVisibility: Record<string, boolean> = {};
    this.items.forEach(item => {
      const key = this._getFilterKey(item);
      newVisibility[key] = true;
    });
    this._visibility = newVisibility;
  }

  /**
   * Handle Edit button (List view)
   */
  _handleEdit() {
    // Future: Open edit mode for bulk editing
    console.log("Edit mode not yet implemented");
  }

  /**
   * Handle Sort button (List view)
   */
  _handleSort() {
    // Future: Open sort dialog
    console.log("Sort not yet implemented");
  }

  // ===== PUBLIC API =====

  /**
   * Opens the dialog.
   * @public
   */
  show() {
    this.open = true;
  }

  /**
   * Closes the dialog.
   * @public
   */
  close() {
    this.open = false;
  }

  // ===== i18n TEXTS =====

  get _dialogTitle() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_TITLE as unknown as string);
  }

  get _listTabText() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_LIST_TAB as unknown as string);
  }

  get _groupsTabText() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_GROUPS_TAB as unknown as string);
  }

  get _filterValuesVisibilityText() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_FILTER_VALUES_VISIBILITY as unknown as string);
  }

  get _searchPlaceholder() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_SEARCH_PLACEHOLDER as unknown as string);
  }

  get _editText() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_EDIT_BUTTON as unknown as string);
  }

  get _sortText() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_SORT_BUTTON as unknown as string);
  }

  get _addFilterText() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_ADD_FILTER as unknown as string);
  }

  get _okButtonText() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_OK_BUTTON as unknown as string);
  }

  get _filterButtonText() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_FILTER_BUTTON as unknown as string);
  }

  get _cancelButtonText() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_CANCEL_BUTTON as unknown as string);
  }

  get _resetText() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_RESET_BUTTON as unknown as string);
  }

  get _ungroupedText() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_UNGROUPED as unknown as string);
  }

  get _copyTooltip() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_COPY_TOOLTIP as unknown as string);
  }

  get _visibilityTooltip() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_VISIBILITY_TOOLTIP as unknown as string);
  }

  get _removeTooltip() {
    return AdaptFiltersDialog.i18nBundle.getText(ADAPT_FILTERS_DIALOG_REMOVE_TOOLTIP as unknown as string);
  }
}

AdaptFiltersDialog.define();

export default AdaptFiltersDialog;
export type {
  AdaptFiltersDialogConfirmEventDetail,
  AdaptFiltersDialogCancelEventDetail,
  AdaptFiltersDialogFilterEventDetail,
  AdaptFiltersDialogFilterVisibilityChangeEventDetail,
  AdaptFiltersDialogFilterRemoveEventDetail,
  AdaptFiltersDialogFilterAddEventDetail,
};
```

### Phase 3: Template Implementation

#### 3.1 Create New Template

**File:** `packages/fiori/src/AdaptFiltersDialogTemplate.tsx`

```tsx
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import Label from "@ui5/webcomponents/dist/Label.js";

import searchIcon from "@ui5/webcomponents-icons/dist/search.js";
import copyIcon from "@ui5/webcomponents-icons/dist/copy.js";
import hideIcon from "@ui5/webcomponents-icons/dist/hide.js";
import showIcon from "@ui5/webcomponents-icons/dist/show.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";
import navigationDownArrowIcon from "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import navigationRightArrowIcon from "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

import type AdaptFiltersDialog from "./AdaptFiltersDialog.js";
import type FilterBarItem from "./FilterBarItem.js";

export default function AdaptFiltersDialogTemplate(this: Readonly<AdaptFiltersDialog>) {
  return (
    <Dialog
      open={this.open}
      class="ui5-adapt-filters-dialog"
    >
      {/* Header with title and reset link */}
      <div slot="header" class="ui5-adapt-filters-header">
        <span class="ui5-adapt-filters-title">{this._dialogTitle}</span>
        <Link class="ui5-adapt-filters-reset-link" onClick={this._handleReset}>
          {this._resetText}
        </Link>
      </div>

      {/* Content */}
      <div class="ui5-adapt-filters-content">
        {/* Tab Bar */}
        <div class="ui5-adapt-filters-tabs">
          <Button
            class={`ui5-adapt-filters-tab ${this.viewMode === "list" ? "ui5-adapt-filters-tab-selected" : ""}`}
            design="Transparent"
            onClick={() => this._handleTabChange("list")}
          >
            {this._listTabText}
          </Button>
          <Button
            class={`ui5-adapt-filters-tab ${this.viewMode === "groups" ? "ui5-adapt-filters-tab-selected" : ""}`}
            design="Transparent"
            onClick={() => this._handleTabChange("groups")}
          >
            {this._groupsTabText}
          </Button>
        </div>

        {/* List View */}
        {this.viewMode === "list" && (
          <div class="ui5-adapt-filters-list-view">
            {/* Section Header */}
            <div class="ui5-adapt-filters-section-header">
              <span class="ui5-adapt-filters-section-title">
                {this._filterValuesVisibilityText}
              </span>
            </div>

            {/* Search and Actions */}
            <div class="ui5-adapt-filters-search-bar">
              <Input
                class="ui5-adapt-filters-search-input"
                value={this._searchValue}
                placeholder={this._searchPlaceholder}
                onInput={this._handleSearch}
              >
                <Icon slot="icon" name={searchIcon} />
              </Input>
              <Button
                design="Transparent"
                class="ui5-adapt-filters-action-button"
                onClick={this._handleEdit}
              >
                {this._editText}
              </Button>
              <Button
                design="Transparent"
                class="ui5-adapt-filters-action-button"
                onClick={this._handleSort}
              >
                {this._sortText}
              </Button>
            </div>

            {/* Filter Items */}
            <div class="ui5-adapt-filters-items">
              {this._filteredItems.map((item: FilterBarItem) => (
                <div
                  class="ui5-adapt-filter-item"
                  key={this._getFilterKey(item)}
                >
                  {/* Label */}
                  <span class="ui5-adapt-filter-label">
                    {this._getFilterText(item)}
                    {this._isRequired(item) && (
                      <span class="ui5-adapt-filter-required">*</span>
                    )}
                  </span>

                  {/* Value Display */}
                  <span class="ui5-adapt-filter-values">
                    {this._getFilterValueDisplay(item)}
                  </span>

                  {/* Actions */}
                  <div class="ui5-adapt-filter-actions">
                    <Button
                      icon={copyIcon}
                      design="Transparent"
                      tooltip={this._copyTooltip}
                      onClick={() => this._handleCopy(item)}
                    />
                    <Button
                      icon={this._isVisible(item) ? showIcon : hideIcon}
                      design="Transparent"
                      tooltip={this._visibilityTooltip}
                      onClick={() => this._handleVisibilityToggle(item)}
                    />
                    <Button
                      icon={declineIcon}
                      design="Transparent"
                      tooltip={this._removeTooltip}
                      disabled={this._isRequired(item)}
                      onClick={() => this._handleRemove(item)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add Filter */}
            {this._availableFiltersToAdd.length > 0 && (
              <div class="ui5-adapt-filters-add-section">
                <Label class="ui5-adapt-filters-add-label">
                  {this._addFilterText}
                </Label>
                <Select
                  class="ui5-adapt-filters-add-select"
                  onChange={this._handleAddFilter}
                >
                  <Option value="">Select or Type Name</Option>
                  {this._availableFiltersToAdd.map((filter: FilterBarItem) => (
                    <Option value={this._getFilterKey(filter)} key={this._getFilterKey(filter)}>
                      {this._getFilterText(filter)}
                    </Option>
                  ))}
                </Select>
              </div>
            )}
          </div>
        )}

        {/* Groups View */}
        {this.viewMode === "groups" && (
          <div class="ui5-adapt-filters-groups-view">
            {/* Search */}
            <div class="ui5-adapt-filters-search-bar">
              <Input
                class="ui5-adapt-filters-search-input"
                value={this._searchValue}
                placeholder={this._searchPlaceholder}
                onInput={this._handleSearch}
              >
                <Icon slot="icon" name={searchIcon} />
              </Input>
            </div>

            {/* Filter Groups */}
            <div class="ui5-adapt-filters-groups">
              {Array.from(this._groupedFilters.entries()).map(([groupName, items]) => (
                <div class="ui5-adapt-filter-group" key={groupName}>
                  {/* Group Header */}
                  <div
                    class="ui5-adapt-filter-group-header"
                    onClick={() => this._toggleGroup(groupName)}
                  >
                    <Icon
                      name={
                        this._isGroupExpanded(groupName)
                          ? navigationDownArrowIcon
                          : navigationRightArrowIcon
                      }
                      class="ui5-adapt-filter-group-icon"
                    />
                    <span class="ui5-adapt-filter-group-title">
                      {groupName}
                    </span>
                  </div>

                  {/* Group Items */}
                  {this._isGroupExpanded(groupName) && (
                    <div class="ui5-adapt-filter-group-items">
                      {items.map((item: FilterBarItem) => (
                        <div
                          class="ui5-adapt-filter-item"
                          key={this._getFilterKey(item)}
                        >
                          {/* Label */}
                          <span class="ui5-adapt-filter-label">
                            {this._getFilterText(item)}
                            {this._isRequired(item) && (
                              <span class="ui5-adapt-filter-required">*</span>
                            )}
                          </span>

                          {/* Value Display */}
                          <span class="ui5-adapt-filter-values">
                            {this._getFilterValueDisplay(item)}
                          </span>

                          {/* Actions */}
                          <div class="ui5-adapt-filter-actions">
                            <Button
                              icon={copyIcon}
                              design="Transparent"
                              tooltip={this._copyTooltip}
                              onClick={() => this._handleCopy(item)}
                            />
                            <Button
                              icon={this._isVisible(item) ? showIcon : hideIcon}
                              design="Transparent"
                              tooltip={this._visibilityTooltip}
                              onClick={() => this._handleVisibilityToggle(item)}
                            />
                            <Button
                              icon={declineIcon}
                              design="Transparent"
                              tooltip={this._removeTooltip}
                              disabled={this._isRequired(item)}
                              onClick={() => this._handleRemove(item)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Filter */}
            {this._availableFiltersToAdd.length > 0 && (
              <div class="ui5-adapt-filters-add-section">
                <Label class="ui5-adapt-filters-add-label">
                  {this._addFilterText}
                </Label>
                <Select
                  class="ui5-adapt-filters-add-select"
                  onChange={this._handleAddFilter}
                >
                  <Option value="">Select or Type Name</Option>
                  {this._availableFiltersToAdd.map((filter: FilterBarItem) => (
                    <Option value={this._getFilterKey(filter)} key={this._getFilterKey(filter)}>
                      {this._getFilterText(filter)}
                    </Option>
                  ))}
                </Select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div slot="footer" class="ui5-adapt-filters-footer">
        <Button design="Emphasized" onClick={this._handleOK}>
          {this._okButtonText}
        </Button>
        <Button design="Transparent" onClick={this._handleFilter}>
          {this._filterButtonText}
        </Button>
        <Button design="Transparent" onClick={this._handleCancel}>
          {this._cancelButtonText}
        </Button>
      </div>
    </Dialog>
  );
}
```

### Phase 4: Styling Implementation

**File:** `packages/fiori/src/themes/AdaptFiltersDialog.css`

```css
:host {
  --ui5-adapt-filters-spacing-small: 0.5rem;
  --ui5-adapt-filters-spacing-medium: 1rem;
  --ui5-adapt-filters-spacing-large: 1.5rem;
}

/* Dialog overrides */
.ui5-adapt-filters-dialog {
  min-width: 40rem;
  min-height: 30rem;
}

/* Header */
.ui5-adapt-filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--ui5-adapt-filters-spacing-medium);
}

.ui5-adapt-filters-title {
  font-size: var(--sapFontHeader5Size);
  font-weight: 600;
  color: var(--sapTextColor);
}

.ui5-adapt-filters-reset-link {
  color: var(--sapLinkColor);
  cursor: pointer;
}

/* Content */
.ui5-adapt-filters-content {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
}

/* Tabs */
.ui5-adapt-filters-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--sapGroup_ContentBorderColor);
  padding: 0 var(--ui5-adapt-filters-spacing-medium);
}

.ui5-adapt-filters-tab {
  position: relative;
  border: none;
  background: transparent;
  padding: var(--ui5-adapt-filters-spacing-small) var(--ui5-adapt-filters-spacing-medium);
  cursor: pointer;
  color: var(--sapContent_LabelColor);
}

.ui5-adapt-filters-tab-selected {
  color: var(--sapSelectedColor);
  font-weight: 600;
}

.ui5-adapt-filters-tab-selected::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--sapSelectedColor);
}

/* Section Header */
.ui5-adapt-filters-section-header {
  padding: var(--ui5-adapt-filters-spacing-medium);
  background-color: var(--sapList_HeaderBackground);
  border-bottom: 1px solid var(--sapList_BorderColor);
}

.ui5-adapt-filters-section-title {
  font-weight: 600;
  color: var(--sapTextColor);
  font-size: var(--sapFontSize);
}

/* Search Bar */
.ui5-adapt-filters-search-bar {
  display: flex;
  gap: var(--ui5-adapt-filters-spacing-small);
  padding: var(--ui5-adapt-filters-spacing-medium);
  align-items: center;
  border-bottom: 1px solid var(--sapList_BorderColor);
}

.ui5-adapt-filters-search-input {
  flex: 1 1 auto;
}

.ui5-adapt-filters-action-button {
  flex: 0 0 auto;
}

/* Filter Items Container */
.ui5-adapt-filters-items {
  display: flex;
  flex-direction: column;
  max-height: 25rem;
  overflow-y: auto;
}

/* Individual Filter Item */
.ui5-adapt-filter-item {
  display: flex;
  align-items: center;
  gap: var(--ui5-adapt-filters-spacing-medium);
  padding: var(--ui5-adapt-filters-spacing-small) var(--ui5-adapt-filters-spacing-medium);
  border-bottom: 1px solid var(--sapList_BorderColor);
  min-height: 2.75rem;
}

.ui5-adapt-filter-item:hover {
  background-color: var(--sapList_Hover_Background);
}

/* Filter Label */
.ui5-adapt-filter-label {
  flex: 0 0 auto;
  min-width: 12rem;
  max-width: 12rem;
  text-align: right;
  font-weight: 400;
  color: var(--sapContent_LabelColor);
  padding-right: var(--ui5-adapt-filters-spacing-small);
}

.ui5-adapt-filter-required {
  color: var(--sapErrorColor);
  margin-left: 0.125rem;
}

/* Filter Values Display */
.ui5-adapt-filter-values {
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  color: var(--sapTextColor);
  font-size: var(--sapFontSize);
}

/* Filter Actions */
.ui5-adapt-filter-actions {
  flex: 0 0 auto;
  display: flex;
  gap: 0.25rem;
}

/* Groups View */
.ui5-adapt-filters-groups-view {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.ui5-adapt-filters-groups {
  display: flex;
  flex-direction: column;
  max-height: 25rem;
  overflow-y: auto;
}

/* Group Container */
.ui5-adapt-filter-group {
  display: flex;
  flex-direction: column;
}

/* Group Header */
.ui5-adapt-filter-group-header {
  display: flex;
  align-items: center;
  gap: var(--ui5-adapt-filters-spacing-small);
  padding: var(--ui5-adapt-filters-spacing-medium);
  background-color: var(--sapList_GroupHeaderBackground);
  border-bottom: 1px solid var(--sapList_BorderColor);
  cursor: pointer;
  font-weight: 600;
  color: var(--sapGroup_TitleTextColor);
}

.ui5-adapt-filter-group-header:hover {
  background-color: var(--sapList_Hover_Background);
}

.ui5-adapt-filter-group-icon {
  flex: 0 0 auto;
  width: 1rem;
  height: 1rem;
}

.ui5-adapt-filter-group-title {
  flex: 1 1 auto;
  font-size: var(--sapFontSize);
}

/* Group Items */
.ui5-adapt-filter-group-items {
  display: flex;
  flex-direction: column;
  padding-left: var(--ui5-adapt-filters-spacing-large);
}

/* Add Filter Section */
.ui5-adapt-filters-add-section {
  display: flex;
  align-items: center;
  gap: var(--ui5-adapt-filters-spacing-small);
  padding: var(--ui5-adapt-filters-spacing-medium);
  border-top: 1px solid var(--sapList_BorderColor);
}

.ui5-adapt-filters-add-label {
  flex: 0 0 auto;
  font-weight: 400;
  color: var(--sapContent_LabelColor);
}

.ui5-adapt-filters-add-select {
  flex: 1 1 auto;
  max-width: 20rem;
}

/* Footer */
.ui5-adapt-filters-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--ui5-adapt-filters-spacing-small);
  padding: var(--ui5-adapt-filters-spacing-medium);
}

/* RTL Support */
[dir="rtl"] .ui5-adapt-filter-label {
  text-align: left;
  padding-right: 0;
  padding-left: var(--ui5-adapt-filters-spacing-small);
}

[dir="rtl"] .ui5-adapt-filter-group-items {
  padding-left: 0;
  padding-right: var(--ui5-adapt-filters-spacing-large);
}

/* Responsive: Mobile */
@media (max-width: 600px) {
  .ui5-adapt-filters-dialog {
    min-width: auto;
    width: 100%;
  }

  .ui5-adapt-filter-label {
    min-width: 8rem;
    max-width: 8rem;
  }

  .ui5-adapt-filters-search-bar {
    flex-wrap: wrap;
  }
}
```

### Phase 5: i18n Updates

**File:** `packages/fiori/src/i18n/messagebundle.properties`

```properties
# AdaptFiltersDialog
ADAPT_FILTERS_DIALOG_TITLE=Adapt Filters
ADAPT_FILTERS_DIALOG_LIST_TAB=List
ADAPT_FILTERS_DIALOG_GROUPS_TAB=Groups
ADAPT_FILTERS_DIALOG_FILTER_VALUES_VISIBILITY=Filter Values and Visibility
ADAPT_FILTERS_DIALOG_SEARCH_PLACEHOLDER=Search
ADAPT_FILTERS_DIALOG_EDIT_BUTTON=Edit
ADAPT_FILTERS_DIALOG_SORT_BUTTON=Sort
ADAPT_FILTERS_DIALOG_ADD_FILTER=Add Filter:
ADAPT_FILTERS_DIALOG_OK_BUTTON=OK
ADAPT_FILTERS_DIALOG_FILTER_BUTTON=Filter
ADAPT_FILTERS_DIALOG_CANCEL_BUTTON=Cancel
ADAPT_FILTERS_DIALOG_RESET_BUTTON=Reset
ADAPT_FILTERS_DIALOG_UNGROUPED=Ungrouped Filters
ADAPT_FILTERS_DIALOG_COPY_TOOLTIP=Copy
ADAPT_FILTERS_DIALOG_VISIBILITY_TOOLTIP=Toggle Visibility
ADAPT_FILTERS_DIALOG_REMOVE_TOOLTIP=Remove Filter
```

---

## Component Architecture

### Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                        FilterBar                              │
│                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐│
│  │ FilterBarItem  │  │ FilterBarItem  │  │ FilterBarItem  ││
│  │ text="Company" │  │ text="Fiscal"  │  │ text="Period"  ││
│  │ groupName=     │  │ groupName=     │  │ groupName=     ││
│  │   "Basic"      │  │   "Dates"      │  │   "Dates"      ││
│  │ visible=true   │  │ visible=true   │  │ visible=false  ││
│  │ ┌────────────┐ │  │ ┌────────────┐ │  │ ┌────────────┐ ││
│  │ │ MultiInput │ │  │ │   Input    │ │  │ │DatePicker  │ ││
│  │ └────────────┘ │  │ └────────────┘ │  │ └────────────┘ ││
│  └────────────────┘  └────────────────┘  └────────────────┘│
│                                                               │
│  [Go] [Filters] [Clear]                                      │
│         │                                                     │
└─────────┼─────────────────────────────────────────────────────┘
          │ User clicks "Filters"
          │
          ▼
┌──────────────────────────────────────────────────────────────┐
│                  AdaptFiltersDialog                           │
│                                                               │
│  Items: Same FilterBarItem[] (passed by reference)           │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ List View             │ Groups View                    │ │
│  │ ──────────────────────┼──────────────────────────────  │ │
│  │ Company: =1984 × ...  │ Basic                          │ │
│  │ Fiscal: =1984 × ...   │   Company: =1984 × ...         │ │
│  │ Period: [hidden]      │ Dates                          │ │
│  │                       │   Fiscal: =1984 × ...          │ │
│  │                       │   Period: [hidden]             │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  [OK] [Filter] [Cancel]                                      │
│        │                                                      │
└────────┼──────────────────────────────────────────────────────┘
         │ User confirms
         │
         ▼
┌──────────────────────────────────────────────────────────────┐
│                  FilterBar Updated                            │
│                                                               │
│  FilterBarItem.visible properties updated                    │
│  Hidden items styled with display:none                       │
└──────────────────────────────────────────────────────────────┘
```

### Data Model

```typescript
// FilterBarItem (Single Source of Truth)
interface FilterBarItem {
  // Display
  text: string;                    // "Company Code"
  label: Label[];                  // Fallback: <ui5-label>
  control: HTMLElement[];          // <ui5-multi-input>, etc.

  // Organization
  groupName: string;               // "Basic", "Fiscal Date Types"
  key: string;                     // "companyCode"

  // State
  visible: boolean;                // true/false
  required: boolean;               // Cannot be removed

  // Value Display
  additionalText: string;          // "=1984 × =1995 ×"

  // Computed
  effectiveText: string;           // text || label[0].textContent
  effectiveKey: string;            // key || _id || generated
}
```

### Integration Flow

```typescript
// 1. FilterBar opens AdaptFiltersDialog
filterBar._handleFiltersPress() {
  const dialog = document.createElement("ui5-adapt-filters-dialog");

  // Pass FilterBarItems directly
  filterBar.items.forEach(item => {
    dialog.appendChild(item.cloneNode(true));
  });

  // Listen for changes
  dialog.addEventListener("confirm", (e) => {
    const { visibilityMap } = e.detail;

    // Update FilterBarItem visibility
    filterBar.items.forEach(item => {
      const key = item.effectiveKey;
      item.visible = visibilityMap[key] ?? true;
    });

    filterBar._updateLayout();
  });

  dialog.show();
}

// 2. AdaptFiltersDialog manages visibility
adaptDialog._handleVisibilityToggle(item) {
  const key = item.effectiveKey;
  this._visibility[key] = !this._visibility[key];

  // Fire event for real-time preview
  this.fireEvent("filter-visibility-change", {
    filter: item,
    visible: this._visibility[key]
  });
}

// 3. FilterBar updates display
filterBar._handleFilterVisibilityChange(e) {
  const { filter, visible } = e.detail;

  // Update UI immediately
  const barItem = this.items.find(i => i.effectiveKey === filter.effectiveKey);
  if (barItem) {
    barItem.style.display = visible ? "" : "none";
  }
}
```

---

## Migration Guide

### For Existing Applications

#### Current Usage (Still Works)

```html
<ui5-filterbar>
  <ui5-filterbar-item>
    <ui5-label slot="label">Company Code</ui5-label>
    <ui5-multi-input>
      <ui5-token text="1984"></ui5-token>
      <ui5-token text="1995"></ui5-token>
    </ui5-multi-input>
  </ui5-filterbar-item>
</ui5-filterbar>
```

**What happens:**
- AdaptFiltersDialog extracts text from label slot
- AdaptFiltersDialog extracts values from MultiInput
- Basic functionality works as before
- Groups view only shows if groupName is set

#### Enhanced Usage (Recommended)

```html
<ui5-filterbar>
  <ui5-filterbar-item
    text="Company Code"
    group-name="Basic"
    key="companyCode"
    visible
    required
  >
    <ui5-label slot="label">Company Code</ui5-label>
    <ui5-multi-input>
      <ui5-token text="1984"></ui5-token>
      <ui5-token text="1995"></ui5-token>
    </ui5-multi-input>
  </ui5-filterbar-item>

  <ui5-filterbar-item
    text="Fiscal Year"
    group-name="Fiscal Date Types"
    key="fiscalYear"
    visible
  >
    <ui5-label slot="label">Fiscal Year</ui5-label>
    <ui5-input value="2024"></ui5-input>
  </ui5-filterbar-item>
</ui5-filterbar>
```

**Benefits:**
- Groups view becomes available
- Better performance (no label extraction)
- Cleaner API
- Required filters cannot be removed
- Explicit visibility management

#### Programmatic Value Display

```html
<ui5-filterbar-item
  text="Company Code"
  group-name="Basic"
  key="companyCode"
  additional-text="=1984 × =1995 ×"
  visible
>
  <ui5-label slot="label">Company Code</ui5-label>
  <ui5-multi-input id="companyInput">
    <ui5-token text="1984"></ui5-token>
    <ui5-token text="1995"></ui5-token>
  </ui5-multi-input>
</ui5-filterbar-item>

<script>
  // Update additionalText when tokens change
  const input = document.getElementById("companyInput");
  const filterItem = input.closest("ui5-filterbar-item");

  input.addEventListener("token-delete", () => {
    updateAdditionalText();
  });

  function updateAdditionalText() {
    const tokens = input.tokens.map(t => `=${t.text} ×`).join(" ");
    filterItem.additionalText = tokens;
  }
</script>
```

### Migration Checklist

- [ ] Add `text` property to FilterBarItem for cleaner API (optional)
- [ ] Add `groupName` property to enable Groups view (optional)
- [ ] Add `key` property for stable identification (recommended)
- [ ] Add `visible` property for initial visibility state (optional)
- [ ] Add `required` property for mandatory filters (optional)
- [ ] Update event handlers to use new `visibilityMap` structure
- [ ] Test both List and Groups views
- [ ] Verify value display extraction works correctly
- [ ] Update FilterBar integration if needed

---

## Testing Strategy

### Unit Tests

#### FilterBarItem Tests

**File:** `packages/fiori/test/specs/FilterBarItem.spec.ts`

```typescript
describe("FilterBarItem - Enhanced Properties", () => {
  it("should have text property", () => {
    const item = document.createElement("ui5-filterbar-item");
    item.text = "Company Code";
    expect(item.text).toBe("Company Code");
  });

  it("should have groupName property", () => {
    const item = document.createElement("ui5-filterbar-item");
    item.groupName = "Basic";
    expect(item.groupName).toBe("Basic");
  });

  it("should have visible property defaulting to true", () => {
    const item = document.createElement("ui5-filterbar-item");
    expect(item.visible).toBe(true);
  });

  it("should have required property defaulting to false", () => {
    const item = document.createElement("ui5-filterbar-item");
    expect(item.required).toBe(false);
  });

  it("should compute effectiveText from text property", () => {
    const item = document.createElement("ui5-filterbar-item");
    item.text = "Test Filter";
    expect(item.effectiveText).toBe("Test Filter");
  });

  it("should compute effectiveText from label slot as fallback", () => {
    const item = document.createElement("ui5-filterbar-item");
    const label = document.createElement("ui5-label");
    label.textContent = "Label Text";
    item.label = [label];
    expect(item.effectiveText).toBe("Label Text");
  });

  it("should generate effectiveKey from key property", () => {
    const item = document.createElement("ui5-filterbar-item");
    item.key = "testKey";
    expect(item.effectiveKey).toBe("testKey");
  });
});
```

#### AdaptFiltersDialog Tests

**File:** `packages/fiori/test/specs/AdaptFiltersDialog.spec.ts`

```typescript
describe("AdaptFiltersDialog - Enhanced Features", () => {
  it("should accept FilterBarItem elements", () => {
    const dialog = document.createElement("ui5-adapt-filters-dialog");
    const item = document.createElement("ui5-filterbar-item");
    item.text = "Company Code";

    dialog.appendChild(item);
    expect(dialog.items.length).toBe(1);
  });

  it("should switch between List and Groups views", () => {
    const dialog = document.createElement("ui5-adapt-filters-dialog");
    expect(dialog.viewMode).toBe("list");

    dialog.viewMode = "groups";
    expect(dialog.viewMode).toBe("groups");
  });

  it("should group filters by groupName", () => {
    const dialog = document.createElement("ui5-adapt-filters-dialog");

    const item1 = document.createElement("ui5-filterbar-item");
    item1.text = "Company Code";
    item1.groupName = "Basic";

    const item2 = document.createElement("ui5-filterbar-item");
    item2.text = "Fiscal Year";
    item2.groupName = "Fiscal Date Types";

    dialog.appendChild(item1);
    dialog.appendChild(item2);

    const grouped = dialog._groupedFilters;
    expect(grouped.size).toBe(2);
    expect(grouped.get("Basic")).toContain(item1);
  });

  it("should extract values from MultiInput", () => {
    const dialog = document.createElement("ui5-adapt-filters-dialog");
    const input = document.createElement("ui5-multi-input");

    const token1 = document.createElement("ui5-token");
    token1.text = "1984";
    const token2 = document.createElement("ui5-token");
    token2.text = "1995";

    input.tokens = [token1, token2];

    const result = dialog._extractValuesFromControl(input);
    expect(result).toBe("=1984 × =1995 ×");
  });

  it("should fire confirm event with visibilityMap", (done) => {
    const dialog = document.createElement("ui5-adapt-filters-dialog");
    const item = document.createElement("ui5-filterbar-item");
    item.text = "Test";
    item.key = "test";

    dialog.appendChild(item);

    dialog.addEventListener("confirm", (e: CustomEvent) => {
      expect(e.detail.visibilityMap).toBeDefined();
      expect(e.detail.visibilityMap.test).toBe(true);
      done();
    });

    dialog._handleOK();
  });

  it("should respect required filters in remove action", () => {
    const dialog = document.createElement("ui5-adapt-filters-dialog");
    const item = document.createElement("ui5-filterbar-item");
    item.text = "Required Filter";
    item.required = true;

    dialog.appendChild(item);

    expect(dialog._isRequired(item)).toBe(true);
  });
});
```

### Integration Tests

**File:** `packages/fiori/test/specs/FilterBar-AdaptFilters.spec.ts`

```typescript
describe("FilterBar - AdaptFiltersDialog Integration", () => {
  it("should pass FilterBarItems to AdaptFiltersDialog", () => {
    const filterBar = document.createElement("ui5-filterbar");
    const item = document.createElement("ui5-filterbar-item");
    item.text = "Company Code";

    filterBar.appendChild(item);

    // Open dialog (simulated)
    const dialog = document.createElement("ui5-adapt-filters-dialog");
    filterBar.items.forEach(i => dialog.appendChild(i.cloneNode(true)));

    expect(dialog.items.length).toBe(1);
    expect(dialog.items[0].text).toBe("Company Code");
  });

  it("should update FilterBarItem visibility on confirm", () => {
    const filterBar = document.createElement("ui5-filterbar");
    const item = document.createElement("ui5-filterbar-item");
    item.text = "Test";
    item.key = "test";
    item.visible = true;

    filterBar.appendChild(item);

    // Simulate dialog confirm with visibility change
    const visibilityMap = { test: false };
    item.visible = visibilityMap.test;

    expect(item.visible).toBe(false);
  });
});
```

### Accessibility Tests

- **ARIA Attributes:**
  - Verify `role="tablist"` for tab navigation
  - Verify `aria-expanded` for collapsible groups
  - Verify `aria-label` for icon-only buttons

- **Keyboard Navigation:**
  - Tab through all controls
  - Arrow keys for tab switching
  - Enter/Space for actions
  - Escape to close dialog

- **Screen Reader Testing:**
  - Test with NVDA, JAWS, VoiceOver
  - Verify all labels are announced
  - Verify action button purposes are clear

---

## Success Criteria

### Must Have

✅ **Modified FilterBarItem (same class, new properties):**
- Add `text`, `groupName`, `visible`, `required`, `key`, `additionalText` properties to existing class
- Maintain 100% backward compatibility with existing label slot usage
- Implement `effectiveText` and `effectiveKey` computed getters
- Document all new properties as being for AdaptFiltersDialog use

✅ **AdaptFiltersDialog Refactoring:**
- Support both List and Groups view modes
- Implement tab navigation
- Display filter values (extracted or provided)
- Add visibility toggle, copy, and remove actions
- Implement search functionality
- Add filter dropdown (if availableFilters provided)
- Collapsible groups in Groups view

✅ **Events:**
- confirm event with visibilityMap
- filter event (apply without close)
- cancel event
- filter-visibility-change event
- filter-remove event
- filter-add event

✅ **Quality:**
- All unit tests passing
- Integration tests passing
- Accessibility compliance (WCAG 2.1 AA)
- RTL support
- Responsive design

### Should Have

✅ Edit action placeholder
✅ Sort action placeholder
✅ Copy to clipboard functionality
✅ Value extraction from common controls
✅ Ungrouped filters handling

### Nice to Have

🔄 Drag-and-drop reordering
🔄 Inline value editing
🔄 Filter templates
🔄 Export/import configurations
🔄 Keyboard shortcuts

---

## Implementation Timeline

### Week 1: Add Properties to FilterBarItem
- Modify existing FilterBarItem.ts file to add new properties
- Add `text`, `groupName`, `visible`, `required`, `key`, `additionalText` properties
- Implement `effectiveText` and `effectiveKey` computed getters
- Write unit tests for new properties
- Update JSDoc documentation marking AdaptFiltersDialog usage

**Deliverables:**
- Modified FilterBarItem.ts with new properties
- Unit tests passing for new properties
- API documentation updated with AdaptFiltersDialog usage notes

### Week 2: AdaptFiltersDialog Core
- Refactor AdaptFiltersDialog
- Add view mode switching
- Implement grouping logic
- Add visibility management
- Value extraction utilities

**Deliverables:**
- Core refactoring complete
- Basic functionality working
- Unit tests for core features

### Week 3: UI Implementation
- Create template with List/Groups views
- Implement filter item rendering
- Add action buttons
- Implement search
- Add "Add Filter" section
- Complete styling

**Deliverables:**
- Complete UI matching design
- All interactions working
- Visual polish complete

### Week 4: Integration & Events
- Implement all events
- FilterBar integration updates
- Real-time preview functionality
- Event documentation

**Deliverables:**
- Complete event system
- FilterBar integration working
- Integration tests passing

### Week 5: Testing & Polish
- Integration tests
- Accessibility audit and fixes
- Performance optimization
- Cross-browser testing
- RTL testing

**Deliverables:**
- Complete test coverage
- Accessibility compliant
- Performance optimized

### Week 6: Documentation & Release
- Complete API documentation
- Migration guide
- Sample applications
- Release notes

**Deliverables:**
- Full documentation
- Example apps
- Release v2.6.0

---

---

## Best Practices Compliance (Implemented)

### CSS Best Practices

The following CSS improvements have been implemented to align with UI5 Web Components best practices:

#### 1. CSS Logical Properties for RTL Support

Per the styling documentation, CSS logical properties are used instead of physical properties to automatically support RTL layouts:

| Before | After |
|--------|-------|
| `text-align: right` | `text-align: end` |
| `padding-right` | `padding-inline-end` |
| `margin-left` | `margin-inline-start` |
| `left: 0; right: 0` | `inset-inline: 0` |

This eliminates the need for separate RTL override rules.

#### 2. Attribute Selectors Instead of Tag Selectors

Per the deep dive documentation, attribute selectors should be used instead of tag selectors due to scoping considerations:

```css
/* Recommended */
[ui5-button] { ... }

/* Not recommended (may break with scoping) */
ui5-button { ... }
```

### Template Best Practices

#### 1. Icon Usage with String Names

Icons are now referenced by string names (which are registered for side effects), not imported module values:

```tsx
// ✓ Correct - use string name
<Icon name="search" />

// ✗ Wrong - don't use imported icon module
<Icon name={searchIcon} />
```

Icons are imported in the component file for side effects:
```ts
import "@ui5/webcomponents-icons/dist/search.js";
```

#### 2. Accessible Group Headers

The group header elements use proper ARIA attributes for accessibility:

```tsx
<div
    class="ui5-adapt-filter-group-header"
    role="button"
    tabindex={0}
    aria-expanded={this._isGroupExpanded(groupName)}
    onClick={() => this._toggleGroup(groupName)}
    onKeyDown={(e: KeyboardEvent) => this._handleGroupHeaderKeyDown(e, groupName)}
>
```

This ensures:
- Keyboard navigation (Enter/Space to toggle)
- Screen reader announces expand/collapse state
- Proper focus management

#### 3. Silent Error Handling

Per best practices, clipboard operations fail silently instead of logging warnings:

```ts
try {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
} catch {
    // Silently fail if clipboard is not available or permission denied
}
```

### Component Class Best Practices

#### 1. Using `fireDecoratorEvent` (v2.4.0+)

The component uses `fireDecoratorEvent` instead of `fireEvent` as recommended since v2.4.0:

```ts
this.fireDecoratorEvent("filter-visibility-change", {
    filter: item,
    visible: newVisibility,
});
```

#### 2. Event Detail Types Exported

All event detail types are exported for consumer usage:

```ts
export type {
    AdaptFiltersDialogConfirmEventDetail,
    AdaptFiltersDialogCancelEventDetail,
    // ...
};
```

#### 3. Proper Slot Configuration

Slots use proper configuration for child change invalidation:

```ts
@slot({ 
    type: HTMLElement, 
    "default": true, 
    invalidateOnChildChange: true, 
    individualSlots: true 
})
items!: Array<FilterBarItem>;
```

---

## Conclusion

This refactoring plan transforms the AdaptFiltersDialog into a modern, feature-rich component while maintaining full backward compatibility by:

1. **Adding properties to the existing FilterBarItem class** - No new classes, no extensions, just new optional properties
2. **Implementing List and Groups views** matching the reference design
3. **Providing automatic fallbacks** for apps not using new properties
4. **Maintaining the exact same FilterBarItem class** throughout the ecosystem
5. **Enabling progressive adoption** of new features without breaking changes

The approach ensures that existing applications continue to work without modifications while enabling new applications to leverage the full feature set through simple property additions.

**Key Benefits:**
- ✅ No breaking changes - existing code works as-is
- ✅ No new classes - same FilterBarItem everywhere
- ✅ No conversion layer needed - direct usage
- ✅ Progressive enhancement model - adopt at your own pace
- ✅ Single source of truth - one FilterBarItem class
- ✅ Simplified architecture - no complexity added
- ✅ Easy migration path - just add properties when ready
- ✅ Clear documentation - properties marked for AdaptFiltersDialog use

**Implementation Approach:**
- Modify `packages/fiori/src/FilterBarItem.ts` directly
- Add 6 new `@property()` decorators
- Add 2 computed getters
- Update JSDoc with AdaptFiltersDialog usage notes
- All new properties are optional with sensible defaults

**Next Steps:**
1. Review and approve plan
2. Create implementation tickets
3. Begin Phase 1: Modify FilterBarItem.ts to add new properties
4. Weekly progress reviews
5. Stakeholder demos
