# Issue #13070: [SF][ToolbarButton][A11y] - Missing accessibleRole Prop for ToolbarButton

## Issue Summary

- **URL**: https://github.com/UI5/webcomponents/issues/13070
- **Type**: Feature Request (A11Y)
- **Priority**: Medium
- **Labels**: feature request, Medium Prio, TOPIC P
- **Status**: Open (Issues column)

## Problem

The `ToolbarButton` component does not expose an `accessibleRole` property. The underlying `Button` component has an `accessibleRole` property (with values from `ButtonAccessibleRole` enum), but `ToolbarButton` neither exposes nor forwards this property. When a ToolbarButton is used as a navigation link (navigating to another page), it should be able to set `accessibleRole="Link"` to correctly communicate its purpose to screen readers.

## Codebase Analysis

### ToolbarButton Properties (Current)

**File**: `packages/main/src/ToolbarButton.ts`

The ToolbarButton has these public properties:
- `disabled`, `design`, `icon`, `endIcon`, `tooltip`, `accessibleName`, `accessibleNameRef`, `accessibilityAttributes`, `text`, `showOverflowText`, `width`

**Missing**: `accessibleRole` property.

### Button's accessibleRole Property

**File**: `packages/main/src/Button.ts` (line 291):
```typescript
@property()
accessibleRole: `${ButtonAccessibleRole}` = "Button";
```

**ButtonAccessibleRole enum** (`packages/main/src/types/ButtonAccessibleRole.ts`):
```typescript
enum ButtonAccessibleRole {
    Button = "Button",
    Link = "Link",
    MenuItem = "MenuItem",
    None = "None",
}
```

### ToolbarButton Template

**File**: `packages/main/src/ToolbarButtonTemplate.tsx`:
```tsx
<Button
    class="ui5-tb-button"
    data-ui5-external-action-item-id={this._id}
    disabled={this.disabled}
    design={this.design}
    icon={this.icon}
    endIcon={this.endIcon}
    tooltip={this.tooltip}
    accessibleName={this.accessibleName}
    accessibleNameRef={this.accessibleNameRef}
    accessibilityAttributes={this.accessibilityAttributes}
>
    {this.effectiveText}
</Button>
```

Note: `accessibleRole` is NOT passed to the inner `<Button>`.

### Key Files

| File | Path |
|------|------|
| ToolbarButton | `packages/main/src/ToolbarButton.ts` |
| ToolbarButton template | `packages/main/src/ToolbarButtonTemplate.tsx` |
| Button component | `packages/main/src/Button.ts` |
| ButtonAccessibleRole enum | `packages/main/src/types/ButtonAccessibleRole.ts` |

## Visual Spec Reference

- **Toolbar (Horizon)**: https://wiki.one.int.sap/wiki/spaces/visualcore/pages/2698915944/Toolbar+Horizon
- **Button (Horizon)**: https://wiki.one.int.sap/wiki/spaces/visualcore/pages/2698912599/Button+Horizon
- The visual specs do not cover accessibility role configuration. This is purely a behavioral/A11Y concern.

## Spec Update Needed

**No visual spec update needed.** The API documentation will auto-generate from the new property's JSDoc.

## Step-by-Step Implementation Guide

### Step 1: Add `accessibleRole` property to `ToolbarButton.ts`

Import the ButtonAccessibleRole type and add the property:

```typescript
import type ButtonAccessibleRole from "./types/ButtonAccessibleRole.js";

/**
 * Describes the accessible role of the button.
 *
 * Available options are:
 * - `Button` - the button is rendered with role="button" (default)
 * - `Link` - the button is rendered with role="link"
 * - `MenuItem` - the button is rendered with role="menuitem"
 * - `None` - the button has no role
 *
 * @default "Button"
 * @public
 * @since 2.x.0
 */
@property()
accessibleRole: `${ButtonAccessibleRole}` = "Button";
```

**File**: `packages/main/src/ToolbarButton.ts`

### Step 2: Forward the property in the template

Update `ToolbarButtonTemplate.tsx` to pass `accessibleRole` to the inner Button:

```tsx
<Button
    class="ui5-tb-button"
    data-ui5-external-action-item-id={this._id}
    disabled={this.disabled}
    design={this.design}
    icon={this.icon}
    endIcon={this.endIcon}
    tooltip={this.tooltip}
    accessibleName={this.accessibleName}
    accessibleNameRef={this.accessibleNameRef}
    accessibilityAttributes={this.accessibilityAttributes}
    accessibleRole={this.accessibleRole}
>
    {this.effectiveText}
</Button>
```

**File**: `packages/main/src/ToolbarButtonTemplate.tsx`

### Step 3: Handle overflow popover rendering

When toolbar items overflow into the popover, they still render as `<Button>` components via the same template. The `accessibleRole` will be forwarded correctly in both cases since the same template is used.

Verify that the overflow rendering doesn't strip any properties.

### Step 4: Write tests

Add to `packages/main/cypress/specs/Toolbar.cy.tsx`:

```typescript
it("should forward accessibleRole to the inner Button", () => {
    cy.mount(
        <Toolbar>
            <ToolbarButton text="Go to Page" accessibleRole="Link" />
        </Toolbar>
    );
    
    cy.get("[ui5-toolbar-button]")
        .shadow()
        .find("[ui5-button]")
        .shadow()
        .find("button")
        .should("have.attr", "role", "link");
});

it("should default to button role", () => {
    cy.mount(
        <Toolbar>
            <ToolbarButton text="Action" />
        </Toolbar>
    );
    
    cy.get("[ui5-toolbar-button]")
        .shadow()
        .find("[ui5-button]")
        .shadow()
        .find("button")
        .should("have.attr", "role", "button");
});
```

### Step 5: Run tests

```bash
cd packages/main
yarn test:cypress:single cypress/specs/Toolbar.cy.tsx
```

## Estimation

- **Complexity**: Low
- **Estimated Effort**: 2-4 hours (including tests)
- **Risk**: Low - additive change, mirrors existing Button API, no breaking changes
