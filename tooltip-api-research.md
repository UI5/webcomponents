# Tooltip API Research

Research supporting the `ui5-tooltip` design. Two parts:

1. **Cross-framework API survey** — how Material UI, Ant Design, React Aria, shadcn/ui and Vaadin expose tooltips.
2. **Single-property vs. separate-component analysis** — can we get the same effect from one `title`-like property instead of a `<ui5-tooltip>` component?

---

## Part 1 — Cross-framework API survey

Two broad API shapes emerge:

- **Wrapper / text-prop** (MUI, Ant Design) — the tooltip *wraps* the trigger and carries the text as a prop.
- **Composition / slot** (React Aria, shadcn/Radix, Vaadin) — trigger and tooltip are separate elements composed together; the association is structural (parent/child or a slot), not a prop.

Vaadin is the most relevant comparison for us: it's a web-component library and uses the **slot** model, which is exactly the direction the current `ui5-tooltip` spec takes.

### Material UI (React) — wrapper + `title` prop

Tooltip wraps its single child; the child is the trigger. Text lives in `title` (a `node`, so it can be rich).

```tsx
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

<Tooltip title="Delete" placement="top" arrow enterDelay={100} leaveDelay={0}>
  <Button>Delete</Button>
</Tooltip>

// Controlled
<Tooltip title="Add" open={open} onOpen={handleOpen} onClose={handleClose}>
  <Button>Controlled</Button>
</Tooltip>
```

Key props: `title`, `placement` (14 values incl. `-start`/`-end`), `arrow`, `open`/`onOpen`/`onClose` (controlled), `enterDelay`/`leaveDelay`/`enterTouchDelay`, `disableHoverListener`/`disableFocusListener`/`disableTouchListener`, `followCursor`, `describeChild` (switches aria from label → description).

Notable: `describeChild` explicitly toggles `aria-label` vs `aria-describedby` semantics — a design point we care about (our spec wants `aria-describedby`).

### Ant Design (React) — wrapper + `title` prop

Same wrapper shape as MUI.

```tsx
import { Tooltip } from 'antd';

<Tooltip title="prompt text" placement="topLeft" arrow={{ pointAtCenter: true }}>
  <Button>TL</Button>
</Tooltip>

// Hover/focus/click triggers, controlled open
<Tooltip title="text" trigger="click" open={open} onOpenChange={setOpen}>
  <span>…</span>
</Tooltip>
```

Key props: `title` (`ReactNode | () => ReactNode`), `placement` (12 values), `arrow` (`boolean | { pointAtCenter }`), `trigger` (`hover | focus | click | contextMenu`), `open`/`onOpenChange`, `color`, `mouseEnterDelay`/`mouseLeaveDelay`, `getPopupContainer` (portal target).

Notable: `trigger` is a single enum rather than three `disable*` flags — cleaner than MUI for the same capability.

### React Aria (React) — composition, accessibility-first

Trigger and tooltip are siblings inside a `TooltipTrigger`. Behavior config lives on the trigger; text is the tooltip's children.

```tsx
import { TooltipTrigger } from 'react-aria-components';
import { Tooltip } from 'vanilla-starter/Tooltip';
import { Button } from 'vanilla-starter/Button';

<TooltipTrigger delay={1500} trigger="focus" placement="top">
  <Button aria-label="Edit"><Edit /></Button>
  <Tooltip>Edit</Tooltip>
</TooltipTrigger>
```

Key props (on `TooltipTrigger`): `delay`, `trigger` (`"focus"` to restrict; default both focus+hover), `placement` (`top|bottom|left|right|start|end`), `isOpen`/`defaultOpen`/`onOpenChange`, `isDisabled`, `shouldFlip`, `crossOffset`, `containerPadding`.

Notable: explicit **warmup/cooldown** model — first tooltip waits `delay`, subsequent ones show instantly until a cooldown elapses. Strong, documented accessibility semantics.

### shadcn/ui (React, Radix primitives) — composition + provider

Most verbose. Four parts: a `TooltipProvider` at the app root, then `Tooltip` / `TooltipTrigger` / `TooltipContent`.

```tsx
// Root layout (once)
<TooltipProvider><App /></TooltipProvider>

// Usage
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>
```

Key points: `TooltipProvider` shares delay/skip-delay config across all tooltips; `TooltipTrigger asChild` merges behavior onto your own element instead of rendering an extra one; `TooltipContent side` sets placement. Content is arbitrary JSX.

Notable: `asChild` is the React equivalent of "attach the tooltip to an existing element rather than a wrapper" — conceptually the same intent as our `opener`.

### Vaadin (web components) — slot-based, closest to UI5

The tooltip is a real custom element placed in a `tooltip` **slot** of the target. Text is the `text` attribute; position is `position`.

```html
<!-- Slotted into the target component -->
<vaadin-side-nav-item path="/dashboard">
  <vaadin-icon icon="vaadin:dashboard" slot="prefix"></vaadin-icon>
  <vaadin-tooltip slot="tooltip" text="Dashboard" position="end"></vaadin-tooltip>
</vaadin-side-nav-item>

<!-- Standalone with per-instance delay -->
<vaadin-button>
  Click me
  <vaadin-tooltip slot="tooltip" text="Home" .hoverDelay=${500}></vaadin-tooltip>
</vaadin-button>

<!-- Manual control -->
<vaadin-tooltip slot="tooltip" text="…" manual .opened=${opened}></vaadin-tooltip>
```

```ts
// Global delay configuration (static)
Tooltip.setDefaultFocusDelay(2000);
Tooltip.setDefaultHoverDelay(1000);
Tooltip.setDefaultHideDelay(1000);
```

Key API: `text`, `position`, `hoverDelay`/`focusDelay`/`hideDelay` (+ global static setters), `manual` + `opened` (controlled), `for` (associate with a target by id when not slotting). Container components (MenuBar, ContextMenu, Grid) take tooltip text via their items model and reuse one slotted `<vaadin-tooltip>` as a template.

Notable: **focus closes immediately on blur** by design (no hide delay on blur) to avoid confusion when moving focus — a concrete interaction detail worth copying. `for`-by-id mirrors our `opener` property.

### Comparison table

| Framework | Shape | Text via | Placement prop | Delays | Controlled | Trigger config | A11y note |
|-----------|-------|----------|----------------|--------|------------|----------------|-----------|
| Material UI | wrapper | `title` (node) | `placement` (14) | `enter/leaveDelay`, `enterTouchDelay` | `open`/`onOpen`/`onClose` | 3× `disable*Listener` | `describeChild` label↔description |
| Ant Design | wrapper | `title` (node/fn) | `placement` (12) | `mouseEnter/LeaveDelay` | `open`/`onOpenChange` | `trigger` enum | — |
| React Aria | composition | children | `placement` (6) | `delay` + warmup/cooldown | `isOpen`/`onOpenChange` | `trigger="focus"` | strongest; role=tooltip |
| shadcn/Radix | composition + provider | children | `side` | provider `delayDuration`/`skipDelayDuration` | `open`/`onOpenChange` | — | Radix a11y built-in |
| Vaadin | **slot (web component)** | `text` attr | `position` | `hover/focus/hideDelay` + static globals | `manual` + `opened` | — | blur closes instantly |

### Takeaways for `ui5-tooltip`

- The **slot/association model (Vaadin)** fits web components and matches the current spec's `opener` approach. Wrapper models (MUI/Ant) are React-render idioms that don't map cleanly to slotted custom elements.
- **Naming:** `text` (Vaadin/our current) over `title` (avoids clash with the native `title` attribute). `placement` (our current, MUI/Ant) is a fine enum name; Vaadin's `position` is a synonym.
- **Delays:** everyone separates show vs. hide. Our single `delay` is simpler; consider whether hide needs its own value later. Vaadin's "blur closes immediately" is worth adopting.
- **Controlled API:** every library offers one. Our `openTooltip()`/`closeTooltip()`/`isOpen()` cover it imperatively; a `manual`/`open` property (Vaadin style) would be the declarative equivalent if needed.
- **Accessibility:** React Aria and MUI's `describeChild` confirm the label-vs-description distinction. Our spec's choice of `role="tooltip"` + `aria-describedby` is the mainstream, correct default.

---

## Part 2 — Single property vs. separate component

> *"Can we use a single property, similar to native HTML `title`, for the same effect instead of a separate component? Or reuse `title` itself, replacing it on hover?"*

### Option A — reuse the native `title` attribute (replace on hover)

Intercept the element's `title`, suppress the native tooltip, and show our styled popover with the same text.

**Pros**

- Zero new API; works on any element including plain HTML.
- Automatic migration — existing `title="…"` upgrades for free.

**Cons (disqualifying)**

- **Can't reliably suppress the native tooltip.** Removing `title` on `mouseenter` to stop the browser bubble, then restoring it, is racy and fragile; the native tooltip is not cancelable by standard means.
- **Rich content impossible.** `title` is a plain string — no formatting, no `horizontalAlign`, nothing structured.
- **No styling, placement, or delay control** over the native rendering; the whole point is a Fiori-styled popover.
- **Accessibility conflict.** `title` already contributes to the accessible name/description; shadowing it with our own `aria-describedby` risks double-announcement or mismatch in screen readers.
- **Shadow DOM boundary.** On a custom element, a `title` on `<ui5-button>` and a `title` inside its shadow root behave differently; "the element's title" is ambiguous.

**Verdict:** rejected. Hijacking `title` is the classic approach every mature library abandoned precisely because the native tooltip can't be tamed.

### Option B — a magic `data-ui5-tooltip` attribute on any element (declarative hook)

Not a per-component property. A single **magic attribute** written on *any* element — the host root or an element deep inside another component's light/shadow DOM — that the framework detects and auto-attaches an enhanced tooltip to:

```html
<!-- On a host root -->
<ui5-button data-ui5-tooltip="Save the document">Save</ui5-button>

<!-- On an arbitrary element, e.g. a custom icon in a side navigation -->
<ui5-side-navigation-item text="Dashboard">
  <span data-ui5-tooltip="Open the dashboard" class="my-badge">3</span>
</ui5-side-navigation-item>

<!-- On a plain DOM element -->
<div data-ui5-tooltip="Drag to reorder">⠿</div>
```

The author never instantiates `<ui5-tooltip>`; the framework scans for `[data-ui5-tooltip]`, wires gestures, and shows the popover docked to that exact element.

**Pros**

- **Minimal call site** — one attribute, no `opener` id wiring, no extra element, no slot.
- **Works on any element**, including plain HTML and elements nested inside other components, exactly the side-nav-sub-element case raised. Targeting a sub-element is *trivial* (put the attribute on it) — the thing `opener` has to express indirectly.
- **Attribute-driven, so it survives scoping** (it's a `data-*` attribute, not a tag name) and reads naturally in markup.
- **Automatic migration path** — a codemod could rewrite `title="…"` → `data-ui5-tooltip="…"`.

**Cons / what it must solve**

- **Needs a global detection mechanism.** Something must observe the whole document (and shadow roots) for added/removed/changed `[data-ui5-tooltip]`. The framework has exactly one precedent for a document-wide attribute walk — `F6Navigation` reading `data-sap-ui-fastnavgroup` — but that reads on demand during keyboard nav, it does **not** run a persistent `MutationObserver` over arbitrary subtrees. A tooltip hook would need continuous observation, which is new infrastructure and a cross-shadow-root concern (observers don't pierce shadow boundaries; each root must be observed).
- **Attribute is string-only** — no rich/structured content. (Same limit as native `title`; acceptable for the 90% case, but it caps the feature.)
- **Lifetime/ownership is implicit.** With `<ui5-tooltip>` the tooltip is a real node with a clear lifecycle; with a magic attribute the framework owns a hidden singleton/pool and must garbage-collect gesture listeners when the attribute or its element goes away. This is precisely the `TooltipEnablement` bookkeeping the spec wanted to drop — a global attribute scanner reintroduces a version of it.
- **A11y wiring is harder.** `role="tooltip"` + `aria-describedby` needs a *rendered* tooltip node with a stable id referenced by the target. A lazily-created singleton has no stable per-target node to point at before open, which is the exact problem OpenUI5 solved with its invisible-tooltip anchor. The in-place `<ui5-tooltip>` avoids this; the magic attribute brings it back.
- **Discoverability / typing.** A `data-*` attribute has no TypeScript types, no IDE autocomplete, and won't appear in the component's API reference, unlike a real element with documented props.

**Verdict:** excellent **ergonomic layer** for the plain-text common case, but not the primitive. It should be implemented *on top of* `<ui5-tooltip>` (the attribute drives a shared tooltip instance), not as a replacement — otherwise it re-grows the global enablement/anchor machinery the component model removes. See "Does the framework already have magic properties?" below for why a global scanner is a bigger commitment than it looks.

### Option C — the `<ui5-tooltip>` component with an `opener` association (current direction)

```html
<ui5-button id="save">Save</ui5-button>
<ui5-tooltip opener="save" text="Save the document"></ui5-tooltip>
```

One component owns all behavior (gestures, delay, placement, a11y, popover reuse). Components consume it inside their own templates to upgrade their tooltips. This matches **Vaadin's slot model** and the spec.

**Pros**

- Single source of truth for behavior and styling; test once.
- `opener` can point at the host *or* an inner element (`by id within the same root, or a DOM reference` — already implemented via `DOMReferenceConverter`).
- Renders in place, so `aria-describedby` → `role="tooltip"` works directly (spec goal), no invisible-tooltip hack from OpenUI5.
- Rich content possible later via slot; `placement`/`horizontalAlign`/`delay` are first-class.

**Cons**

- Slightly more verbose at the call site than a bare property.
- Needs the `opener` association concept (already present in the framework and implemented here).

**Verdict:** recommended primitive. Aligns with the only peer web-component library (Vaadin) and with how UI5 Web Components already associate elements.

### Does the framework already have "magic" attributes? (precedents)

Yes — the magic-attribute pattern is established, but every existing use is either locally scoped or read on demand. None runs a persistent global scan + per-element behavior wiring, which is what Option B needs. The precedents, by mechanism:

| Attribute | Who reads it | Mechanism | Scope |
|-----------|-------------|-----------|-------|
| `data-sap-ui-fastnavgroup` / `-container` | `F6Navigation` | `getAttribute` / `.closest()` **on demand** during F6 keyboard nav | whole document, but only walked when the user presses F6 |
| `data-ui5-compact-size` | theming / CSS | presence selector → CSS density; set up at boot | subtree under the attributed element |
| `data-ui5-config` | `OpenUI5Support` / config | one-time read of a `<script>` tag at startup | single element |
| `data-ui5-versioning-button`, `data-ui5-index` | the owning component | `shadowRoot.querySelector("[data-ui5-...]")` | that component's **own** shadow root only |

Key reads:

- **`data-sap-ui-fastnavgroup` is the closest analogue** — a magic attribute on arbitrary descendants, read across shadow roots via `deepActive()` + `.closest()`. But it is **pull-based**: F6Navigation reads the DOM only at the moment of a keypress. A tooltip hook is **push-based** — it must *react* when an element with the attribute is hovered/focused/long-pressed, which means either continuous observation or attaching listeners to every matching element as it appears.
- **`data-ui5-config` and `data-ui5-compact-size`** are read once (boot / CSS), not continuously observed.
- **Component-local `data-ui5-*`** (versioning, index, wizard) never leaves the component's own shadow root — no global coordination at all.

So: the framework *endorses* `data-ui5-*` magic attributes, and `F6Navigation` even shows the cross-shadow-root DOM-walking helpers (`deepActive`, `getParentElement`) a tooltip scanner could reuse. What it has **no precedent for** is a long-lived document-wide `MutationObserver` that wires interaction behavior onto matched elements and tears it down again — that infrastructure would be new, and it's essentially a reinvention of OpenUI5's `TooltipEnablement`/`TooltipManager` that the spec set out to avoid.

### Recommendation

Keep `<ui5-tooltip>` + `opener` (Option C) as the **primitive** — it's the only model that supports styling, placement, rich content, sub-element targeting and clean `aria-describedby`, and it centralizes behavior instead of duplicating it per component.

Reject reusing native `title` (Option A) outright — the native tooltip can't be reliably suppressed and the string-only, unstyled, a11y-conflicting result defeats the purpose.

A **magic `data-ui5-tooltip` attribute (Option B)** is the right *ergonomic layer* for the plain-text common case, and it has clear framework precedent (`data-ui5-*`, `data-sap-ui-fastnavgroup`). Recommended **only as a thin layer over the component**: on detection, the hook docks a single shared `<ui5-tooltip>` to the matched element (sets its `opener` + `text`) rather than re-implementing gestures/a11y. Before committing to it, decide on the detection mechanism — the honest cost is a persistent, cross-shadow-root observer, which is new infrastructure and edges back toward the `TooltipEnablement` machinery the component model removes. A reasonable phasing:

1. Ship `<ui5-tooltip>` + `opener` now (done on this branch).
2. Upgrade `ui5-button` / `ui5-title` to consume it internally.
3. *Then* evaluate `data-ui5-tooltip` as sugar, reusing `F6Navigation`'s shadow-root walk helpers and a scoped observer — not a from-scratch global manager.

This mirrors Vaadin: a single `<vaadin-tooltip>` element does the work, while container components expose tooltip *text* through a lighter-weight hook on top.

---

### Sources

- Material UI Tooltip — https://mui.com/material-ui/react-tooltip / API https://mui.com/material-ui/api/tooltip
- Ant Design Tooltip — https://ant.design/components/tooltip
- React Aria Tooltip — https://react-aria.adobe.com/Tooltip
- shadcn/ui Tooltip — https://ui.shadcn.com/docs/components/radix/tooltip
- Vaadin Tooltip — https://vaadin.com/docs/latest/components/tooltip

<!--
Open decision (not yet resolved):
Before any Option B (data-ui5-tooltip) work, the detection mechanism is the real
cost center — a persistent, per-shadow-root MutationObserver vs. a lazier hook.
This should be a deliberate decision, not an accident, and is best prototyped
separately. Left out of scope until the <ui5-tooltip> component + Button/Title
upgrades land on this branch.
-->

