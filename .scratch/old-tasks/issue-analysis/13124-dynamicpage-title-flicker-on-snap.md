# Issue #13124: DynamicPageTitle Flickers on Scroll When Heading Wraps (Snapped Transition)

## Issue Summary

- **URL**: https://github.com/UI5/webcomponents/issues/13124
- **Type**: Bug
- **Priority**: Medium
- **Labels**: bug, Medium Prio, SAP Signavio, TOPIC P
- **Status**: Open (Issues column)

## Problem

When a DynamicPage has a long heading that wraps to 2+ lines, scrolling through the snap/expand transition point causes the title to visually flicker/jump. This happens because:

1. The heading switches from expanded (large font) to snapped (smaller font) 
2. The header height changes when the heading wraps differently at the new font size
3. This height change triggers a scroll position recalculation, which can cause a feedback loop

## Codebase Analysis

### Snap/Expand Transition Flow

The snap mechanism is **entirely JavaScript-driven** with no CSS transitions for smooth height changes.

**Scroll-based snapping** (`packages/fiori/src/DynamicPage.ts`, lines 308-359):
```typescript
snapTitleByScroll() {
    const scrollTop = this.scrollContainer!.scrollTop;
    const headerHeight = this.dynamicPageHeader.getBoundingClientRect().height;

    const shouldSnap = !this._headerSnapped && scrollTop > headerHeight + SCROLL_THRESHOLD; // 10px
    const shouldExpand = this._headerSnapped && (scrollTop < headerHeight - SCROLL_THRESHOLD
        || (!scrollTop && !headerHeight));

    if (shouldSnap) {
        this.showHeaderInStickArea = false;
        this._headerSnapped = true;
        requestAnimationFrame(() => {
            if (this.scrollContainer!.scrollTop === 0) {
                this.scrollContainer!.scrollTop = SCROLL_THRESHOLD;
            }
        });
    } else if (shouldExpand) {
        this._headerSnapped = false;
    }
}
```

**Debounce rate**: Only 5ms (`SCROLL_DEBOUNCE_RATE`), which may be too fast.

### Heading Font Size Transition

When the header snaps, the heading switches slots:

**File**: `packages/fiori/src/DynamicPageTitle.ts`, lines 248-253:
```typescript
get headingSlotName() {
    if (!this.snapped) return "heading";
    return "snappedHeading";
}
```

**CSS font size change** (`packages/fiori/src/themes/DynamicPageTitle.css`, lines 62-66):
```css
::slotted([ui5-title][size="H5"][slot="snappedHeading"]),
:host([snapped]) ::slotted([ui5-title][size="H5"][slot="heading"]) {
    font-size: var(--sapObjectHeader_Title_SnappedFontSize);
    text-overflow: ellipsis;
}
```

From the visual spec, when the heading snaps:
- **Expanded**: `font-size: --sapObjectHeader_Title_FontSize` (larger)
- **Snapped**: `font-size: --sapObjectHeader_Title_SnappedFontSize` (smaller) + `text-overflow: ellipsis`

### Root Cause Analysis

The flicker happens due to this sequence:
1. User scrolls down past the snap threshold
2. `_headerSnapped = true` is set, triggering a re-render
3. The heading font size shrinks (from `--sapObjectHeader_Title_FontSize` to `--sapObjectHeader_Title_SnappedFontSize`)
4. The heading that previously wrapped to 2+ lines may now fit on 1 line (smaller font + ellipsis)
5. The sticky header height changes (shrinks)
6. The scroll position shifts due to the height change
7. The new scroll position may fall below the expand threshold, triggering an unsnap
8. This creates a snap/unsnap oscillation (flicker)

The `SCROLL_THRESHOLD` of 10px is insufficient to prevent this when the heading height difference between wrapped/unwrapped is significant (can be 30-60px+ for multi-line headings).

### Key Files

| File | Path |
|------|------|
| DynamicPage | `packages/fiori/src/DynamicPage.ts` |
| DynamicPage template | `packages/fiori/src/DynamicPageTemplate.tsx` |
| DynamicPageTitle | `packages/fiori/src/DynamicPageTitle.ts` |
| DynamicPageTitle template | `packages/fiori/src/DynamicPageTitleTemplate.tsx` |
| DynamicPageTitle CSS | `packages/fiori/src/themes/DynamicPageTitle.css` |

## Visual Spec Reference

- **DynamicPage (Horizon)**: https://wiki.one.int.sap/wiki/spaces/visualcore/pages/2697896790/DynamicPage+Horizon
- The spec defines:
  - Title Area min-height: 3rem; word-wrap: break-word
  - When Collapsed: font-size: `--sapObjectHeader_Title_SnappedFontSize`; text-overflow: ellipsis
  - When Collapsed (Phone): height: 2rem; line-height: 2rem
- The spec states the title should have `text-overflow: ellipsis` when collapsed, which implies it should be truncated to a single line
- The spec does NOT address the transition smoothness

## Spec Update Needed

**No visual spec update needed.** The spec already defines the correct end states. The bug is in the transition implementation, not the spec.

## Step-by-Step Implementation Guide

### Approach: Prevent Oscillation During Snap/Unsnap

### Step 1: Increase the scroll threshold hysteresis

The current `SCROLL_THRESHOLD` (10px) is too small. When a multi-line heading snaps to single-line, the height difference can be much larger than 10px.

**File**: `packages/fiori/src/DynamicPage.ts`

```typescript
// Before
const SCROLL_THRESHOLD = 10;

// After - increase threshold or make it dynamic
```

However, a static increase may be too aggressive for single-line headings. A better approach:

### Step 2: Add a snap lock to prevent re-entry

Add a flag that prevents unsnapping immediately after a snap (and vice versa):

```typescript
private _snapLock: boolean = false;
private _snapLockTimeout?: ReturnType<typeof setTimeout>;

snapTitleByScroll() {
    if (this._snapLock) return;
    
    // ... existing logic ...
    
    if (shouldSnap) {
        this._setSnapLock();
        this.showHeaderInStickArea = false;
        this._headerSnapped = true;
        // ...
    } else if (shouldExpand) {
        this._setSnapLock();
        this._headerSnapped = false;
    }
}

_setSnapLock() {
    this._snapLock = true;
    clearTimeout(this._snapLockTimeout);
    this._snapLockTimeout = setTimeout(() => {
        this._snapLock = false;
    }, 200); // Wait for layout to settle
}
```

### Step 3: Account for heading height change in scroll adjustment

After snapping, adjust the scroll position to account for the height difference:

```typescript
if (shouldSnap) {
    const titleHeightBefore = this.dynamicPageTitle.getBoundingClientRect().height;
    this.showHeaderInStickArea = false;
    this._headerSnapped = true;
    
    requestAnimationFrame(() => {
        const titleHeightAfter = this.dynamicPageTitle.getBoundingClientRect().height;
        const heightDiff = titleHeightBefore - titleHeightAfter;
        
        if (heightDiff > 0 && this.scrollContainer) {
            // Compensate scroll position for the height change
            this.scrollContainer.scrollTop = Math.max(
                SCROLL_THRESHOLD,
                this.scrollContainer.scrollTop - heightDiff
            );
        }
    });
}
```

### Step 4: Increase debounce rate

The 5ms debounce is too aggressive and allows rapid re-evaluation:

```typescript
// Before
const SCROLL_DEBOUNCE_RATE = 5;

// After
const SCROLL_DEBOUNCE_RATE = 50; // Allow layout to settle
```

**Caution**: Increasing the debounce too much may make the snap feel laggy. Test with various values (20-100ms).

### Step 5: Write tests

Add to `packages/fiori/cypress/specs/DynamicPage.cy.tsx`:

```typescript
it("should not flicker when heading wraps and snaps", () => {
    cy.mount(
        <DynamicPage style={{ height: "500px" }}>
            <DynamicPageTitle slot="titleArea">
                <Title slot="heading">
                    This is a very long heading that will wrap to multiple lines
                    to test the snap transition behavior with wrapping text content
                </Title>
            </DynamicPageTitle>
            <DynamicPageHeader slot="headerArea">
                <div>Header Content</div>
            </DynamicPageHeader>
            <div>
                {/* Generate enough content to scroll */}
                {Array.from({ length: 50 }, (_, i) => <p key={i}>Content line {i}</p>)}
            </div>
        </DynamicPage>
    );
    
    // Scroll to trigger snap
    cy.get("[ui5-dynamic-page]")
        .shadow()
        .find(".ui5-dynamic-page-scroll-container")
        .scrollTo(0, 200);
    
    // Wait for snap to settle
    cy.wait(300);
    
    // Verify the title is snapped and stable
    cy.get("[ui5-dynamic-page-title]")
        .should("have.attr", "snapped");
    
    // Verify no rapid state changes (check that snapped state is stable)
    cy.get("[ui5-dynamic-page-title]")
        .should("have.attr", "snapped");
});
```

### Step 6: Run tests

```bash
cd packages/fiori
yarn test:cypress:single cypress/specs/DynamicPage.cy.tsx
```

## Estimation

- **Complexity**: High
- **Estimated Effort**: 8-16 hours (debugging scroll behavior is notoriously tricky)
- **Risk**: High - scroll behavior changes can have side effects; needs thorough testing across different heading lengths, screen sizes, and browser engines
- **Testing**: Manual testing recommended across Chrome, Firefox, Safari with various heading lengths (1 line, 2 lines, 3+ lines)
