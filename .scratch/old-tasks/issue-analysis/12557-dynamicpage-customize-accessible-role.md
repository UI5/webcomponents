# Issue #12557: [DynamicPage] - Customize Accessibility Role

## Issue Summary

- **URL**: https://github.com/UI5/webcomponents/issues/12557
- **Type**: Enhancement (A11Y)
- **Priority**: Medium
- **Labels**: enhancement, Medium Prio, SF_ACC, TOPIC P
- **Status**: Open (Issues column)

## Problem

When using ShellBar together with DynamicPage, there are multiple top-level `<header>` semantic elements on the page, each of which implicitly has `role="banner"`. AXE (accessibility testing tool) flags this as a violation: only one `banner` landmark should exist per page.

The requestor wants the ability to customize the DynamicPage's accessibility role, similar to SAPUI5's `sap.f.DynamicPageAccessibleLandmarkInfo`.

## Codebase Analysis

### Current Role Implementation

**DynamicPage outer wrapper** (`packages/fiori/src/DynamicPageTemplate.tsx`, lines 10-15):
```tsx
<header
    class="ui5-dynamic-page-title-header-wrapper"
    id={`${this._id}-header`}
    aria-label={this.headerAriaLabel}
    onui5-toggle-title={this.onToggleTitle}
>
```

The `<header>` HTML element is used, which implicitly has `role="banner"` when it is a direct child of `<body>`. This is the root cause: when both ShellBar (which also renders a `<header>`) and DynamicPage are present, AXE detects two `banner` landmarks.

**DynamicPageHeader root** (`packages/fiori/src/DynamicPageHeaderTemplate.tsx`, line 5):
```tsx
<div class="ui5-dynamic-page-header-root" role="region" aria-label={this._headerRegionAriaLabel}>
```

**DynamicPageTitle focus area** (`packages/fiori/src/DynamicPageTitleTemplate.tsx`):
```tsx
<span ... role={this._role}> // "button" when interactive, undefined otherwise
```

### What DynamicPage Does NOT Have

- No `accessibilityAttributes` property on DynamicPage itself
- No `accessibleRole` property
- No way to change the semantic `<header>` element or its implicit role
- DynamicPageHeaderActions has `accessibilityAttributes` but only for `controls`

### SAPUI5 Reference

SAPUI5 has `sap.f.DynamicPageAccessibleLandmarkInfo` which allows setting:
- `rootRole` / `rootLabel`
- `headerRole` / `headerLabel`  
- `contentRole` / `contentLabel`
- `footerRole` / `footerLabel`

### Key Files

| File | Path |
|------|------|
| DynamicPage component | `packages/fiori/src/DynamicPage.ts` |
| DynamicPage template | `packages/fiori/src/DynamicPageTemplate.tsx` |
| DynamicPageTitle | `packages/fiori/src/DynamicPageTitle.ts` |
| DynamicPageHeader | `packages/fiori/src/DynamicPageHeader.ts` |

## Visual Spec Reference

- **DynamicPage (Horizon)**: https://wiki.one.int.sap/wiki/spaces/visualcore/pages/2697896790/DynamicPage+Horizon
- The spec defines the visual structure (Title Area, Header Area, Content Area, Footer Area) with detailed CSS parameters.
- The spec does not specify any ARIA landmark roles. This is a behavioral/accessibility concern.

## Spec Update Needed

**No visual spec update needed.** However, an **accessibility spec update** may be needed to document the recommended role configuration when DynamicPage is used alongside ShellBar.

## Step-by-Step Implementation Guide

### Step 1: Define the `DynamicPageAccessibilityAttributes` type

Create or extend the accessibility attributes type in `packages/fiori/src/DynamicPage.ts`:

```typescript
type DynamicPageAccessibilityAttributes = {
    headerArea?: {
        role?: AriaRole;
        label?: string;
    };
};
```

Alternatively, follow the simpler approach of adding an `accessibleRole` property:

```typescript
/**
 * Defines the accessible role of the component's header wrapper.
 * 
 * When DynamicPage is used alongside ShellBar, set this to "None"
 * to avoid multiple banner landmarks on the page.
 *
 * @default undefined
 * @public
 * @since 2.x.0
 */
@property()
accessibleRole?: string;
```

### Step 2: Change the template from `<header>` to `<div>` with dynamic role

Modify `DynamicPageTemplate.tsx`:

```tsx
<div
    class="ui5-dynamic-page-title-header-wrapper"
    id={`${this._id}-header`}
    role={this._headerRole}
    aria-label={this.headerAriaLabel}
    onui5-toggle-title={this.onToggleTitle}
>
```

### Step 3: Add the role computation getter in `DynamicPage.ts`

```typescript
get _headerRole(): string | undefined {
    if (this.accessibleRole === "None") {
        return undefined; // no landmark role
    }
    return this.accessibleRole?.toLowerCase() || "banner";
}
```

**Important Design Decision**: Changing from `<header>` (semantic) to `<div>` (neutral) with an explicit `role` attribute gives full control. The default should remain `"banner"` to maintain backward compatibility.

### Step 4: Write tests

Add to `packages/fiori/cypress/specs/DynamicPage.cy.tsx`:

```typescript
it("should allow customizing the header wrapper role", () => {
    cy.mount(
        <DynamicPage accessibleRole="None">
            <DynamicPageTitle slot="titleArea">
                <Title slot="heading">Title</Title>
            </DynamicPageTitle>
        </DynamicPage>
    );
    
    cy.get("[ui5-dynamic-page]")
        .shadow()
        .find(".ui5-dynamic-page-title-header-wrapper")
        .should("not.have.attr", "role");
});

it("should default to banner role", () => {
    cy.mount(
        <DynamicPage>
            <DynamicPageTitle slot="titleArea">
                <Title slot="heading">Title</Title>
            </DynamicPageTitle>
        </DynamicPage>
    );
    
    cy.get("[ui5-dynamic-page]")
        .shadow()
        .find(".ui5-dynamic-page-title-header-wrapper")
        .should("have.attr", "role", "banner");
});
```

### Step 5: Run tests

```bash
cd packages/fiori
yarn test:cypress:single cypress/specs/DynamicPage.cy.tsx
```

### Alternative Approach: More Comprehensive Landmark Info

If a more comprehensive solution is needed (matching SAPUI5's `DynamicPageAccessibleLandmarkInfo`), consider an `accessibilityAttributes` object property:

```typescript
type DynamicPageAccessibilityAttributes = {
    headerArea?: { role?: AriaLandmarkRole; label?: string; };
    contentArea?: { role?: AriaLandmarkRole; label?: string; };
    footerArea?: { role?: AriaLandmarkRole; label?: string; };
};

@property({ type: Object })
accessibilityAttributes: DynamicPageAccessibilityAttributes = {};
```

This is more flexible but also more complex. Start with the simple `accessibleRole` property for the header and expand later if needed.

## Estimation

- **Complexity**: Medium
- **Estimated Effort**: 4-8 hours (including tests and API design review)
- **Risk**: Medium - changing semantic HTML element; requires careful backward compatibility analysis
- **Dependencies**: API design review for the approach (simple property vs. full landmark info)
