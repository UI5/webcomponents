# Figma Code Connect — what doesn't work / what's assumed

## How to connect a component (runbook)

**Figma file:** SAP Web UI Kit — fileKey `SILcWzK5uFghKun9jx6D7c`.

**Two configs (run from `packages/main`):**
- `figma.config.json` — parser `html`, label "Web Components", globs `src/*.figma.ts`
- `figma.config.react.json` — parser `react`, label "React", globs `src/*.figma.tsx`

**Steps to connect a new component:**
1. Get the component's **node id** (from the Figma URL `?node-id=1-2` → `1:2`).
2. Inspect its readable props (variants / booleans / text / nested instances) — either in Figma's properties panel, or scaffold a starter file that lists them:
   ```
   FIGMA_ACCESS_TOKEN=<token> npx figma connect create "<node-url>" --outDir /tmp/cc
   ```
   (`figma connect create` writes a `.figma.ts` pre-filled with the node's readable properties — a good starting point to edit.)
3. Write `src/<Name>.figma.ts` (WC) and `src/<Name>.figma.tsx` (React) — one `figma.connect(<node-url>, {...})` each.
4. **Dry-run** (no token): `npx figma connect publish --dry-run -c figma.config.json`
5. **Publish** (needs token, run from `packages/main`):
   ```
   FIGMA_ACCESS_TOKEN=<token> npx figma connect publish -c figma.config.json --force
   FIGMA_ACCESS_TOKEN=<token> npx figma connect publish -c figma.config.react.json --force
   ```
   - `--force` overwrites any pre-existing (UI-created) mapping on the node.
   - MUST run from `packages/main` — from repo root the CLI silently falls back to the html parser. Always confirm `Using label "React"` in the output.
6. **Verify in Dev Mode** — parsing ≠ correct output; check the real snippet.

**Connected so far (11, both WC + React):**
Button `91702:11733` · Input `148569:1004` · CheckBox `154589:905` ·
RadioButton `154597:1967` · StepInput `148569:1727` · MessageStrip `910:2517` ·
Select `181557:7507` · SegmentedButton `91702:11986` · Switch `24087:10369` ·
Link `187:305` · Avatar `573:3623`.
(Icon `983:5876` is unpublishable — a plain frame, not a component set.)

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

## 3. Select — ui5-select (node 181557:7507)
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


## 4. SegmentedButton — ui5-segmented-button (node 91702:11986)

**Doesn't work:**

- segment `labels` — the item text ("Option 1"…) lives in Figma slots (⿻ Text Segments),
  which are light-DOM projection, not a readable property. So real labels can't be read →
  placeholders. (Different from the icon issue: this is slotted content, not instance-swap.)
- selected `segment` — which segment is pressed isn't exposed as a readable prop at all, so I
  just mark item 1 selected as a stand-in — it won't match the actually-selected one in the
  design.


## 5. Avatar — ui5-avatar (node 573:3623)
**Doesn't work:**
- `image` slot — slotted image, not readable.
- `badge` slot ← Badge boolean — presence only, not content.


