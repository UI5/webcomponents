commit bf491e75b16f6e51c95f69db63a8a15951e0fdcb
Author: Dobrin Dimchev <dobrin.dimchev@sap.com>
Date:   Tue Sep 15 23:33:00 2026 +0300

    feat(ui5-toolbar): add overflow-group property for atomic group overflow (#13949)
    
    * feat(ui5-toolbar): add overflow-group for atomic group overflow
    
    Introduce a free-form 'overflowGroup' string property on ToolbarItemBase.
    Items sharing the same non-empty group overflow as one atomic unit:
    either all visible in the bar, or all in the overflow popover, never
    split. The visible bar always preserves slot order; group members
    become adjacent only inside the popover.
    
    - ToolbarItemBase: new @property() 'overflowGroup' (default '').
    - Toolbar.distributeItems: bucket movable items into 'distribution
      units' before iterating right-to-left. Each unit is either a single
      ungrouped item or a group of items sharing a non-empty overflowGroup,
      ordered by the rightmost member's slot index. Atomic group push is
      allowed to over-shoot the recovered-width target (per ADR-0001).
    - Toolbar.onInvalidation: re-distribute when the per-child grouping
      signature changes, not only when itemsWidth changes.
    - Six new Cypress tests in Toolbar.cy.tsx covering contiguous overflow,
      non-contiguous overflow, resize round-trip, reverseOverflow popover
      order, runtime overflowGroup change, and slot-order preservation.
    - New dev sample at packages/main/test/pages/ToolbarOverflowGroup.html
      demonstrating all four scenarios.
    
    Default behavior for overflowGroup='' is unchanged; minContentWidth
    calculation is unchanged.
    
    Refs: docs/adr/0001-toolbar-overflow-group.md
    
    * feat(ui5-toolbar): warn on invalid overflow-group configurations
    
    Surface developer mistakes in `overflowGroup` configuration with
    one-shot `console.warn` messages and keep the toolbar's overflow
    algorithm tolerant of the violations:
    
    - A grouped item with `overflowPriority` set to `AlwaysOverflow` or
      `NeverOverflow` violates ADR-0001. The new
      `ToolbarItemBase.effectiveOverflowPriority` getter emits a one-shot
      warning naming the element and downgrades the priority to `Default`
      for the layout pass; the group continues to overflow atomically.
    - A `ui5-toolbar-spacer` with a non-empty `overflowGroup` cannot
      participate in grouping. The new `effectiveOverflowGroup` getter
      emits a one-shot warning and returns `""` so the spacer is not
      yoked to the group; its existing overflow behavior is unchanged.
    
    `Toolbar` now consults these effective getters in `alwaysOverflowItems`,
    `movableItems`, the `minContentWidth` calculation, and
    `buildDistributionUnits`. Warnings are suppressed across re-renders via
    per-instance flags, consistent with `ToolbarItem.checkForWrapper`.
    
    JSDoc on `overflowGroup` now lists both restrictions explicitly.
    
    * test(ui5-toolbar): cover canonical flex-spacer overflow-group case
    
    Address code-review feedback on the validation-warnings change:
    
    - Add a test for the canonical case — a default `ui5-toolbar-spacer`
      (no width, default priority) with a non-empty `overflow-group` — and
      assert the spacer-rule warning still fires. The previous coverage
      only exercised a fixed-width spacer, leaving the more common flex
      case implicit.
    - Drop redundant double parentheses around `($tb[0] as Toolbar)` casts
      before `.onResize()` calls.
    
    * docs(ui5-toolbar): add grouped-overflow website sample
    
    Add a documentation-website sample under `_samples/main/Toolbar/GroupedOverflow/`
    demonstrating the `overflow-group` property on `ui5-toolbar`. A "Filter:"
    label-button and its sibling `ui5-toolbar-select` share
    `overflow-group="filters"` so they overflow into the popover together.
    
    The toolbar is constrained to 320px so the group cannot fit alongside the
    ungrouped Add/Reject buttons — both group members move into the overflow
    popover atomically, while the ungrouped items stay in the bar. The teaching
    comment describes this static end-state honestly (no responsive narration).
    
    Wires the sample into the Toolbar docs page under "More Samples".
    
    * chore: wip snapshot before emergency context switch
    
    Saving scratch notes, docs, and validation test page from
    toolbar-overflow-group work in progress.
    
    * chore: remove scratch and working files
    
    * refactor(ui5-toolbar): address review comments for overflow-group
    
    - build the slotIndex map once in distributeItems and pass it into
      buildDistributionUnits instead of allocating it twice per layout pass
    - move overflow-group validation warnings out of the effectiveOverflow*
      getters into validateOverflowGroupConstraints (called from
      onAfterRendering) so the getters stay pure
    - remove leftover ADR-0001 references from source and test comments
    - consolidate the standalone overflow-group test pages into Toolbar.html
