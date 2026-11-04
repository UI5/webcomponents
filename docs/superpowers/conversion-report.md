# `title=` → `data-ui5-tooltip` Conversion Report

Running record of every occurrence that received **special handling** or a **behavior decision** during the migration. Straightforward TOOLTIP conversions (swap `title`→`data-ui5-tooltip`, fold into `aria-description`, wire `startTooltipSupport()`) are not individually listed unless something non-obvious happened.

See the design spec for the full per-occurrence table: `docs/superpowers/specs/2026-11-04-title-to-tooltip-migration-design.md`.

## Behavior decisions (user-approved)

### D1 — RatingIndicator: default tooltip now composes into `aria-description`
- **File:** `packages/main/src/RatingIndicator.ts` (`_ariaDescription` getter).
- **Change:** folded `ratingTooltip` into `_ariaDescription` via `[this.ratingTooltip, required].filter(Boolean).join(" ")`.
- **Effect:** with default tooltips enabled (the default), a `required` rating's `aria-description` changed from `"Required"` to **`"Rating Required"`** — the default tooltip text "Rating" now joins the required description.
- **Decision:** **Accepted** (user). The control becomes self-describing and the tooltip text is preserved per the invariant. Existing test updated to expect `"Rating Required"`.
- **Alternative rejected:** fold only user-set tooltips (not the auto default) into aria.

## Engineering notes / gotchas

### G1 — Getter name must not collide with the `ariaDescription` DOM/JSX prop
- A public getter named `ariaDescription` fails TypeScript: Preact's JSX types the DOM `ariaDescription` property as `string | null`, so a getter returning `string | undefined` makes the component invalid as a JSX element (`TS2786`). **Use a `_`-prefixed internal name** (e.g. `_ariaDescription`), matching the RatingIndicator convention. Hit on Switch; fixed by renaming.

## Special-handling cases

### Prerequisite — TooltipSupport delegation reworked (Phase 0)
- **Files:** `packages/main/src/TooltipSupport.ts`, `TooltipGestures.ts`.
- The prototype only opened and used a non-scoping-safe `createElement("ui5-tooltip")`. Reworked into a scoping-safe document delegate driving the full open/close/long-press/Escape machine via a per-target `TooltipGestures`.
- **Non-obvious fix:** `TooltipGestures.triggerFromDiscovery()` was added because listeners attached during the dispatch of the discovering `mouseover`/`focusin` are skipped by the DOM, so the *first* hover/focus would otherwise be lost.
- **Correctness fix:** the shared tooltip now closes when the active target's `data-ui5-tooltip` text is cleared or the target leaves the DOM.

### Tag — dual root, composed description
- **Files:** `Tag.ts`, `TagTemplate.tsx`.
- Tag has two roots: interactive `<button>` (already had `aria-description={this._valueState}`) and non-interactive `<div>` (no aria).
- Interactive: tooltip composed with value state via new `_interactiveAriaDescription` getter (`[this._valueState, this._title].filter(Boolean).join(" ")`) so the value state is **not** overwritten.
- Non-interactive: added `aria-description={this._title}` (previously had none).

### Select — tooltip on outer root, a11y via inner hidden span
- **Files:** `Select.ts`, `SelectTemplate.tsx`.
- `data-ui5-tooltip={this._effectiveTooltip}` sits on the **outer** `.ui5-select-root` (where `title` was); the combobox a11y lives on an **inner** div using the hidden-span + `aria-describedby` model.
- `_effectiveTooltip` folded into `ariaDescriptionText`, which renders the `#accessibleDescription` hidden span the inner combobox references. So the tooltip reaches a11y through Select's own idiom.
- **Note:** `_effectiveTooltip` includes a readonly-truncation fallback (full selected text); that fallback now also flows into `aria-description` when readonly + truncated.
- `[ui5-option]` `title` (Option/OptionCustom, lines 185/189 of the spec) is a **different component, out of scope** — left as native title.

### SegmentedButtonItem — fold only explicit tooltip, not slot-text fallback
- **Files:** `SegmentedButtonItem.ts`, `SegmentedButtonItemTemplate.tsx`.
- Template tooltip is `tooltip || slotTextContent` (slot text shown on hover when truncated). Both are shown via `data-ui5-tooltip`.
- **Only the explicit `tooltip`** is folded into `ariaDescriptionText` — the slot text is already the accessible name (`ariaLabelText`), so folding it would duplicate the label in the description.

### Switch
- **Files:** `Switch.ts`, `SwitchTemplate.tsx`.
- New `onEnterDOM` (Switch had none) + new `_ariaDescription` getter (see G1). Switch keeps its separate `aria-describedby` readonly hidden-span; the tooltip goes to a distinct `aria-description`.

## Components converted (status)

| Component | Bucket | Status | Notes |
|---|---|---|---|
| Link | TOOLTIP | ✅ done | `ariaDescriptionText` folds in `tooltip` |
| RatingIndicator | TOOLTIP | ✅ done | see D1 |
| Switch | TOOLTIP | ✅ done | new `onEnterDOM` + `_ariaDescription` (see G1) |
| Tag | TOOLTIP | ✅ done | dual root, composed description |
| Select | TOOLTIP | ✅ done | tooltip outer root; a11y via inner hidden span; readonly fallback |
| SegmentedButtonItem | TOOLTIP | ✅ done | fold explicit tooltip only, not slot-text |
