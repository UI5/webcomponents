# Issue #11968: [SF][A11Y][Toolbar] - Provide Interface to Customize Accessible Name of Overflow Button

## Issue Summary

- **URL**: https://github.com/UI5/webcomponents/issues/11968
- **Type**: Feature Request (A11Y)
- **Priority**: Medium
- **Labels**: feature request, ACC, Medium Prio, SF_ACC, TOPIC P
- **Status**: Open (Issues column)

## Problem

The Toolbar's overflow button always announces "Additional Options" to screen readers. Consumers need the ability to customize this accessible name to provide more context, e.g., "More actions for 'opportunity name'".

## Codebase Analysis

### Current Implementation

**Overflow button rendering** (`packages/main/src/ToolbarTemplate.tsx`, lines 29-42):
```tsx
<Button
    aria-hidden={this.hideOverflowButton}
    icon={overflowIcon}
    design="Transparent"
    onClick={this.toggleOverflow}
    tooltip={this.accInfo.overflowButton.tooltip}
    accessibleName={this.accInfo.overflowButton.accessibleName}
    accessibilityAttributes={this.accInfo.overflowButton.accessibilityAttributes}
/>
```

**Accessible name source** (`packages/main/src/Toolbar.ts`, `accInfo` getter, lines 249-267):
```typescript
get accInfo() {
    return {
        overflowButton: {
            accessibleName: Toolbar.i18nBundle.getText(TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL),
            tooltip: Toolbar.i18nBundle.getText(TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL),
            accessibilityAttributes: {
                expanded: this.popoverOpen,
                hasPopup: "menu" as const,
            },
        },
        ...
    };
}
```

The i18n key `TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL` = `"Additional Options"` (in `packages/main/src/i18n/messagebundle.properties`, line 835).

### Key Files

| File | Path |
|------|------|
| Toolbar component | `packages/main/src/Toolbar.ts` |
| Toolbar template | `packages/main/src/ToolbarTemplate.tsx` |
| i18n bundle | `packages/main/src/i18n/messagebundle.properties` |

## Visual Spec Reference

- **Toolbar (Horizon)**: https://wiki.one.int.sap/wiki/spaces/visualcore/pages/2698915944/Toolbar+Horizon
- The visual spec does not define specific accessibility naming rules for the overflow button. This is a purely accessibility/behavioral concern.

## Spec Update Needed

**No visual spec update needed.** However, the component API documentation will need to be updated to document the new property.

## Step-by-Step Implementation Guide

### Step 1: Add a new public property to `Toolbar.ts`

Add a new property `overflowButtonAccessibleName` to the Toolbar component:

```typescript
/**
 * Defines the accessible name for the overflow button.
 * If not set, the default text "Additional Options" is used.
 *
 * @default undefined
 * @public
 * @since 2.x.0
 */
@property()
overflowButtonAccessibleName?: string;
```

**File**: `packages/main/src/Toolbar.ts`

### Step 2: Update the `accInfo` getter

Modify the `accInfo` getter to use the custom name when provided:

```typescript
get accInfo() {
    const overflowButtonLabel = this.overflowButtonAccessibleName
        || Toolbar.i18nBundle.getText(TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL);
    return {
        overflowButton: {
            accessibleName: overflowButtonLabel,
            tooltip: Toolbar.i18nBundle.getText(TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL), // tooltip stays default
            accessibilityAttributes: {
                expanded: this.popoverOpen,
                hasPopup: "menu" as const,
            },
        },
        popover: {
            accessibleName: Toolbar.i18nBundle.getText(TOOLBAR_POPOVER_AVAILABLE_VALUES),
        },
    };
}
```

**Note**: Keep `tooltip` using the default i18n text since tooltip is visual, while `accessibleName` is for screen readers.

### Step 3: Write tests

Add Cypress test in `packages/main/cypress/specs/Toolbar.cy.tsx`:

```typescript
it("should use custom overflow button accessible name when provided", () => {
    cy.mount(
        <Toolbar overflowButtonAccessibleName="More actions for Opportunity X">
            {/* Add enough items to trigger overflow */}
        </Toolbar>
    );
    
    cy.get("[ui5-toolbar]")
        .shadow()
        .find(".ui5-tb-overflow-btn")
        .should("have.attr", "accessible-name", "More actions for Opportunity X");
});

it("should fall back to default accessible name when not provided", () => {
    cy.mount(
        <Toolbar>
            {/* Add enough items to trigger overflow */}
        </Toolbar>
    );
    
    cy.get("[ui5-toolbar]")
        .shadow()
        .find(".ui5-tb-overflow-btn")
        .should("have.attr", "accessible-name", "Additional Options");
});
```

### Step 4: Run tests

```bash
cd packages/main
yarn test:cypress:single cypress/specs/Toolbar.cy.tsx
```

### Step 5: Update API documentation

The `@property()` JSDoc will auto-generate API docs. Ensure the description is clear about the fallback behavior.

## Estimation

- **Complexity**: Low
- **Estimated Effort**: 2-4 hours (including tests)
- **Risk**: Low - additive change, no breaking changes
