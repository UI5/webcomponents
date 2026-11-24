# Tooltip

`ui5-tooltip` shows a short, non-interactive text near an element. The element it
describes points at the tooltip; the tooltip owns the visual and the accessible
description.

## API at a glance

Three parts:

| Part | On | Purpose |
|---|---|---|
| `data-ui5-has-tooltip="<id>"` | the opener | marks the trigger, drives the gestures |
| `aria-describedby="<id>"` | the opener | author-owned accessible description link |
| `<ui5-tooltip id="<id>">text</ui5-tooltip>` | standalone | holds the text (light-DOM child), renders the popover, is the describedby target |

```html
<button data-ui5-has-tooltip="t1" aria-describedby="t1">Save</button>
<ui5-tooltip id="t1">Save the document</ui5-tooltip>
```

Being plain attributes, this works in React, any framework, and plain HTML. The
association is a **string id** — there is no `HTMLElement`/`opener` form (an
attribute is a string, and `aria-describedby` is itself a string IDREF).

For app developers consuming a UI5 component, the component wires all three parts
internally and exposes a simple property:

```html
<ui5-button tooltip="Save the document">Save</ui5-button>
```

### `<ui5-tooltip>` surface

| Member | Kind | Default | Notes |
|---|---|---|---|
| child text | light DOM | — | the text and the `aria-describedby` source (text only) |
| `placement` | property | `Top` | `Top` / `Bottom` / `Left` / `Right` |
| `horizontalAlign` | property | `Center` | popover horizontal alignment |
| `delay` | property (Number) | `500` | ms before open/close on hover & focus; touch/Escape act immediately |
| `openTooltip()` / `closeTooltip()` / `isOpen()` | methods | — | imperative control |

Opens on hover, keyboard focus and long-press; closes on Escape, activation, or
when the pointer/focus leaves.

## How it works

- **Opener-centric.** The opener names the tooltip; the tooltip carries no opener
  reference. Nothing to observe on the opener, nothing to tear down when it is
  removed → leak-proof.
- **One document-level listener set.** Attached when the first `<ui5-tooltip>`
  connects, detached when the last disconnects. Each event resolves the opener via
  `event.composedPath()` (so openers inside a component's shadow root are found)
  and drives the matching tooltip.
- **Accessibility.** `aria-describedby` on the opener references the
  `<ui5-tooltip>`; the screen reader reads the referenced node's accessible name as
  the description. The host reflects `role="tooltip"` and sets `aria-label` equal
  to its text (an explicit name is more reliable than relying on the clip-hidden
  text node — Chrome computed the description for a `<div tabindex=0>` opener but
  not a native `<button>` without it). The text node stays in the a11y tree
  (visually hidden via clip, not `display:none`) as a fallback.

### Double-announcement (review when migrating)

When a host already exposes the same text as its accessible name (icon-only
button, `ui5-icon`) or via `aria-description` (Button, Link, Switch), adding
`aria-describedby` to the same text double-announces it. Migrated components set
`data-ui5-has-tooltip` for the gesture but rely on the existing ARIA instead of
adding `aria-describedby`; each site carries a review comment. Decide per host.

### Native `title`

A raw native `title` an author writes on a UI5 host is left to the browser — not
hijacked or suppressed. Components expose their styled tooltip via the `tooltip`
property.

## Shipping in two stages

1. The `<ui5-tooltip>` primitive + `data-ui5-has-tooltip`, with its own test page.
2. Later: replace native `title` across components (the migration surface is in
   [`Tooltip-stats.md`](./Tooltip-stats.md)).

## Future development

A `slot="tooltip"` form (`<ui5-button><ui5-tooltip slot="tooltip">…</ui5-tooltip></ui5-button>`)
mirrors Vaadin and would let app developers attach a tooltip to any component
without a `tooltip` property. Deferred — it reintroduces a per-host association the
attribute model avoids.

---

## Why this design

Requirements: (1) framework-agnostic, (2) performant, (3) lifecycle-reliable
(never leaks or goes stale), (4) `aria-describedby`.

| Dimension | [A. data-attr](#a-data-attr--aria-describedby-chosen) **(chosen)** | [B. `opener`](#b-tooltip-opener) | [C. ref+helper](#c-ref--helper) | [D. prop spread](#d-prop-spread) | [E. wrapper](#e-wrapper) | [F. native `title`](#f-reuse-native-title) | [G. magic attr](#g-magic-attribute) |
|---|---|---|---|---|---|---|---|
| Plain HTML (1) | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Listeners (2) | delegated | per-opener | per-opener | per-opener | owned child | native | delegated+observed |
| Leak-proof (3) | ✅ | ⚠️ observer | ⚠️ wrong unmount | ✅ | ✅✅ | ✅ | ⚠️ observer |
| ARIA (4) | author-owned | manual | manual | via helper | cross-shadow | ⚠️ conflicts | hard pre-open |
| Rich content | later (slot) | later | ✅ | ✅ | ✅ | ❌ | ❌ |
| Layout impact | none | none | none | none | ❌ node | none | none |

### A. data-attr + aria-describedby (chosen)
Declarative attribute drives gestures via document delegation; `aria-describedby`
author-owned; light-DOM text is the description. **Pro:** plain HTML anywhere, no
opener listeners/lifecycle/observer, leak-proof. **Con:** new public attribute;
invoker→tooltip inversion; needs global document-level attachment (a correct,
cheaper-than-per-opener delegation trade).

### B. `<ui5-tooltip opener="id">`
Tooltip references its opener; listeners on the resolved opener. The previous
model. **Con:** needs a removal observer that is load-bearing for memory-safety —
misses ancestor-removal, reparent, cross-shadow → the leak returns. The reason for
the pivot to A.

### C. ref + helper
`ref={el => helper.attach(el)}`. **Con:** not usable from plain HTML; `ref(null)`
fires on template unmount, not opener removal.

### D. prop spread
`{...tooltipBindings({ text })}`. **Con:** not plain-HTML; loses attach-by-id;
opaque. Internal sugar only.

### E. wrapper
Tooltip wraps the trigger (Radix/MUI `asChild`, Shoelace). **Con:** extra DOM node;
single-child constraint; awkward across the UI5 shadow boundary; `display:contents`
has a11y-tree problems.

### F. reuse native `title`
Intercept `title`, suppress the native bubble, show a styled popover. **Con
(disqualifying):** the native bubble can't be reliably suppressed; string-only, no
styling/placement/delay; `title` already feeds the accessible name →
double-announce; ambiguous across the shadow boundary. Rejected.

### G. magic attribute (auto-attach, no component)
A single attribute the framework detects and auto-attaches a tooltip to, with no
authored `<ui5-tooltip>`. **Con:** needs a persistent cross-shadow-root
`MutationObserver` (edges back toward OpenUI5 `TooltipEnablement`); string-only; no
stable node to point `aria-describedby` at before open; no types/autocomplete.
**Verdict:** a good ergonomic layer *on top of* A for the plain-text case, not a
replacement — A keeps the attribute but pairs it with a real node, giving the
stable describedby target G lacks.

## Cross-framework reference

Two shapes dominate: **wrapper/text-prop** (Material UI, Ant Design — the tooltip
wraps the trigger, text is a prop) and **composition/slot** (React Aria,
shadcn/Radix, Vaadin — separate elements, structural association). Vaadin is the
closest peer: a real `<vaadin-tooltip>` in a `tooltip` slot with a `for`-by-id
association mirroring our attribute link. Design points adopted: text-only content,
`placement` enum name, a single `delay`, `role="tooltip"` + description as the
correct default, and Vaadin's "blur closes immediately".

Sources: MUI `mui.com/material-ui/react-tooltip` · Ant `ant.design/components/tooltip`
· React Aria `react-aria.adobe.com/Tooltip` · shadcn
`ui.shadcn.com/docs/components/radix/tooltip` · Vaadin
`vaadin.com/docs/latest/components/tooltip`.

## React prop-getter layer (detail of A, not exported)

For React consumers the same contract can be a hook composing trigger props
(`onMouseEnter`/`Leave`/`onFocus`/`Blur`) and merging `aria-describedby` (split,
dedupe) with the tooltip id, plus a tooltip component owning the popover; hover and
focus tracked separately so leaving a focused trigger does not close it. A
consumer-side convenience over the same model — a design detail, not shipped API.

## Statistics

See [`Tooltip-stats.md`](./Tooltip-stats.md) — components with a public `tooltip`
property, components using native `title`, and the interactive/non-interactive
split (the stage-2 migration surface).
