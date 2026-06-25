# Toolbar overflow group — full feature review

**Date:** 2026-06-25
**Branch:** `feat/toolbar-overflow-group-core`
**Fixed point:** `9b6fea736543a77bffdd3d7448c521953269fe60`
**Compare:** `git diff 9b6fea73654...HEAD`

## Commits in scope

- `0ab3eb93c11` feat(ui5-toolbar): add overflow-group for atomic group overflow
- `5e962cf708a` feat(ui5-toolbar): warn on invalid overflow-group configurations
- `277514188f3` test(ui5-toolbar): cover canonical flex-spacer overflow-group case
- `8ecc1741b3d` docs(ui5-toolbar): add grouped-overflow website sample

## Files changed

| File | Change |
| --- | --- |
| `packages/main/src/Toolbar.ts` | +122 |
| `packages/main/src/ToolbarItemBase.ts` | +88 |
| `packages/main/cypress/specs/Toolbar.cy.tsx` | +448 |
| `packages/main/test/pages/ToolbarOverflowGroup.html` | new |
| `packages/website/docs/_components_pages/main/Toolbar/Toolbar.mdx` | +5 |
| `packages/website/docs/_samples/main/Toolbar/GroupedOverflow/{sample.html,sample.tsx,main.js,GroupedOverflow.md}` | new |

## Spec sources

- `.scratch/toolbar-overflow-group/PRD.md`
- `docs/adr/0001-toolbar-overflow-group.md`
- `.scratch/toolbar-overflow-group/issues/01-core-grouped-overflow.md`
- `.scratch/toolbar-overflow-group/issues/02-validation-warnings.md`
- `.scratch/toolbar-overflow-group/issues/03-website-sample.md`

## Standards sources

- `AGENTS.md`
- `CONTRIBUTING.md`
- `packages/base/AGENTS.md`

---

## Standards

### Hard violations

- **packages/main/cypress/specs/Toolbar.cy.tsx — heavy use of `cy.wait(...)`.** Every test contains one or more `cy.wait(500)` / `cy.wait(200)` calls with `// eslint-disable-next-line cypress/no-unnecessary-waiting` suppressions (≈20 occurrences). The repo's lint rule (`cypress/no-unnecessary-waiting`) explicitly forbids this; suppressing the rule per-line, not fixing the wait, is still a violation of the rule the project enforces. Prefer `cy.get(...).should(...)` retries or `cy.wait("@alias")`. The `packages/base/AGENTS.md` testing section also positions Cypress retry assertions as the pattern, not arbitrary sleeps.
- **packages/main/cypress/specs/Toolbar.cy.tsx — string-literal `style` attributes on host divs.** JSX uses `<div style="width: 260px;">` (and many more). Standard JSX/TS expects an object: `style={{ width: "260px" }}`. The `sample.tsx` in the same diff already does this correctly. This will trigger `react/style-prop-object`-class typing errors under strict JSX. Same wrapper appears ~9 times.

### Judgement calls

- **packages/main/src/ToolbarItemBase.ts — string literals instead of typed enum values.** In `effectiveOverflowPriority`, the comparisons `declared === "AlwaysOverflow" || declared === "NeverOverflow"` are bare strings. `declared` is already typed `` `${ToolbarItemOverflowBehavior}` ``, so this is compliant with the AGENTS.md Quick Reference "Good" column. Not a violation, but worth noting since the diff intentionally avoids the enum import.
- **packages/main/src/Toolbar.ts — `@since 2.27.0`** on `overflowGroup`. Verify against the package version in `packages/main/package.json` — if main's current version is not yet `2.27.x`, the tag is speculative.
- **packages/main/test/pages/ToolbarOverflowGroup.html** — test pages aren't covered by the website-samples convention, so no playground-fold rules apply. Clean.
- **Website sample** (`packages/website/docs/_samples/main/Toolbar/GroupedOverflow/`) — matches the AGENTS.md sample-folder convention exactly. The added `sample.tsx` plus `react={react}` Editor prop is an extension over the documented minimum but is consistent with newer samples in the repo. No violation.

### Clean

`packages/main/src/Toolbar.ts` distribution logic, `ToolbarItemBase.ts` getters, `Toolbar.mdx` entry — follow attribute-selector conventions, no `instanceof`, no direct DOM mutation, no tag-name selectors, type-literal enum usage.

---

## Spec

### (a) Missing / partial requirements

1. **Issue 01 AC: "An internal dev sample HTML page at `packages/main/test/pages/ToolbarOverflowGroup.html` demonstrates: a contiguous group, a non-contiguous group, runtime regrouping, and reverse-overflow placement."** All four sections exist, but only an `ExternalReverseOverflow`-style use case is demonstrated by toggling `reverseOverflow` after the bar is rendered. PRD §user-story 14 covers this — met for the manual page, but no Cypress test asserts the popover actually opens above the bar (only `tb.overflowItems` ordering). Partial, but spec only requires the dev page to "demonstrate," so this is borderline OK.
2. **PRD line 50 ("Atomic group overflow … may over-shoot"):** Atomic over-shoot is implemented, but the "force trailing separator into overflow" loop (`Toolbar.ts` ~line 488–497) **skips any unit whose `members.length > 1`**, including a group whose rightmost member is a separator. PRD §44 ("`ToolbarSeparator`: full participation … label-separator-control clusters") implies grouped separators should still travel with the group — they do — but if a *group* is the trailing unit and its rightmost member is a separator, the loop breaks and the trailing-separator rule is silently disabled for the whole bar. The original loop pushed a trailing separator regardless; the rewrite changes behavior for ungrouped separators when the trailing unit is a group. Looks wrong vs. PRD §"No breaking changes."

### (b) Scope creep — nontrivial

3. **`_groupingKey` invalidation snapshot (`Toolbar.ts` lines 194–196, 318–321, 443).** PRD §53 says: "Reactivity uses existing path. `overflowGroup` is a regular `@property()` on `ToolbarItemBase`. Changes invalidate the item, which bubbles to the toolbar via the existing child-change machinery in `onInvalidation`, triggering re-distribution. **No new lifecycle hooks.**" The diff adds a new pipe-joined snapshot diff to short-circuit `onInvalidation`. This works but adds invalidation-tracking surface area the ADR explicitly disclaimed.

### (c) Implementation looks wrong

4. **`itemsToOverflow` slot-order sort (Toolbar.ts ~line 502–504):** PRD §51 says "Inside the popover, group members appear in slot order, adjacent to each other (the group is a contiguous block). The group is positioned among other overflowed items by its rightmost member's slot index." Sorting `overflowedItems` purely by *individual* slot index does **not** preserve this when an ungrouped item's slot index falls between two group members' indices. Example: source `[A(g), Ungrouped-X, C(g)]` — if X also overflows, the popover order becomes `[A, X, C]` (A and C not adjacent), violating the "group is a contiguous block" rule. The non-contiguous test (cy.tsx line 904) only overflows the group, never the in-between ungrouped item, so this isn't caught. Implementation looks wrong vs. PRD §51 / ADR §"group … remains a contiguous block."
5. **Trailing-separator rule regression** — see finding 2 above; classify as wrong-implementation rather than missing.

---

## Summary

- **Standards:** 2 hard findings. Worst: `cy.wait` suppressions throughout the Cypress spec.
- **Spec:** 5 findings. Worst: popover non-contiguity when an ungrouped item overflows between group members — PRD §51 violation not covered by tests.
