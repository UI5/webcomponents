# Issue #13264: [Feature Request] - ListItem Expose `accessibleRole`

## Issue Summary

- **URL**: https://github.com/UI5/webcomponents/issues/13264
- **Type**: Feature Request (A11Y)
- **Priority**: Medium
- **Labels**: feature request, Medium Prio, TOPIC P
- **Status**: Open (Issues column)

## Problem

The `ListItem` (ui5-li) has a private `accessibleRole` property that is not part of the public API. When a `ui5-list` is configured with `accessible-role="Menu"`, the rendered `<ul>` gets `role="menu"`, but child `<li>` elements remain `role="listitem"` instead of the required `role="menuitem"`. This results in a **WCAG violation** as `role="menu"` mandates children with `role="menuitem"`.

The same mismatch applies to:

| `ui5-list` accessible-role | Expected child role | Actual child role |
|---|---|---|
| `Menu` | `menuitem` | `listitem` |
| `Tree` | `treeitem` | `listitem` |
| `ListBox` | `option` | `listitem` |

## Codebase Analysis

### ListItem's Private `accessibleRole`

**File**: `packages/main/src/ListItem.ts`, lines 181-189:
```typescript
/**
 * Used to define the role of the list item.
 * @private
 * @default "ListItem"
 * @since 1.3.0
 */
@property()
accessibleRole: `${ListItemAccessibleRole}` = "ListItem";
```

### `_forcedAccessibleRole` Property

There's also a private `_forcedAccessibleRole` property (line 191-192):
```typescript
@property()
_forcedAccessibleRole?: string;
```

### Effective Role Computation

**File**: `packages/main/src/ListItem.ts`, lines 438-440:
```typescript
get listItemAccessibleRole() {
    return (this._forcedAccessibleRole || this.accessibleRole.toLowerCase()) as AriaRole | undefined;
}
```

This is used in `_accInfo` (line 486) and applied via `ListItemTemplate.tsx`:
```tsx
role={this._accInfo.role}
```

### ListItemAccessibleRole Enum

**File**: `packages/main/src/types/ListItemAccessibleRole.ts`:
```typescript
enum ListItemAccessibleRole {
    Group = "Group",       // @private
    ListItem = "ListItem", // @public (default)
    MenuItem = "MenuItem", // @public
    TreeItem = "TreeItem", // @public
    Option = "Option",     // @public
    None = "None"          // @public
}
```

The enum already has all the right values - it just needs the property made public.

### List Does NOT Propagate Roles to Children

**File**: `packages/main/src/List.ts`, `prepareListItems()` (lines 844-858):
```typescript
prepareListItems() {
    const slottedItems = this.getItemsForProcessing();
    slottedItems.forEach((item, key) => {
        if (item.hasConfigurableMode) {
            (item as ListItem)._selectionMode = this.selectionMode;
        }
        item.hasBorder = showBottomBorder;
        (item as ListItem).mediaRange = this.mediaRange;
    });
}
```

The List sets `_selectionMode`, `hasBorder`, and `mediaRange` on children, but does **NOT** set any role. The `accessibleRole` of the List only affects its own `<ul>` element.

### ListAccessibleRole Enum

**File**: `packages/main/src/types/ListAccessibleRole.ts`:
```typescript
enum ListAccessibleRole {
    List = "List",
    Menu = "Menu",
    Tree = "Tree",
    ListBox = "ListBox"
}
```

### Key Files

| File | Path |
|------|------|
| ListItem | `packages/main/src/ListItem.ts` |
| ListItem template | `packages/main/src/ListItemTemplate.tsx` |
| List component | `packages/main/src/List.ts` |
| ListItemAccessibleRole enum | `packages/main/src/types/ListItemAccessibleRole.ts` |
| ListAccessibleRole enum | `packages/main/src/types/ListAccessibleRole.ts` |
| ListItemStandard | `packages/main/src/ListItemStandard.ts` |
| ListItemCustom | `packages/main/src/ListItemCustom.ts` |

## Visual Spec Reference

- **List (Horizon)**: https://wiki.one.int.sap/wiki/spaces/visualcore/pages/2822644228/List+Horizon
- The visual spec covers visual layout and does not address role assignment. This is a purely accessibility concern.

## Spec Update Needed

**No visual spec update needed.** However, the **component API documentation** needs updates to document:
1. The now-public `accessibleRole` property on ListItem
2. The automatic role propagation behavior (if Option B is implemented)
3. Guidance on when to use which approach

## Step-by-Step Implementation Guide

The issue proposes three options. **Recommended: Option C (combination of A and B)**.

### Step 1: Make `accessibleRole` public on ListItem

**File**: `packages/main/src/ListItem.ts`

Change the JSDoc from `@private` to `@public`:

```typescript
/**
 * Defines the accessible ARIA role of the list item.
 *
 * When using `ui5-list` with `accessible-role="Menu"`, set this to `"MenuItem"`.
 * When using `ui5-list` with `accessible-role="ListBox"`, set this to `"Option"`.
 * When using `ui5-list` with `accessible-role="Tree"`, set this to `"TreeItem"`.
 *
 * **Note:** When set explicitly on a list item, it takes precedence over 
 * any role automatically inherited from the parent list.
 *
 * @default "ListItem"
 * @public
 * @since 2.x.0
 */
@property()
accessibleRole: `${ListItemAccessibleRole}` = "ListItem";
```

### Step 2: Add automatic role propagation in `List.prepareListItems()`

**File**: `packages/main/src/List.ts`

Add a role mapping and propagation logic:

```typescript
// Add at module level
const listToItemRoleMap: Record<string, string> = {
    "Menu": "menuitem",
    "Tree": "treeitem",
    "ListBox": "option",
    "List": "listitem",
};

// In prepareListItems():
prepareListItems() {
    const slottedItems = this.getItemsForProcessing();
    const defaultChildRole = listToItemRoleMap[this.accessibleRole] || undefined;
    
    slottedItems.forEach((item, key) => {
        const isLastChild = key === slottedItems.length - 1;
        const showBottomBorder = ...;
        
        if (item.hasConfigurableMode) {
            (item as ListItem)._selectionMode = this.selectionMode;
        }
        item.hasBorder = showBottomBorder;
        (item as ListItem).mediaRange = this.mediaRange;
        
        // Auto-propagate role from list, but only if item hasn't been explicitly set
        if (defaultChildRole && item instanceof ListItem) {
            // Use _forcedAccessibleRole since it takes precedence 
            // and won't overwrite the public property
            if (!item._explicitRole) {
                item._forcedAccessibleRole = defaultChildRole;
            }
        }
    });
}
```

### Step 3: Track explicit role setting

To distinguish between "default" and "explicitly set by consumer", add tracking:

```typescript
// In ListItem.ts
@property({ type: Boolean })
private _explicitRole: boolean = false;

// Override the accessibleRole setter to track explicit setting
onBeforeRendering() {
    // If accessibleRole was changed from default, mark it as explicit
    if (this.accessibleRole !== "ListItem") {
        this._explicitRole = true;
    }
}
```

**Alternative simpler approach**: Instead of tracking explicit setting, just let `_forcedAccessibleRole` be overridden when the public `accessibleRole` is not the default:

```typescript
get listItemAccessibleRole() {
    // If public property was explicitly changed from default, use it
    if (this.accessibleRole !== "ListItem") {
        return this.accessibleRole.toLowerCase() as AriaRole;
    }
    // Otherwise, use forced role (from parent list) or default
    return (this._forcedAccessibleRole || this.accessibleRole.toLowerCase()) as AriaRole | undefined;
}
```

### Step 4: Export the `ListItemAccessibleRole` enum publicly

Ensure the enum is exported from the package's public API entry point:

**File**: `packages/main/src/bundle.esm.ts` (or equivalent exports file)

```typescript
export { default as ListItemAccessibleRole } from "./types/ListItemAccessibleRole.js";
```

### Step 5: Write tests

Add to `packages/main/cypress/specs/List.cy.tsx`:

```typescript
describe("ListItem accessibleRole", () => {
    it("should allow setting accessible role on list items", () => {
        cy.mount(
            <List accessibleRole="Menu">
                <ListItemStandard accessibleRole="MenuItem">Item 1</ListItemStandard>
                <ListItemStandard accessibleRole="MenuItem">Item 2</ListItemStandard>
            </List>
        );
        
        cy.get("[ui5-list]")
            .shadow()
            .find("ul")
            .should("have.attr", "role", "menu");
        
        cy.get("[ui5-li]").first()
            .shadow()
            .find("li")
            .should("have.attr", "role", "menuitem");
    });
    
    it("should auto-propagate child roles based on list accessible-role", () => {
        cy.mount(
            <List accessibleRole="Menu">
                <ListItemStandard>Item 1</ListItemStandard>
                <ListItemStandard>Item 2</ListItemStandard>
            </List>
        );
        
        cy.get("[ui5-li]").first()
            .shadow()
            .find("li")
            .should("have.attr", "role", "menuitem");
    });
    
    it("explicit role on item should take precedence over auto-propagation", () => {
        cy.mount(
            <List accessibleRole="Menu">
                <ListItemStandard accessibleRole="None">Item 1</ListItemStandard>
            </List>
        );
        
        cy.get("[ui5-li]").first()
            .shadow()
            .find("li")
            .should("not.have.attr", "role");
    });
});
```

### Step 6: Run tests

```bash
cd packages/main
yarn test:cypress:single cypress/specs/List.cy.tsx
```

### Step 7: Update exports

Make sure `ListItemAccessibleRole` is properly exported so consumers can import it.

## Estimation

- **Complexity**: Medium-High
- **Estimated Effort**: 8-16 hours
  - Making property public: 1-2 hours
  - Auto-propagation logic: 4-8 hours (precedence logic is subtle)
  - Tests: 2-4 hours
  - API review and documentation: 1-2 hours
- **Risk**: Medium
  - Making private property public could expose existing bugs
  - Auto-propagation needs careful precedence handling
  - Other components that inherit from ListItem may be affected
- **Dependencies**: API design review to confirm approach (Option A, B, or C)
