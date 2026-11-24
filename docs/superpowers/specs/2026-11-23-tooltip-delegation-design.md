# Tooltip — `data-ui5-has-tooltip` + `aria-describedby` + `<ui5-tooltip>`

Date: 2026-11-23
Supersedes: `2026-10-30-enhanced-tooltip-design.md` (the `opener`-based model).

## Overview

A framework-agnostic tooltip built from three parts:

1. **`data-ui5-has-tooltip="<id>"`** on the opener — a plain attribute that marks
   an element as a tooltip trigger and names its tooltip. Being an attribute, it
   works in React, any framework, and plain HTML.
2. **`aria-describedby="<id>"`** on the opener — author-owned (not auto-assigned),
   so the runtime stays observer-free.
3. **`<ui5-tooltip id="<id>">text</ui5-tooltip>`** — owns the popover visual and
   is itself the `aria-describedby` target. Its light-DOM text is the accessible
   description; its host carries `role="tooltip"` via `ElementInternals`.

```html
<button data-ui5-has-tooltip="t1" aria-describedby="t1">Save</button>
<ui5-tooltip id="t1">Save the document</ui5-tooltip>
```

For app developers consuming a UI5 component, the component wires all three
internally and exposes a simple property:

```html
<ui5-button tooltip="Save the document">Save</ui5-button>
```

## Architecture

### Opener-centric, not tooltip-centric

The association flows from opener to tooltip: the opener names its tooltip via
`data-ui5-has-tooltip`. The tooltip does **not** carry an `opener` reference.
This inversion is what makes the runtime leak-proof — there is nothing to observe
on the opener and nothing to tear down when it is removed.

### Document-level gesture delegation (singleton)

One set of delegated listeners lives on `document`
(`mouseover`/`mouseout`/`focusin`/`focusout`/`keydown`/`touchstart`/`touchend`).

- Attached when the **first** `<ui5-tooltip>` connects to the DOM.
- Detached when the **last** `<ui5-tooltip>` disconnects.

On each event, the delegation walks from `event.target` up the composed tree
(crossing shadow boundaries) to the nearest `[data-ui5-has-tooltip]`, resolves the
matching `<ui5-tooltip>` by id within the opener's root, and drives open/close.

The walk uses `event.composedPath()`, not `event.target`: a document-level
listener sees `event.target` retargeted to the outermost shadow host, so an opener
that lives *inside* a component's shadow root (the common internal-usage case,
e.g. the Button's root `<button>`) is only reachable through `composedPath()`,
which spans every shadow boundary.

Because gestures are delegated, removing an opener is a non-event: no per-opener
listener exists to leak, no `MutationObserver` runs. This is the central
difference from the `opener`-based model, which needed a removal observer that was
load-bearing for memory-safety.

### Accessibility — light-DOM text, author-owned link

- The tooltip's **child text** is the content. `aria-describedby` on the opener
  references the `<ui5-tooltip>`; the screen reader reads the referenced element's
  accessible name as the opener's description.
- The host sets `role="tooltip"` as a **reflected attribute** (SSR-safe). An
  earlier draft set it through `ElementInternals.role`, but that only sets the
  default AX role — it is not a queryable `role` attribute, is overridable, and is
  invisible to ARIA tooling and tests. Reflecting a real attribute matches the
  repo convention (e.g. Avatar) and is robustly testable.
- The host also sets `aria-label` equal to its text content. Browser evidence
  showed that relying on the clip-hidden text *node* to feed the description was
  **inconsistent** — in Chrome a `<div tabindex=0>` opener resolved the description
  but a native `<button>` opener did not. An explicit `aria-label` gives the
  referenced `role="tooltip"` node a stable accessible **name**, which
  `aria-describedby` reads as the description; with it, both opener kinds compute
  the description reliably. (This is the robustness OpenUI5 got from an
  invisible-anchor span, achieved here without the extra node.)
- The visible popover renders the host's `textContent` directly (text-only content
  model), rather than chaining a `<slot>` through the inner `<ui5-popover>`'s own
  slot. This keeps the render simple and the text reliably present; the trade-off
  is that text is read at render time (static text — the documented 90% case).
- The light-DOM text is visually hidden with the **sr-only / clip** pattern, not
  `display:none`. `display:none` on the host would hide its entire shadow subtree
  too — including the popover — so the visual tooltip would never appear (verified
  in-browser). The clip pattern hides only the inline text while leaving the host
  rendered so its shadow popover can open. (The host's `aria-label` carries the
  description regardless; `aria-describedby` even resolves hidden referenced
  elements, so a11y does not depend on this choice — the popover's visibility
  does.)
- ARIA is **author-owned**: the author writes `aria-describedby` once in markup.
  Auto-assigning it would force observing the opener before any gesture — the
  observer-free design deliberately leaves this to the author.

### Content model

Text only. `<ui5-tooltip>plain string</ui5-tooltip>`. No `text` property; rich
content is out of scope (documented limitation, same as native `title`).

## Public API — `<ui5-tooltip>`

| Member | Kind | Default | Notes |
|---|---|---|---|
| child text | light DOM | — | the tooltip text and the `aria-describedby` source |
| `placement` | property | `Top` | `Top`/`Bottom`/`Left`/`Right` |
| `horizontalAlign` | property | `Center` | popover horizontal alignment |
| `delay` | property (Number) | `500` | ms before open/close on hover & focus; touch/Escape act immediately |
| `openTooltip()` | method | — | opens against the resolved opener |
| `closeTooltip()` | method | — | closes |
| `isOpen()` | method | — | current open state |

**Removed vs. the old model:** the `text` property and the `opener` property.

The opener is resolved by querying the tooltip's own root node
(`getRootNode().querySelector('[data-ui5-has-tooltip="<id>"]')`), so an id
reference resolves within the same shadow root or document — matching
`aria-describedby` IDREF scoping (same tree).

### Id-only association (no `HTMLElement` form)

The association is a **string id only**; there is no live-`HTMLElement` opener
form. Two reasons:

- `data-ui5-has-tooltip` is a DOM attribute, and attributes are strings — an
  element reference cannot be serialized into one. (The old `opener` accepted
  `HTMLElement | string` only because it was a JS property with a converter, not
  an attribute.)
- The reference now flows opener → tooltip, authored on the opener element
  itself, so the React "I have a ref but no id on first render" pitfall that
  motivated the `HTMLElement` form no longer exists. The id is required regardless,
  since `aria-describedby` is itself a string IDREF with no element-ref form.

A JS-only element escape-hatch (e.g. an `openerElement` property) is deliberately
**not** added — it would reintroduce a second association lifecycle, the exact cost
the attribute model removes. Revisit only if a concrete need for id-less openers
appears.

## Internal component usage

Components wire the three parts inside their own shadow template and keep their
public `tooltip` property:

```tsx
<button
  data-ui5-has-tooltip={`${this._id}-tooltip`}
  aria-describedby={`${this._id}-tooltip`}
  ... />
{this.buttonTitle &&
  <Tooltip id={`${this._id}-tooltip`}>{this.buttonTitle}</Tooltip>}
```

### Double-announcement note (review-required)

When a host already exposes its text as an accessible name (icon-only button,
`ui5-icon`), adding `aria-describedby` pointing at the same text makes a screen
reader announce it twice. Each migration site carries a code comment flagging this
for review, and components that already guard against it (e.g. Button's
`ariaLabelText !== buttonTitle` check) keep that guard. Not enforced globally —
flagged for per-component review.

### Native `title` decision

A raw native `title` an author writes on a UI5 host (`<ui5-button title="x">`) is
left to the browser — the framework does not hijack or suppress it. UI5 components
expose their own styled tooltip via the `tooltip` property; the native `title`
remains the author's own and shows the native browser bubble. Documented, not
enforced.

## Shipping in two stages

1. **Stage 1 (this surface):** the `<ui5-tooltip>` primitive + `data-ui5-has-tooltip`
   delegation, with its own standalone test page.
2. **Stage 2 (later):** replace native `title` across all components.

Both are implemented on this branch for testing but can be split into two
submissions.

## Future development

A `slot="tooltip"` form — `<ui5-button><ui5-tooltip slot="tooltip">…</ui5-tooltip></ui5-button>`
— mirrors Vaadin's slot model and would let app developers attach a tooltip to any
component without a `tooltip` property. Deferred: it reintroduces a per-host
association and slot plumbing that the attribute model avoids. Captured as a future
option, not in scope now.

---

# Why this decision

## Comparison

Requirements: (1) framework-agnostic, (2) performant, (3) lifecycle-reliable
(never leaks or goes stale), (4) `aria-describedby`.

| Dimension | [A. data-attr + aria-describedby](#a-data-ui5-has-tooltip--aria-describedby--ui5-tooltip-chosen) **(chosen)** | [B. tooltip `opener`](#b-ui5-tooltip-openerid) | [C. ref + helper](#c-ref--helper) | [D. prop spread](#d-prop-spread) | [E. wrapper](#e-wrapper-other-frameworks) | [F. reuse native `title`](#f-reuse-native-title) | [G. magic attribute](#g-magic-data-ui5-tooltip-attribute) |
|---|---|---|---|---|---|---|---|
| Plain HTML (req 1) | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Listener lifecycle (req 2) | delegated | per-opener | per-opener | per-opener | on owned child | native | delegated/observed |
| Leak-proof (req 3) | ✅ | ⚠️ needs observer | ⚠️ fires on wrong unmount | ✅ | ✅✅ | ✅ | ⚠️ needs observer |
| ARIA (req 4) | author-owned | manual | manual | via helper | manual; cross-shadow | ⚠️ conflicts | hard before open |
| Scoping-safe | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Fits repo pattern | ✅ | extends | ❌ | ◑ | ❌ | ◑ | ◑ |
| Rich content | later (slot) | later | ✅ | ✅ | ✅ | ❌ string only | ❌ string only |
| Layout impact | none | none | none | none | ❌ extra node | none | none |
| Public surface | new attr + component | new component | helper | helper | new component | none | new attribute |

## Per-option

### A. `data-ui5-has-tooltip` + `aria-describedby` + `<ui5-tooltip>` (chosen)
Declarative attribute drives gestures via document delegation; `aria-describedby`
author-owned; the `<ui5-tooltip>` host carries `role="tooltip"` and its light-DOM
text is the description.
- **Pro:** plain HTML in any framework; no opener listeners or lifecycle; no
  observer; leak-proof by construction.
- **Con:** new public attribute; invoker→tooltip inversion; needs global
  document-level event attachment (a correct delegation trade, cheaper than
  per-opener listeners); more markup for consumers.

### B. `<ui5-tooltip opener="id">`
Tooltip references its opener by id; listeners live on the resolved opener. The
previous model on this branch.
- **Pro:** familiar tooltip-centric API; renders in place.
- **Con:** needs a removal observer that is load-bearing for memory-safety —
  misses ancestor-removal, reparent, cross-shadow → the leak returns. This is the
  concrete reason for the pivot to A.

### C. ref + helper
`ref={(el) => helper.attach(el)}`.
- **Pro:** real element; scoping-safe.
- **Con:** not usable from plain HTML; `ref(null)` fires on template unmount, not
  opener removal → misses the public case.

### D. prop spread
`{...tooltipBindings({ text })}` → handlers inline on the opener. See the
factory/React-hook sketch below.
- **Pro:** handlers die with the node; no lookup.
- **Con:** not usable from plain HTML; loses attach-by-id; opaque. Internal sugar
  only.

### E. wrapper (other frameworks)
Tooltip contains the trigger as a slotted child. Dominant in React (Radix/MUI via
`asChild`), present in web components (Shoelace). `asChild` is unavailable to us →
a forced real wrapper node.
- **Pro:** strongest lifecycle safety (shared subtree); co-located.
- **Con:** changes the DOM (extra wrapper node); single-child constraint;
  disabled-element gotcha; awkward across the UI5 shadow boundary. `display:contents`
  has a11y-tree and version-sensitivity problems.

### F. reuse native `title` (replace on hover)
Intercept the element's `title`, suppress the native bubble, show a styled popover
with the same text.
- **Pro:** zero new API; automatic migration of existing `title="…"`.
- **Con (disqualifying):** the native tooltip can't be reliably suppressed
  (removing/restoring `title` on hover is racy); string-only, no styling/placement/
  delay; `title` already feeds the accessible name, so shadowing it with our own
  `aria-describedby` risks double-announcement; ambiguous across the shadow
  boundary (host `title` vs. inner `title`). Rejected — the classic approach every
  mature library abandoned.

### G. magic `data-ui5-tooltip` attribute (auto-attach, no component)
A single attribute on any element that the framework detects and auto-attaches an
enhanced tooltip to, with no authored `<ui5-tooltip>`.
- **Pro:** minimal call site; works on any element including sub-elements of other
  components; survives scoping; a codemod could rewrite `title`.
- **Con:** needs a persistent, cross-shadow-root `MutationObserver` to detect
  added/removed/changed attributes — new infrastructure that edges back toward the
  OpenUI5 `TooltipEnablement` machinery; string-only; implicit lifetime/ownership;
  a11y wiring is hard because there is no rendered node with a stable id to point
  `aria-describedby` at before open; no TypeScript types / IDE autocomplete /
  API-reference entry.
- **Verdict:** a good *ergonomic layer* on top of A for the plain-text case, not a
  replacement. The chosen model A keeps the attribute (`data-ui5-has-tooltip`) but
  pairs it with a real `<ui5-tooltip>` node, which gives the stable describedby
  target G lacks. A pure-G sugar layer can be evaluated later, reusing
  `F6Navigation`'s shadow-root walk helpers.

## Cross-framework survey (reference)

Two API shapes dominate. **Wrapper / text-prop** (Material UI, Ant Design): the
tooltip wraps the trigger and carries text as a prop. **Composition / slot** (React
Aria, shadcn/Radix, Vaadin): trigger and tooltip are separate, associated
structurally. Vaadin is the closest peer — a web-component library using a real
`<vaadin-tooltip>` in a `tooltip` slot, with a `for`-by-id association that mirrors
our attribute link.

| Framework | Shape | Text via | Placement | Delays | Controlled | A11y note |
|---|---|---|---|---|---|---|
| Material UI | wrapper | `title` (node) | `placement` (14) | enter/leave, touch | `open`/`onOpen`/`onClose` | `describeChild` toggles label↔description |
| Ant Design | wrapper | `title` (node/fn) | `placement` (12) | mouseEnter/Leave | `open`/`onOpenChange` | `trigger` enum |
| React Aria | composition | children | `placement` (6) | `delay` + warmup/cooldown | `isOpen`/`onOpenChange` | role=tooltip; strongest |
| shadcn/Radix | composition + provider | children | `side` | provider delay/skipDelay | `open`/`onOpenChange` | Radix a11y built-in |
| Vaadin | **slot (web component)** | `text` attr | `position` | hover/focus/hide + static globals | `manual` + `opened` | blur closes instantly |

Takeaways baked into this design: text-only content (string) matches the 90% case;
`placement` is the standard enum name; a single `delay` is enough to start (show/
hide split can come later); `role="tooltip"` + description is the mainstream correct
default; "blur closes immediately" (Vaadin) is worth adopting.

Sources: Material UI `mui.com/material-ui/react-tooltip` · Ant Design
`ant.design/components/tooltip` · React Aria `react-aria.adobe.com/Tooltip` ·
shadcn/ui `ui.shadcn.com/docs/components/radix/tooltip` · Vaadin
`vaadin.com/docs/latest/components/tooltip`.

## Prop-getter / React-hook sketch (detail of A, not an exported API)

For React consumers, the same contract can be expressed as a hook that composes
trigger props (`onMouseEnter`/`onMouseLeave`/`onFocus`/`onBlur`) and merges
`aria-describedby` (split on whitespace, dedupe) with the tooltip id, plus a
tooltip component that owns the popover. Hover and focus are tracked separately so
leaving a focused trigger does not close its tooltip. The hidden description span
keeps the text in the accessible tree while the popover is closed. This is a
consumer-side convenience layer over the same attribute/ARIA model — recorded as a
design detail, not part of the shipped public API.

## Statistics

See `docs/internal/Tooltip-stats.md` for the inventory of components with a public
`tooltip` property, components using native `title`, and their interactive vs.
non-interactive classification — the migration surface for stage 2.
