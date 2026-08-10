# Figma Code Connect — what maps, what doesn't

Code Connect mappings for the **SAP Web UI Kit** (file `SILcWzK5uFghKun9jx6D7c`),
published in two variants: **Web Components** (`src/*.figma.ts`) and **React**
(`src/*.figma.tsx`). This file is the short record of, per component, what maps
dynamically in Dev Mode and what doesn't (with the reason + fix).

**Two axes ignored on every component (by decision):**
- **Form Factor (Compact/Cozy)** — density is a global UI5 setting, not a per-element attribute.
- **Interaction State = Hover/Active/Down/Focus** — visual pseudo-states, no attribute. Only `Disabled`→`disabled` and `Read Only`→`readonly` map.

---

## Button — ui5-button (node 91702:11733)
**works:** partly — `design`, `disabled`, and label text map dynamically.

**doesn't map:**
- `icon` — Figma instance-swap; the swapped icon's name isn't readable, so hardcoded `icon="globe"`.
- badge — modeled as 2 booleans with no design enum, and the count sits in a nested layer, so `design`/`text` are hardcoded.

**how to fix:**
- owner adds an `Icon Name` string prop (or Code-Connect the icon set).
- add a single `Badge Design` enum (None/InlineText/OverlayText/AttentionDot) + a `Badge Text` string prop.

## Input — ui5-input (node 148569:1004)
**works:** yes — `value`, `placeholder`, `value-state` (1:1), `disabled`/`readonly` all map.

**doesn't map:**
- `Content` (Placeholder vs Typed Text) is a display toggle, so both attrs are always emitted.
- `Trailing Action` / `2nd Action` / `Message Popover` are slotted icon/action/message content with no readable value.
- `Description Text` has no `ui5-input` equivalent.

**how to fix:**
- cosmetic ones need nothing (consumer deletes the extra attr).
- for the actions, owner exposes the action icon as a prop or Code-Connect the icon set.

## CheckBox — ui5-checkbox (node 154589:905)
**works:** yes — `text`, `checked`/`indeterminate`, `value-state`, `disabled`/`readonly` all map.

**doesn't map:**
- `Interaction State = Display Only` — no display-only mode in the WC, approximated as `readonly`.
- Tristate can't express both indeterminate + checked at once.

**how to fix:**
- acceptable approximations; no owner action needed.

## RadioButton — ui5-radio-button (node 154597:1967)
**works:** yes — fully (cleanest component): `text`, `checked`, `value-state`, `disabled`/`readonly`.

**doesn't map:**
- nothing significant — `name`/`value` (form grouping) aren't modeled in Figma, which is expected (app-level, not visual).

**how to fix:**
- n/a.

## StepInput — ui5-step-input (node 148569:1727)
**works:** yes — `value`, `value-state`, `disabled`/`readonly` map.

**doesn't map:**
- `min`/`max`/`step` aren't in Figma (behavioral, not visual).
- +/- button icons are instance-swaps.
- `Message Popover` is slotted nested text.

**how to fix:**
- min/max/step are an expected gap.
- icons need the icon-set fix (see Button).

## MessageStrip — ui5-message-strip (node 910:2517)
**works:** yes (WC) — `design` ← Value State (semantic 1:1), `hide-icon`, `hide-close-button`, and the full custom-colour palette: the single `Color` axis (Indication 1..10 / 1b..10b) maps to `design="ColorSet1|ColorSet2" color-scheme="1".."10"` because the `b` suffix already encodes ColorSet2 on the same axis as the scheme number.

**doesn't map:**
- message text is default-slot content (placeholder).
- React variant reaches ColorSet1 + `color-scheme` only — its parser can't merge two axes into one `design`, so ColorSet2 (the "…b" colours) is unreachable there.

**how to fix:**
- none for WC.
- for React parity, owner splits Figma `Color` into a ColorSet enum + a scheme number so each maps to one prop.

## Select — ui5-select (node 181557:7507)
**works:** almost nothing — the Figma Select has no Value State / Interaction State axes to map.

**doesn't map:**
- options are slotted `ui5-option`s (Figma models a closed Input with no option list).
- `Drop-Down` True/False is a runtime open state, not a prop.
- `value-state`/`disabled`/`readonly` are supported by the WC but absent from the Figma component.

**how to fix:**
- owner adds Value State + Interaction State variants (like Input/CheckBox) and models options as a proper slot/list.

## SegmentedButton — ui5-segmented-button (node 91702:11986)
**works:** partly — presence of the 3rd/4th/5th segments maps (adds/removes items).

**doesn't map:**
- segment labels/icons live in Figma slots (`⿻ Text/Icon Segments`), not readable, so labels are placeholders.
- `Type = Text/Icon` adds nothing without readable content.
- the selected segment isn't a readable prop (first item marked `selected`).

**how to fix:**
- owner exposes per-segment text as component text props.

## Icon — ui5-icon (node 983:5876) — UNPUBLISHABLE
**works:** no — Figma rejects the publish: "corresponding node is not a component or component set".

**reason:**
- node `983:5876` is a plain frame of ~1400 individual icon components, not a component/set.
- kept as `src/Icon.figma.ts.todo` (outside the publish glob) so it doesn't break the atomic batch publish.

**how to fix:**
- owner makes it a real component set.
- even then the icon name isn't readable from a single mapping — generate one `figma.connect` per icon emitting its own name, or expose an `Icon Name` string prop on the host component.
