# Issue #12045: [Feature Request] - Add Live Region for Selectable List

## Issue Summary

- **URL**: https://github.com/UI5/webcomponents/issues/12045
- **Type**: Feature Request (A11Y)
- **Priority**: None specified
- **Labels**: feature request, TOPIC P, UI5_WEBC_4_REACT
- **Status**: Open (Issues column)

## Problem

In SAPUI5, when a list item is selected/unselected, a live region announces the change to screen readers. This feature is missing in UI5 Web Components. Currently, the selection state is only communicated via static `aria-describedby` text on each item (which is read when the item receives focus), but there is no dynamic/live announcement upon selection change.

The issue was raised in context of ui5-webcomponents-react's `SelectDialog` multi-select mode.

## Codebase Analysis

### Current Selection State Communication

**Static ARIA on each item** (`packages/main/src/ListItem.ts`, lines 430-453):
```typescript
get ariaSelectedText() {
    let ariaSelectedText;
    if (this._ariaSelected !== undefined) {
        ariaSelectedText = this._ariaSelected
            ? ListItem.i18nBundle.getText(LIST_ITEM_SELECTED)
            : ListItem.i18nBundle.getText(LIST_ITEM_NOT_SELECTED);
    }
    return ariaSelectedText;
}
```

This text is rendered in a hidden `<span>` referenced by `aria-describedby` in `ListItemTemplate.tsx` (lines 56, 104-108).

**List-level mode text** (`packages/main/src/List.ts`, lines 800-813):
```typescript
get ariaLabelModeText(): string {
    if (this.hasData) {
        if (this.isMultiple) return List.i18nBundle.getText(ARIA_LABEL_LIST_MULTISELECTABLE);
        if (this.isSingleSelect) return List.i18nBundle.getText(ARIA_LABEL_LIST_SELECTABLE);
        if (this.isDelete) return List.i18nBundle.getText(ARIA_LABEL_LIST_DELETABLE);
    }
    return "";
}
```

**No live region exists** - searched across all List-related files. Zero instances of `aria-live`, `InvisibleMessage`, or `announce`.

### Where Selection Events Are Fired

The selection-change event is fired in `List.ts` when items are selected. This is the ideal hook point for adding a live announcement.

### Key Files

| File | Path |
|------|------|
| List component | `packages/main/src/List.ts` |
| ListItem component | `packages/main/src/ListItem.ts` |
| List template | `packages/main/src/ListTemplate.tsx` |
| ListItem template | `packages/main/src/ListItemTemplate.tsx` |
| i18n bundle | `packages/main/src/i18n/messagebundle.properties` |
| InvisibleMessage (base) | `packages/base/src/InvisibleMessage.ts` |

### Existing Pattern: InvisibleMessage Usage

The codebase already has `InvisibleMessage` from `@ui5/webcomponents-base`. It is used in other components (e.g., DynamicPage announces "Header Expanded"/"Header Snapped"). The pattern:

```typescript
import { announce } from "@ui5/webcomponents-base/dist/InvisibleMessage.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";

announce(text, InvisibleMessageMode.Polite);
```

## Visual Spec Reference

- **List (Horizon)**: https://wiki.one.int.sap/wiki/spaces/visualcore/pages/2822644228/List+Horizon
- The visual spec focuses on visual layout. Accessibility live regions are behavioral and not covered in visual specs.

## Spec Update Needed

**No visual spec update needed.** This is a behavioral/accessibility feature. However, an **accessibility spec** or **interaction guidelines** document should be consulted to confirm the expected announcement text format (e.g., "{item name} selected" vs "Selected" vs "{item name}, selected, {X} of {Y} items selected").

**Design team consultation recommended** to define:
1. The exact announcement text format
2. Whether to announce in both single and multi-select modes
3. Whether to include item count in multi-select announcements

## Step-by-Step Implementation Guide

### Step 1: Add i18n texts for selection announcements

Add new i18n entries to `packages/main/src/i18n/messagebundle.properties`:

```properties
# List selection announcements
LIST_ITEM_SELECTED_ANNOUNCEMENT=Selected
LIST_ITEM_UNSELECTED_ANNOUNCEMENT=Not Selected
```

Import these in the component:
```typescript
import {
    LIST_ITEM_SELECTED_ANNOUNCEMENT,
    LIST_ITEM_UNSELECTED_ANNOUNCEMENT,
} from "./generated/i18n/i18n-defaults.js";
```

### Step 2: Add live region announcement in `List.ts`

Import InvisibleMessage:
```typescript
import { announce } from "@ui5/webcomponents-base/dist/InvisibleMessage.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
```

Add announcement logic after selection changes. Locate the `selectionChange` handler and add:

```typescript
_announceSelectionChange(item: ListItem, selected: boolean) {
    if (this.selectionMode === "None") return;
    
    const itemText = item.accessibleName || item.textContent?.trim() || "";
    const stateText = selected
        ? List.i18nBundle.getText(LIST_ITEM_SELECTED_ANNOUNCEMENT)
        : List.i18nBundle.getText(LIST_ITEM_UNSELECTED_ANNOUNCEMENT);
    
    announce(`${itemText} ${stateText}`, InvisibleMessageMode.Polite);
}
```

Call this method from within the selection change flow (after `fireSelectionChange` or equivalent internal handler).

### Step 3: Hook into the selection flow

In the method that handles item click/selection (look for `_handleItemPress`, `_selectionRequested`, or `onSelectionChange`), after the selection state is toggled and the event is fired, call `_announceSelectionChange`.

### Step 4: Write tests

Add Cypress test in `packages/main/cypress/specs/List.cy.tsx`:

```typescript
it("should announce selection change via live region", () => {
    cy.mount(
        <List selectionMode="Multiple">
            <ListItemStandard>Item 1</ListItemStandard>
            <ListItemStandard>Item 2</ListItemStandard>
        </List>
    );
    
    // Click to select
    cy.get("[ui5-li]").first().realClick();
    
    // Verify InvisibleMessage was called (check for aria-live span in DOM)
    cy.get("body")
        .find("[aria-live='polite']")
        .should("contain.text", "Selected");
});
```

### Step 5: Run tests

```bash
cd packages/main
yarn test:cypress:single cypress/specs/List.cy.tsx
```

## Estimation

- **Complexity**: Medium
- **Estimated Effort**: 4-8 hours (including design alignment and tests)
- **Risk**: Low - additive feature, no breaking changes
- **Dependencies**: Design team sign-off on announcement text format
