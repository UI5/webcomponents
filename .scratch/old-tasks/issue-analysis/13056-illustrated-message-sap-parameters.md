# Issue #13056: [ui5-illustrated-message] - Remove Declared --sap Parameters

## Issue Summary

- **URL**: https://github.com/UI5/webcomponents/issues/13056
- **Type**: Bug / Enhancement
- **Priority**: Medium
- **Labels**: bug, enhancement, TOPIC P
- **Status**: Open (Issues column)

## Problem

The `IllustratedMessage-parameters.css` file defines 11 CSS variables using the `--sapIllus_` prefix instead of the `--ui5` prefix convention. This causes two issues:

1. **Naming violation**: All parameters in `*-parameters.css` files should use the `--ui5` prefix for proper tooling support and scoping in MFE (Micro Frontend) scenarios.
2. **Missing from theming base**: Some of these `--sapIllus_*` variables are not part of the `@sap-theming/theming-base-content` package, meaning they're effectively "invented" at the component level with a `--sap` prefix that implies they're global theming parameters.

## Codebase Analysis

### Current CSS Variables

**File**: `packages/fiori/src/themes/base/IllustratedMessage-parameters.css`

| Variable | Value | Notes |
|----------|-------|-------|
| `--sapIllus_BrandColorPrimary` | `var(--sapContent_Illustrative_Color1)` | Maps to theming-base variable |
| `--sapIllus_BrandColorSecondary` | `var(--sapContent_Illustrative_Color2)` | Maps to theming-base variable |
| `--sapIllus_StrokeDetailColor` | `var(--sapContent_Illustrative_Color4)` | Maps to theming-base variable |
| `--sapIllus_Layering1` | `var(--sapContent_Illustrative_Color5)` | Maps to theming-base variable |
| `--sapIllus_Layering2` | `var(--sapContent_Illustrative_Color6)` | Maps to theming-base variable |
| `--sapIllus_BackgroundColor` | `var(--sapContent_Illustrative_Color7)` | Maps to theming-base variable |
| `--sapIllus_ObjectFillColor` | `var(--sapContent_Illustrative_Color8)` | Maps to theming-base variable |
| `--sapIllus_AccentColor` | `var(--sapContent_Illustrative_Color3)` | Maps to theming-base variable |
| `--sapIllus_NoColor` | `none` | Static value |
| `--sapIllus_PatternShadow` | `url(#sapIllus_PatternShadow)` | SVG pattern reference |
| `--sapIllus_PatternHighlight` | `url(#sapIllus_PatternHighlight)` | SVG pattern reference |

### Where These Variables Are Consumed

1. **IllustratedMessage.css** (`packages/fiori/src/themes/IllustratedMessage.css`):
   - Utility CSS classes like `.sapIllus_BrandColorPrimary { fill: var(--sapIllus_BrandColorPrimary); }`
   - These classes are applied to SVG illustration elements

2. **IllustratedMessageTemplate.tsx**: 
   - SVG `<defs>` patterns with IDs `sapIllus_PatternShadow` and `sapIllus_PatternHighlight`

3. **All illustration SVG files**: The illustrations use CSS classes like `sapIllus_BrandColorPrimary` etc. to apply fill colors. Renaming the CSS classes would require updating all SVG illustration files.

### Scope of Impact

The rename affects:
- `IllustratedMessage-parameters.css` - the parameter definitions
- `IllustratedMessage.css` - the utility class definitions that reference these variables
- `IllustratedMessageTemplate.tsx` - SVG pattern `<defs>` element IDs
- Potentially all illustration SVG assets that use CSS class names like `sapIllus_*`

### Key Files

| File | Path |
|------|------|
| Parameters CSS | `packages/fiori/src/themes/base/IllustratedMessage-parameters.css` |
| Main CSS | `packages/fiori/src/themes/IllustratedMessage.css` |
| Template | `packages/fiori/src/IllustratedMessageTemplate.tsx` |
| Component | `packages/fiori/src/IllustratedMessage.ts` |

## Visual Spec Reference

- **Illustrated Message (Horizon)**: https://wiki.one.int.sap/wiki/spaces/visualcore/pages/3139378128/Illustrated+Message+Horizon
- The visual spec defines the color usage for illustrations via theming parameters. The fix should maintain visual parity.

## Spec Update Needed

**Visual spec update may be needed** if the visual spec references the `--sapIllus_*` naming convention. The designers should be asked to either:
1. Add these `--sapIllus_*` parameters to `@sap-theming/theming-base-content` (making them official global variables), OR
2. Confirm that the component should use `--ui5` prefix variables that internally resolve to the `--sapContent_Illustrative_Color*` variables.

**Design team coordination required** - this is explicitly stated in the issue.

## Step-by-Step Implementation Guide

### Step 1: Coordinate with design team

Before making any code changes, coordinate with the theming/design team to decide:

**Option A**: Add `--sapIllus_*` parameters to `@sap-theming/theming-base-content`
- This would make the current naming legitimate
- Component code stays as-is
- Requires external package update

**Option B**: Rename to `--ui5` prefix (recommended by issue author)
- Rename all `--sapIllus_*` to `--_ui5_illus_*` (private component parameters)
- Update all CSS references
- Keep SVG class names unchanged (they are internal to the shadow DOM)

### Step 2: (If Option B) Rename CSS parameters

Update `packages/fiori/src/themes/base/IllustratedMessage-parameters.css`:

```css
:root {
    --_ui5_illus_BrandColorPrimary: var(--sapContent_Illustrative_Color1);
    --_ui5_illus_BrandColorSecondary: var(--sapContent_Illustrative_Color2);
    --_ui5_illus_AccentColor: var(--sapContent_Illustrative_Color3);
    --_ui5_illus_StrokeDetailColor: var(--sapContent_Illustrative_Color4);
    --_ui5_illus_Layering1: var(--sapContent_Illustrative_Color5);
    --_ui5_illus_Layering2: var(--sapContent_Illustrative_Color6);
    --_ui5_illus_BackgroundColor: var(--sapContent_Illustrative_Color7);
    --_ui5_illus_ObjectFillColor: var(--sapContent_Illustrative_Color8);
    --_ui5_illus_NoColor: none;
    --_ui5_illus_PatternShadow: url(#sapIllus_PatternShadow);
    --_ui5_illus_PatternHighlight: url(#sapIllus_PatternHighlight);
}
```

Note: The SVG pattern `url(#sapIllus_PatternShadow)` references an element ID inside the template, which is a different concern. Those IDs do NOT need to change since they're element IDs, not CSS variable names.

### Step 3: Update IllustratedMessage.css

Update all utility class definitions to reference the new variable names:

```css
.sapIllus_BrandColorPrimary {
    fill: var(--_ui5_illus_BrandColorPrimary);
}
/* ... repeat for all classes */
```

Note: The CSS class names (`.sapIllus_*`) can remain unchanged since they are internal to the shadow DOM and don't conflict with the naming convention (the convention is about CSS custom properties, not class names).

### Step 4: Check for theme-specific overrides

Search for any theme-specific override files that reference `--sapIllus_*`:

```bash
grep -r "sapIllus_" packages/fiori/src/themes/
```

Update any found references.

### Step 5: Verify SVG illustrations

Check that illustration SVGs use CSS class names (not CSS variable names directly). If they reference `var(--sapIllus_*)` directly, those need updating too.

```bash
grep -r "sapIllus_" packages/fiori/src/illustrations/
```

### Step 6: Write/update tests

Ensure existing visual tests still pass. The component should look identical after the rename.

```bash
cd packages/fiori
yarn test:cypress:single cypress/specs/IllustratedMessage.cy.tsx
```

### Step 7: Run full build to verify scoping

```bash
yarn build
```

Verify that the `--_ui5_` prefixed variables work correctly with the monorepo's scoping tooling.

## Estimation

- **Complexity**: Medium-High (due to cross-cutting impact on SVG files)
- **Estimated Effort**: 8-16 hours (including design coordination and thorough testing)
- **Risk**: Medium - renaming CSS variables could break illustration rendering if any references are missed; MFE scoping behavior needs verification
- **Dependencies**: Design/theming team decision on approach (Option A vs Option B)
