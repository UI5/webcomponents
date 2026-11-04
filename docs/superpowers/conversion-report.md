# `title=` → `data-ui5-tooltip` Conversion Report

Running record of every occurrence that received **special handling** or a **behavior decision** during the migration. Straightforward TOOLTIP conversions (swap `title`→`data-ui5-tooltip`, fold into `aria-description`, wire `startTooltipSupport()`) are not individually listed unless something non-obvious happened.

See the design spec for the full per-occurrence table: `docs/superpowers/specs/2026-11-04-title-to-tooltip-migration-design.md`.

## Behavior decisions (user-approved)

### D1 — RatingIndicator: default tooltip now composes into `aria-description`
- **File:** `packages/main/src/RatingIndicator.ts` (`_ariaDescription` getter).
- **Change:** folded `ratingTooltip` into `_ariaDescription` via `[this.ratingTooltip, required].filter(Boolean).join(" ")`.
- **Effect:** with default tooltips enabled (the default), a `required` rating's `aria-description` changed from `"Required"` to **`"Rating Required"`** — the default tooltip text "Rating" now joins the required description.
- **Decision:** **Accepted** (user). Rationale: the control becomes self-describing and the tooltip text is preserved for screen readers per the migration invariant. Existing test updated to expect `"Rating Required"`.
- **Alternative rejected:** fold only user-set tooltips (not the auto default) into aria.

## Special-handling cases

_(Recorded as each is implemented.)_

### Prerequisite — TooltipSupport delegation reworked (Phase 0)
- **Files:** `packages/main/src/TooltipSupport.ts`, `TooltipGestures.ts`.
- The prototype only opened and used a non-scoping-safe `createElement("ui5-tooltip")`. Reworked into a scoping-safe document delegate driving the full open/close/long-press/Escape machine via a per-target `TooltipGestures`.
- **Non-obvious fix:** `TooltipGestures.triggerFromDiscovery()` was added because listeners attached during the dispatch of the discovering `mouseover`/`focusin` are skipped by the DOM, so the *first* hover/focus would otherwise be lost.
- **Correctness fix:** the shared tooltip now closes when the active target's `data-ui5-tooltip` text is cleared or the target leaves the DOM.

## Components converted (status)

| Component | Bucket | Status | Notes |
|---|---|---|---|
| Link | TOOLTIP | ✅ done | `ariaDescriptionText` folds in `tooltip`; title→data-ui5-tooltip |
| RatingIndicator | TOOLTIP | ✅ done | see D1 |
