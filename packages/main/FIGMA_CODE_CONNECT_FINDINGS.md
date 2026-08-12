# Figma Code Connect — API ↔ Figma Findings

Per-component state of the SAP Web UI Kit Code Connect mappings (file
`SILcWzK5uFghKun9jx6D7c`), both **Web Components** (`src/*.figma.ts`) and **React**
(`src/*.figma.tsx`). For each component: what **works**, what **doesn't work**, what is
**assumed** (needs manual Dev-Mode check), and any **misalignment** between the Figma
model and the web-component API. *The misalignments are the point of this document.*

**Verification legend:** `screenshot-verified` = the component set was rendered and the
mapping checked against it; `figma-props` = confirmed against the live property dump;
`assumed` = plausible but NOT yet visually confirmed — flagged for manual check.

**Global (every component):** Form Factor (Compact/Cozy) is ignored (global density, not a
per-element attr). Interaction State Hover/Active/Down/Focus/Visited are visual pseudo-states
with no attr — only `Disabled`→`disabled`, `Read Only`→`readonly` map. a11y/name/form/tooltip
props are never modelled in the kit.

---

## 1. Button — ui5-button (node 91702:11733)

**Works (screenshot-verified):**
- `design` ← Type — all 6 confirmed: Primary→Emphasized, Secondary→Default, Tertiary→Transparent, Accept→Positive, Reject→Negative, Attention→Attention.
- `disabled`, label text.
- Counter badge presence ← Counter Badge (WC + React).
- Attention badge presence ← Attention Badge (**WC only** — see misalignment).

**Works (ASSUMED — design rule, not visually re-verified):**
- badge `design` ← Form Factor: **Compact → InlineText, Cozy → OverlayText** (per kit owners). Applied in both WC + React. *Please confirm in Dev Mode by toggling Form Factor with a counter badge on.*

**Doesn't work:**
- `icon` — instance-swap, name unreadable → hardcoded `icon="globe"`.
- **badge `text` — HARDCODED to `"72"`. NOT read from Figma.** The count lives in an unexposed nested text layer that Code Connect cannot read, so the snippet always emits `text="72"` regardless of what number the Figma design shows. It will NOT track changes to the number in Figma. *Owner fix: expose the badge count as a readable component text prop.*
- `endIcon` — no Figma equivalent.

**Assumed — check manually:** badge `design` ← Form Factor (Compact→InlineText, Cozy→OverlayText). Design rule per owners, applied but not visually re-verified.

**Fixed 2026-08-11 (were bugs):**
- `Counter Badge` is a Figma **VARIANT** (True/False), not a boolean — was `figma.boolean` (silently didn't match → no badge). Now `figma.enum`.
- Badge text was `"1"`; Figma layer shows `"72"` — corrected.
- React was missing the Attention Badge entirely.

**Misalignment:**
- Figma `Toggled` axis — ui5-button has no toggle (that's ui5-toggle-button). Figma-only, ignored.
- **React can express only ONE badge.** The `badge` prop can't reference two Figma axes (parser rejects compound placeholders), so React drives `badge` from Counter Badge only; the Attention Badge is unreachable in React (WC emits both). Same parser-asymmetry class as MessageStrip ColorSet2.

---

## 2. Input — ui5-input (node 148569:1004)

**Works (screenshot-verified):**
- `value` ← ✏️ Typed Text, `placeholder` ← ✏️ Placeholder.
- `value-state` ← Value State (None/Negative/Critical/Positive/Information, 1:1).
- `disabled` / `readonly` ← Interaction State.
- `valueStateMessage` ← nested "Input Message Popover" ✏️ Text (**Dev-Mode-confirmed**, WC + React). Read via a TOP-LEVEL `figma.nestedProps` prop and referenced as the resolved `${msg.text}`. NOTE: the slot is ALWAYS emitted — it can't be gated on the Message Popover boolean without re-breaking the resolved text (gating + resolved-text can't coexist); on non-popover variants the text resolves empty.

**Doesn't work:**
- `icon` slot ← 2nd Action — slotted/instance-swap, not readable.
- `showClearIcon` ← Trailing Action — approximated only (Trailing Action is generic).

**Assumed:** nothing.

**Misalignment:**
- `Content` (Placeholder vs Typed Text) — Figma-only display toggle; can't gate which text emits, so both `value` and `placeholder` are always emitted.
- `Description Text` (+✏️) — Figma-only, no ui5-input equivalent.

---

## 3. CheckBox — ui5-checkbox (node 154589:905)

**Works (screenshot-verified):**
- `text` ← ✏️ Text (gated by Label boolean).
- `checked` ← Check=Checked.
- `value-state` ← Value State (1:1).
- `disabled` / `readonly` / `displayOnly` ← Interaction State (Display Only exists in Figma → maps 1:1).

**Doesn't work:** —

**Assumed:** nothing — all verified.

**Misalignment:**
- `indeterminate` ← Check=Tristate — approximation: WC `indeterminate` is independent of `checked`, but the single Figma "Tristate" can't express both at once.

---

## 4. RadioButton — ui5-radio-button (node 154597:1967)

**Works (screenshot-verified):**
- `text` ← ✏️ Text (gated by Label), `checked` ← Selected, `value-state` ← Value State (1:1), `disabled`/`readonly` ← Interaction State.

**Doesn't work:** —

**Assumed:** nothing — all verified.

**Misalignment:** none. Cleanest component — every visual Figma property maps.

---

## 5. StepInput — ui5-step-input (node 148569:1727)

**Works (screenshot-verified):**
- `value` ← ✏️ Value, `value-state` ← Value State (1:1), `disabled`/`readonly` ← Interaction State.
- `valueStateMessage` ← nested "Input Message Popover" ✏️ Text (same top-level-prop pattern as Input; Dev-Mode-confirmed).

**Doesn't work:**
- +/- button icons — instance-swaps (Subtract/Add Button → Icon), names unreadable.

**Assumed:** nothing — all verified.

**Misalignment:** `Description Text` (+✏️) — Figma-only, no ui5-step-input equivalent.

---

## 6. MessageStrip — ui5-message-strip (node 910:2517)

**Works (screenshot-verified + CSS-token-confirmed):**
- `design` ← Value State — semantic 1:1 (Information/Positive/Critical/Negative).
- Custom colours: single `Color` axis → `design="ColorSet1|ColorSet2" color-scheme="1".."10"`. Direction confirmed via WC CSS tokens: Figma "Indication N" ↔ `--sapIndicationColor_N` = ColorSet1; "Nb" ↔ private set-2 tokens = ColorSet2.
- `hide-icon` ← Icon=False, `hide-close-button` ← Close Button=False.

**Doesn't work:**
- message text — default-slot content (placeholder).
- `icon` slot ← Icon (INSTANCE) — slotted custom icon.

**Assumed:** nothing — direction was the open question, now confirmed.

**Misalignment:** React variant reaches ColorSet1 + `color-scheme` only — the React parser can't merge two axes into one `design`, so **ColorSet2 is unreachable in React** (works fully in WC).

---

## 7. Select — ui5-select (node 181557:7507)

**Works (screenshot-verified, via nested Input):**
- `disabled` / `readonly` / `value-state` — only via the embedded Input instance's states.
- `valueStateMessage` ← nested "Input Message Popover" ✏️ Text (deeply nested under Drop-Down > Value Message; `figma.nestedProps` resolves it by name — Dev-Mode-confirmed).

**Doesn't work:**
- `options` — slotted `ui5-option`s; Figma models a closed Input with no readable option list.
- `icon`, `label` slot, `textSeparator` — not readable / not modelled.

**Assumed:** nothing — verified (screenshot shows only Form Factor × Drop-Down axes).

**Misalignment:**
- `Drop-Down` (True/False) — Figma-only runtime open state, no WC prop.
- The Select component itself has **no** Value State / Interaction State axes (those live only on the nested Input) — owner should add them like Input/CheckBox.

---

## 8. SegmentedButton — ui5-segmented-button (node 91702:11986)

**Works (screenshot-verified):**
- segment count ← 3rd/4th/5th Button booleans (adds/removes placeholder items).

**Doesn't work:**
- segment labels/icons — live in Figma slots (⿻ Text/Icon Segments), not readable → placeholder labels (Option 1..5).
- selected segment — not a readable prop; first item marked `selected` as default.

**Assumed:** nothing — verified.

**Misalignment:** `Type` (Text/Icon) — item content type is per-item in the WC (slotted items), but a component-level axis in Figma; adds nothing dynamic without readable content.

---

## 9. Switch — ui5-switch (node 24087:10369)

**Works (screenshot-verified):**
- `checked` ← Checked, `disabled` ← Interaction State=Disabled.
- `design` ← Type: **Non-Semantic → Textual, Semantic → Graphical.** Key insight: `Textual` does NOT mean text — with no textOn/textOff it renders check/dash icons in blue/grey (= Non-Semantic); `Graphical` renders positive/negative icons green ✓ / red ✗ (= Semantic), matching the WC docs ("if Graphical, positive/negative icons replace textOn/textOff").

**Doesn't work:** — (no Figma-side property goes unreflected.)

**Assumed:** nothing.

**Corrected 2026-08-12:** an earlier pass WRONGLY removed the `Type→design` mapping, concluding "all switches are Graphical" from the screenshot (all render icons). That was wrong — Textual also renders icons (neutral-colored), so Non-Semantic=Textual / Semantic=Graphical is correct. Mapping restored.

---

## 10. Link — ui5-link (node 187:305)

**Works (screenshot-verified):**
- `design` ← Type — Emphasized→Emphasized, Subtle→Subtle, Regular→Default (confirmed by weight/colour); Icon Link→Default.
- `disabled` ← Interaction State, label text ← ✏️ Text.
- `icon` / `endIcon` ← Icon Position: Left→`icon`, Right→`end-icon`, N/A→neither. POSITION is dynamic.

**Doesn't work:**
- icon NAME — instance-swap, not readable → hardcoded `"inspect"` placeholder (the position maps, the name does not).

**Assumed:** nothing — verified.

---

## 11. Avatar — ui5-avatar (node 573:3623)

**Works (screenshot-verified):**
- `size` ← Size (XS–XL, 1:1).
- `color-scheme` ← Color (1..10 → Accent1..10; Transparent/Placeholder 1:1).
- `shape` ← Content — **screenshot-verified**: Person column renders circles, Object column renders squares.
- `disabled` ← Interaction State=Disabled.
- `initials` ← ✏️ Initials — **Dev-Mode-confirmed**: the Initials text layer only exists on `Type=Initials` variants, so `initials` is emitted only there and correctly omitted on Image/Icon avatars (no gating needed).
- `icon` ← Type=Icon → `icon="employee"` (WC default). Emitted only for the Icon type. The POSITION/presence maps; the icon NAME is a placeholder (Person/Object Icon are instance-swaps, not readable).

**Doesn't work:**
- `icon`/`fallbackIcon` NAME ← Person/Object Icon (instance-swap) — name unreadable → placeholder `"employee"` (icon presence maps via Type=Icon; the name does not).
- `image` slot — slotted image, not readable.
- `badge` slot ← Badge boolean — presence only, not content.
- Color=Image/Tile — no `color-scheme` equivalent.

**Assumed:** nothing — all verified.

**Misalignment:**
- `mode` (Image/Decorative/Interactive = a11y role) vs Figma `Type` (Image/Icon/Initials = content source) — different concepts.
- shape/content coupling: Figma couples shape to Content (Person=circle); the WC treats `shape` as independent → Figma can't express a square person avatar.
- `Optional Border` (BOOLEAN) — Figma-only, no WC prop.

---

## Cross-cutting classes — Figma properties that code can't fully reflect
1. **Instance-swap icons** (Button, Link, StepInput, Avatar, SegmentedButton) — the selected icon's name is never readable → hardcoded placeholder name. *Fix: owner adds `Icon Name` text prop, or generate per-icon Code Connect entries.*
2. **Slotted content** (MessageStrip text, Select options, SegmentedButton labels) — light-DOM projection, not a readable prop → placeholder text.
3. **Figma-only props, no WC equivalent** — Button `Toggled`, Input/StepInput `Description Text`, Avatar `Optional Border`, Select `Drop-Down`. Present in Figma, nothing to emit.
4. **Concept mismatches** — Avatar `mode` vs Figma `Type`; Avatar shape/content coupling; Link icon-as-Type vs icon-as-slot.
5. **Parser asymmetry** — React parser can't merge two Figma axes into one prop → MessageStrip ColorSet2 and Button's second badge unreachable in React (both work in WC).

## Open items needing manual Dev-Mode check
- **Button badge `design`** — confirm Compact→InlineText / Cozy→OverlayText renders correctly (design-rule assumption).
- **MessageStrip** — deferred: confirm custom-colour variants (Indication N / Nb) emit `design="ColorSet1|2" color-scheme="N"` in WC; decide on the React ColorSet2 gap.

## Parser lesson (applies to all mappings)
A `figma.*` call **inlined** inside a template literal (WC `html\`\``) or inside a
prop's value expression emits **verbatim** — the generated snippet prints the
source text (e.g. `figma.nestedProps(...)`) instead of the resolved value. This
passes dry-run validation (it *parses*) but produces broken output. The fix:
declare every `figma.*` read as a **top-level prop** and reference it as a plain
`${prop}` / `{prop}` in the example — then it resolves correctly (this is how
Input `valueStateMessage` was fixed after an initial inlined attempt failed).
Consequence: you can insert a resolved value into surrounding markup, but you
can't ALSO gate that same markup on a boolean in the same expression — gating +
resolved-nested-text can't coexist, so such slots emit unconditionally.
