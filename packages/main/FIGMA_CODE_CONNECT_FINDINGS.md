# Figma Code Connect — what doesn't work / what's assumed

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

## 1. Button — ui5-button (node 91702:11733)
**Doesn't work:**
- badge `text` — **HARDCODED `"72"`, NOT read from Figma.** The count is in an unexposed nested layer; the snippet always emits `text="72"` and won't track the Figma number. *Owner fix: expose the count as a readable text prop.*


**Assumed (design rule):**
- badge `design` ← Form Factor: Compact → InlineText, Cozy → OverlayText (per kit owners). *Confirm by toggling Form Factor with a counter badge on.*


## 2. Input — ui5-input (node 148569:1004)
**Doesn't work:**
- `Content` (Placeholder vs Typed Text) — Figma-only display toggle; can't gate which text emits, so both `value` and `placeholder` are always emitted.


## 3. MessageStrip — ui5-message-strip (node 910:2517) — DEFERRED
**Doesn't work:**
- message text — default-slot content (placeholder).
- **ColorSet2 in React only** — the React parser can't merge two axes into one `design`, so ColorSet2 (Indication "Nb") is unreachable in React (WC maps the full palette).

**Assumed / needs Dev-Mode check:**
- custom-colour variants (Indication N / Nb) emit `design="ColorSet1|2" color-scheme="N"` in WC — not yet visually confirmed per-variant.

## 4. Select — ui5-select (node 181557:7507)
**Doesn't work:**

-`options` → placeholder options

  What: The generated <ui5-select> always shows generic <ui5-option>Option 1/2/3</ui5-option>,
  never the real dropdown choices from the design.

  Why: Options are slotted children (same as SegmentedButton labels). In Figma the Select is
  drawn as a closed control — it's essentially an embedded Input showing the selected text,
  with no readable list of the option values behind it. So there's nothing to read → fixed
  placeholders.

- `Drop-Down` (True/False) → Figma-only runtime open state

  Figma has a Drop-Down variant (closed vs open-showing-the-list). But "open/closed" is a
  runtime interaction state, not a component property in code — you don't write <ui5-select
  open> as a design intent. So there's nothing meaningful to emit from it; it's a Figma-only
  concept.


## 5. SegmentedButton — ui5-segmented-button (node 91702:11986)

**Doesn't work:**

- segment `labels` — the item text ("Option 1"…) lives in Figma slots (⿻ Text Segments),
  which are light-DOM projection, not a readable property. So real labels can't be read →
  placeholders. (Different from the icon issue: this is slotted content, not instance-swap.)
- selected `segment` — which segment is pressed isn't exposed as a readable prop at all, so I
  just mark item 1 selected as a stand-in — it won't match the actually-selected one in the
  design.


## 6. Avatar — ui5-avatar (node 573:3623)
**Doesn't work (emits placeholder — consumer edits):**
- `image` (Type=Image) — actual image fill not readable → placeholder `<img src="https://via.placeholder.com/48">`.
- `badge` (Badge boolean) — badge content not readable → placeholder `<ui5-avatar-badge icon="edit">` (presence maps, content doesn't).
- Color=Image/Tile — no `color-scheme` equivalent (nothing emitted for those two Color values).

---

*Components with no gaps: RadioButton CheckBox Switch StepInput
