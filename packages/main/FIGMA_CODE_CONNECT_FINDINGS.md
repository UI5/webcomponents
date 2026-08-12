# Figma Code Connect — what doesn't work / what's assumed

Focused list of the **gaps** in the SAP Web UI Kit Code Connect mappings (file
`SILcWzK5uFghKun9jx6D7c`), WC (`src/*.figma.ts`) + React (`src/*.figma.tsx`).
For each component, only: **Doesn't work** (Figma properties that can't be
reflected in code) and **Assumed** (mapped but not visually confirmed).
Components with neither are omitted. Anything not listed here maps correctly.

## ⚠️ Global: icon NAMES can never be read
In Figma an icon is an **INSTANCE_SWAP** property — the designer swaps in an icon
*component* from the library. Code Connect can read variants, booleans, and text,
but **cannot read which component was swapped into an instance-swap slot as a
string**. So we can detect that an icon is present, and often *where* (Link's Icon
Position, Avatar's Type=Icon), but never *which* icon. Every
`icon=`/`endIcon=`/`fallback-icon=` therefore emits a **hardcoded placeholder
name** (`"globe"`, `"inspect"`, `"home"`, `"employee"`); the consumer edits it.
*Owner fixes: (a) add an `Icon Name` text property alongside the swap, or (b)
Code-Connect the icon library (one entry per icon emitting its own name).*

## ⚠️ Global: figma.* reads must be top-level props
A `figma.*` call **inlined** inside a template literal / JSX emits **verbatim**
(prints the source, e.g. `figma.nestedProps(...)`, not the value). It still passes
dry-run. Fix: declare the read as a **top-level prop**, reference it as plain
`${prop}`. Consequence: a resolved value can be inserted into markup, but that
markup can't ALSO be gated on a boolean in the same expression — so such slots
(e.g. valueStateMessage) emit unconditionally.

---

## 1. Button — ui5-button (node 91702:11733)
**Doesn't work:**
- `icon` — instance-swap → hardcoded `icon="globe"` (see global icon note).
- badge `text` — **HARDCODED `"72"`, NOT read from Figma.** The count is in an unexposed nested layer; the snippet always emits `text="72"` and won't track the Figma number. *Owner fix: expose the count as a readable text prop.*
- Attention badge in **React only** — React's `badge` prop can't reference two Figma axes, so React emits the counter badge only; the attention badge is unreachable there (WC emits both).

**Assumed (design rule, not visually re-verified):**
- badge `design` ← Form Factor: Compact → InlineText, Cozy → OverlayText (per kit owners). *Confirm by toggling Form Factor with a counter badge on.*

## 2. Input — ui5-input (node 148569:1004)
**Doesn't work:**
- `icon` slot ← 2nd Action — slotted/instance-swap, not readable.
- `showClearIcon` ← Trailing Action — approximated (Trailing Action is generic).
- `Content` (Placeholder vs Typed Text) — Figma-only display toggle; can't gate which text emits, so both `value` and `placeholder` are always emitted.
- `Description Text` (+✏️) — Figma-only, no ui5-input equivalent.
- `valueStateMessage` slot is always emitted (can't be gated on Message Popover without breaking the resolved text); text resolves empty on non-popover variants.

## 3. CheckBox — ui5-checkbox (node 154589:905)
**Doesn't work:**
- `indeterminate` ← Check=Tristate — approximation: WC `indeterminate` is independent of `checked`, but the single Figma "Tristate" can't express both at once.

## 5. StepInput — ui5-step-input (node 148569:1727)
**Doesn't work:**
- +/- button icons — instance-swaps (see global icon note).
- `Description Text` (+✏️) — Figma-only, no ui5-step-input equivalent.
- `valueStateMessage` slot always emitted (as Input).

## 6. MessageStrip — ui5-message-strip (node 910:2517) — DEFERRED
**Doesn't work:**
- message text — default-slot content (placeholder).
- `icon` slot ← Icon (INSTANCE) — slotted custom icon.
- **ColorSet2 in React only** — the React parser can't merge two axes into one `design`, so ColorSet2 (Indication "Nb") is unreachable in React (WC maps the full palette).

**Assumed / needs Dev-Mode check:**
- custom-colour variants (Indication N / Nb) emit `design="ColorSet1|2" color-scheme="N"` in WC — not yet visually confirmed per-variant.

## 7. Select — ui5-select (node 181557:7507)
**Doesn't work:**
- `options` — slotted `ui5-option`s; Figma models a closed Input with no readable option list → placeholder options.
- `icon`, `label` slot, `textSeparator` — not readable / not modelled.
- `Drop-Down` (True/False) — Figma-only runtime open state.
- Value State / Interaction State exist only on the nested Input, not the Select itself.
- `valueStateMessage` slot always emitted (as Input).

## 8. SegmentedButton — ui5-segmented-button (node 91702:11986)
**Doesn't work:**
- segment labels — slotted (⿻ Text Segments), not readable → placeholders "Option 1..5".
- segment icons — instance-swaps → placeholder `icon="home"` (Type switches text↔icon form, but the icon name is fixed).
- selected segment — not readable; first item marked `selected` as a representative default (does NOT reflect the actually-pressed segment).

## 10. Link — ui5-link (node 187:305)
**Doesn't work:**
- icon NAME — instance-swap → hardcoded `"inspect"` (Icon Position maps Left→`icon` / Right→`end-icon`; the name does not — see global icon note).

## 11. Avatar — ui5-avatar (node 573:3623)
**Doesn't work:**
- `icon`/`fallbackIcon` NAME — instance-swap → placeholder `"employee"` (Type=Icon maps icon presence; the name does not).
- `image` slot — slotted image, not readable.
- `badge` slot ← Badge boolean — presence only, not content.
- Color=Image/Tile — no `color-scheme` equivalent.

---

*Components with no gaps: RadioButton (everything maps). CheckBox/Switch/others map fully except the items listed above.*
