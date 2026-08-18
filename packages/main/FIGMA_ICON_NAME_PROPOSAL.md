# Proposal: make icon names readable in Code Connect (SAP Web UI Kit)

**Audience:** SAP Web UI Kit Figma owners + webcomponents/tooling team
**File:** SAP Web UI Kit, `SILcWzK5uFghKun9jx6D7c`
**Date:** 2026-08-13

## The problem

Several components' Code Connect mappings (Button, Link, StepInput, Avatar,
SegmentedButton, MessageStrip) can detect that an icon is **present** — and often
**where** it sits (Link's Icon Position, Avatar's Type=Icon) — but they **cannot
emit which icon it is**. Every `icon=` / `endIcon=` / `fallback-icon=` in the
generated snippets is a **hardcoded placeholder** (`"globe"`, `"inspect"`,
`"home"`, `"employee"`, `"information"`) that the consumer must edit by hand.

### Why (root cause)

In Figma an icon is an **INSTANCE_SWAP** property — the designer swaps in an icon
*component* from the icon library. Code Connect's mapping primitives are:

`figma.string` (reads a **text** property) · `figma.boolean` · `figma.enum`
(fixed lookup over known variant options) · `figma.instance` · `figma.children`
· `figma.textContent` · `figma.nestedProps`.

**None of them return "the name of the component currently swapped into an
instance-swap slot" as a string.** The name is visible in Figma's UI and exists
as instance metadata (`mainComponentName`), but it is not exposed to the mapping
author through any `figma.*` call. `figma.string` only reads text fields, and the
icon is not a text field. So the mapping can toggle the attribute on/off but must
hardcode the value.

## Two fixes (complementary)

### Option A — add an `Icon Name` text property  → **Figma owner, quick win**

On each component that has an icon instance-swap, add a plain **text property**
(e.g. `Icon Name`) holding the icon's registry name. The mapping then reads it:

```ts
icon: figma.string("Icon Name")   // → icon="employee" dynamically
```

- **Pro:** trivial, pure Figma-side, unlocks dynamic icon names immediately.
- **Con:** duplicated data — the designer must keep the typed name in sync with
  the icon actually swapped in, so it can drift.

### Option B — Code-Connect the icon library  → **webcomponents/tooling team, durable**

Give **each icon component** in the kit its own tiny Code Connect entry whose only
output is its own registry name. Then, on any host component:

```ts
icon: figma.instance("Icon")   // resolves to the SELECTED icon's name
```

because `figma.instance` resolves a swapped instance **through that instance's own
Code Connect entry**.

- **This is generated, not hand-written.** The kit already names each icon
  instance by its icon (`mainComponentName: "information"`), and the icons package
  already has the full name registry. A script iterates the icon set and emits one
  `figma.connect()` per icon (each outputting its name), using the icon library's
  Figma node IDs (from the Figma API).
- **Pro:** correct forever, zero designer effort, no drift.
- **Con:** ~1400 published connections (one-time), needs the icon library node IDs,
  re-run the generator when the icon set changes.

**Can we drive this from our own `@ui5/webcomponents-icons` package?** Yes — that
package is the source of truth for icon names, so it's the natural input to the
generator in Option B. The only Figma-side dependency is the mapping from each
icon name to its Figma component node ID, which the Figma API provides.

## Recommendation

- **Option A now** — one text property per component, immediate dynamic icons.
- **Option B as the durable solution** — generated from `@ui5/webcomponents-icons`,
  owned by the webcomponents team, no drift.

Until either lands, icon **presence/position** is mapped but the **name** is a
placeholder the consumer edits.

## Same class of issue (for context)

The badge **count** on Button (`text="72"`) is hardcoded for the same reason — it
lives in an unexposed nested layer, not a readable property. Exposing it as a
`Badge Count` text property (like Option A) would make it dynamic too.
