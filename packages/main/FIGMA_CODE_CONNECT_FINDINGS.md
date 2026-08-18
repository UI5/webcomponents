# Figma Code Connect — what doesn't work / what's assumed

## How to connect a component (setup + runbook)

**Figma file:** SAP Web UI Kit — fileKey `SILcWzK5uFghKun9jx6D7c`.
**Everything below runs from `packages/main`.**

### One-time setup

**1. Clone the repo and install** (from the repo root):
```
git clone https://github.com/UI5/webcomponents.git
cd webcomponents
yarn                       # installs all workspace deps
```
> On the branch that carries this Code Connect work, `@figma/code-connect` and the
> config files are already present (skip steps 2–3). On a clean `main` checkout
> they are **not** — do steps 2–3 first.

**2. Add the Code Connect dependency** to `packages/main` (only if not already there):
```
cd packages/main
yarn add -D @figma/code-connect        # this repo uses ^1.4.9
```

**3. Create the two config files** in `packages/main`, one per label:

`figma.config.json` (Web Components):
```jsonc
{ "codeConnect": {
    "include": ["src/**/*.figma.ts"], "exclude": ["node_modules/**", "dist/**"],
    "parser": "html", "label": "Web Components" } }
```
`figma.config.react.json` (React):
```jsonc
{ "codeConnect": {
    "include": ["src/**/*.figma.tsx"], "exclude": ["node_modules/**", "dist/**"],
    "parser": "react", "label": "React" } }
```

**4. Generate a Figma token:** figma.com → **profile → Settings → Security →
Personal access tokens → Generate**. Scope: file content read/write for Code
Connect. Keep it out of git; pass it inline (`FIGMA_ACCESS_TOKEN=…`) or export it.

### Per component

**5. Create the two mapping files** in `packages/main/src/`:
- `src/<Name>.figma.ts` (Web Components) and `src/<Name>.figma.tsx` (React) —
  each a single `figma.connect(<node-url>, { props, example })`.
- Get the node id from the Figma URL (`?node-id=1-2` → `1:2`). To scaffold a
  starter pre-filled with the node's readable props:
  ```
  FIGMA_ACCESS_TOKEN=<token> npx figma connect create "<node-url>" --outDir /tmp/cc
  ```

**6. Dry-run** (no token — catches parser errors):
```
npx figma connect publish --dry-run -c figma.config.json
npx figma connect publish --dry-run -c figma.config.react.json
```

**7. Publish** (needs the token; run from `packages/main`):
```
FIGMA_ACCESS_TOKEN=<token> npx figma connect publish -c figma.config.json --force
FIGMA_ACCESS_TOKEN=<token> npx figma connect publish -c figma.config.react.json --force
```
- `--force` overwrites any pre-existing (UI-created) mapping on the node.
- ⚠️ MUST run from `packages/main` — from the repo root the CLI can't find the
  config and silently falls back to the html parser. Always confirm the output
  says `Using label "React"` (not "Web Components") for the React publish.

**8. Verify in Figma Dev Mode** — parsing/upload success ≠ correct output. Open
the node, check the real snippet under each framework label.

**Connected so far (11, both WC + React):**
Button `91702:11733` · Input `148569:1004` · CheckBox `154589:905` ·
RadioButton `154597:1967` · StepInput `148569:1727` · MessageStrip `910:2517` ·
Select `181557:7507` · SegmentedButton `91702:11986` · Switch `24087:10369` ·
Link `187:305` · Avatar `573:3623`.
(Icon `983:5876` is unpublishable — a plain frame, not a component set.)

## ⚠️ Global: reading the swapped icon (nuanced — tested)
In Figma an icon is an **INSTANCE_SWAP** property — the designer swaps in an icon
*component* from the library. What Code Connect can and can't do with it:

- **As a name STRING → NO.** `figma.string`/`figma.enum` cannot read which
  component was swapped in. So attribute-style icons (`icon="globe"`, `endIcon=`,
  `fallback-icon=`) can't be made dynamic this way and stay **hardcoded**
  placeholders (`"globe"`, `"inspect"`, `"home"`, `"employee"`); consumer edits.
- **As an ELEMENT via `figma.instance()` → YES, conditionally.** If the icon
  library is **Code-Connected** (each icon emits `<ui5-icon name="…">`) AND the
  host's icon instance carries a `mainComponent` link, `figma.instance("Icon")`
  resolves the **selected** icon's element. **Tested:** ✅ worked on Button
  (`<ui5-icon name="globe">` resolved); ❌ empty on MessageStrip (its instance
  had no `mainComponent` link). Only fits **slot/child** placements — its output
  is an element, not a bare string, so it still can't feed an `icon=` attribute.

**Owner fixes:** (a) add an `Icon Name` **text property** alongside the swap →
`figma.string` reads it → works for the attribute cases; (b) **Code-Connect the
icon library** (generated, ~1400 entries) → `figma.instance` resolves the
element for slot cases on link-carrying hosts.


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


