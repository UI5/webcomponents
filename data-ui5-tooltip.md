# `data-ui5-tooltip` — how the magic attribute works

Explainer for the sample `data-ui5-tooltip` mechanism
(`packages/main/src/samples/DataTooltip.ts`). It is a **proof-of-concept**, not
production framework infrastructure — see `tooltip-api-research.md` for the
trade-offs that gate turning it into a real feature.

## What it is

A declarative attribute that attaches the enhanced `<ui5-tooltip>` to an
element without the author instantiating a tooltip component or wiring an
`opener`. Put `data-ui5-tooltip="…"` on an element and a shared tooltip shows
that text on hover / focus / long-press.

```html
<span data-ui5-tooltip="Drag to reorder">⠿</span>
```

It is a **thin layer on top of** the `<ui5-tooltip>` component. The attribute
only decides *which* element and *what* text; all gesture, delay, placement and
accessibility behavior stays inside the component.

## Where it belongs: inside components, not on hosts

The attribute is a **component-internal** mechanism, not a host-level API.
Public components already expose a `tooltip` property (e.g. `ui5-button`), and
that property stays the author-facing API. Internally, the component writes
`data-ui5-tooltip` onto the same shadow-DOM element that previously carried the
native `title`:

```tsx
// ui5-button — internal button root, fed by the public `tooltip` property
<button class="ui5-button-root" data-ui5-tooltip={this.buttonTitle || undefined}>
```

```tsx
// ui5-title — root heading, only while the text is truncated
const tooltipText = this._truncatedText || undefined;
const tooltipAttrs = {
  "data-ui5-tooltip": tooltipText,
  "data-ui5-tooltip-align": tooltipText && "Start",
};
<h2 class="ui5-title-root" {...tooltipAttrs}>…</h2>
```

So the author never sees the attribute — they set `tooltip="…"` on the button,
or simply let a long title truncate.

## How and when `addEventListener` is called

There is **no `addEventListener` per `data-ui5-tooltip` element**. The whole
mechanism uses **three listeners on `document`, installed once**:

```ts
function startDataTooltips(): void {
  if (started) { return; }   // idempotent — a second call is a no-op
  started = true;

  document.addEventListener("mouseover",  onPointerOver, true);  // capture
  document.addEventListener("focusin",    onFocusIn,     true);
  document.addEventListener("touchstart", onPointerOver, true);
}
```

- **When:** exactly once, when the app calls `startDataTooltips()` at startup
  (the demo page calls it from its module script). Not per element, not per
  component, not on render.
- **Future elements are covered for free.** This is event delegation — one
  document-level listener catches events from every current *and future*
  `[data-ui5-tooltip]` element. A `ui5-title` that only *becomes* truncated
  later gets its tooltip with no new listener.
- **Teardown:** the sample never removes them (start-only POC). A production
  version would add teardown.

### Why capture phase (`true` as the third argument)

The listeners are registered in the **capture** phase so that events originating
inside component shadow roots reliably reach the document-level handler.

### Why `composedPath()` instead of `e.target`

This is the crucial detail for shadow DOM. When a `mouseover` fires on the inner
`<button>` inside `ui5-button`'s shadow root and propagates up to `document`,
the browser **retargets** `e.target` to the host element (`ui5-button`) — the
inner element carrying the attribute is hidden. `composedPath()` returns the
full, un-retargeted path from the real inner element up through every shadow
boundary, so the matcher still finds it:

```ts
function matchInPath(e: Event): HTMLElement | null {
  for (const node of e.composedPath()) {   // crosses shadow boundaries
    if (node instanceof HTMLElement && node.hasAttribute(ATTRIBUTE)) {
      return node;
    }
  }
  return null;
}
```

## The full flow on hover / focus

1. User hovers (or focuses, or long-presses) an element — possibly deep inside a
   component's shadow root.
2. The event reaches the `document` capture-phase listener → `onPointerOver` /
   `onFocusIn`.
3. `matchInPath(e)` scans `composedPath()` for the first
   `[data-ui5-tooltip]` element.
4. If found, `dockAndOpen(target)` points the single shared `<ui5-tooltip>` at
   it and opens it:

```ts
function dockAndOpen(target: HTMLElement): void {
  const text = target.getAttribute(ATTRIBUTE) ?? "";
  if (!text) { return; }

  const tooltip = getSharedTooltip();
  tooltip.text = text;
  // Optional per-target alignment; reset to the default when absent so a prior
  // target's value does not leak into the next (the tooltip is shared).
  tooltip.horizontalAlign =
    (target.getAttribute(ALIGN_ATTRIBUTE) as Tooltip["horizontalAlign"]) || "Center";
  tooltip.opener = target;
  tooltip.openTooltip();
}
```

## One shared tooltip, re-docked per target

A single `<ui5-tooltip>` instance is created on first use and reused for every
target:

```ts
function getSharedTooltip(): Tooltip {
  if (!sharedTooltip) {
    const el = document.createElement("ui5-tooltip");
    document.body.appendChild(el);
    sharedTooltip = el as unknown as Tooltip;
  }
  return sharedTooltip;
}
```

Because it is shared, every per-target setting must be set on each open **and
reset when absent** — otherwise a previous target's value leaks. This is exactly
why `horizontalAlign` falls back to `"Center"` when a target has no
`data-ui5-tooltip-align`.

## Opening vs. closing — who owns what

- **Opening** is driven by these document listeners (the code above).
- **Closing is not.** Once `opener` is set, the `Tooltip` component attaches its
  own `TooltipGestures` to that opener (on its next render) and owns
  close-on-mouseout / blur / Escape / activation.

So the hook's only job is *open and point*; the component handles everything
after that.

## Companion attribute: `data-ui5-tooltip-align`

A single string attribute can only carry **text**. Per-target configuration
(alignment, and later placement/delay) needs companion attributes. Today there
is one:

| Attribute | Purpose | Default when absent |
|-----------|---------|---------------------|
| `data-ui5-tooltip` | tooltip text (and the trigger) | — (no attribute = no tooltip) |
| `data-ui5-tooltip-align` | `horizontalAlign` of the tooltip | `"Center"` |

`ui5-title` sets `data-ui5-tooltip-align="Start"` so a truncated title's tooltip
aligns to the start, matching the previous explicit-`<ui5-tooltip>` behavior.
`ui5-button` omits it and stays centered.

## Limits of this sample

- **String-only payload.** No rich content; per-target options need a companion
  attribute per option (see above). This caps the feature.
- **Pure event delegation, no observer.** Detection relies on events reaching
  the document. The sample does **not** run a `MutationObserver`, so it is
  deliberately simpler than a robust cross-shadow-root implementation would be.
- **No teardown.** Listeners are installed once and never removed.
- **Shared-instance state leakage** is handled only for the settings the sample
  knows about (text, align) — any new per-target setting must likewise reset on
  each open.

These are the same costs flagged in `tooltip-api-research.md`: the honest price
of the magic attribute is a detection mechanism, and a production version edges
back toward the global manager the component model set out to avoid. The
recommended path is to keep `<ui5-tooltip>` + `opener` as the primitive and
treat `data-ui5-tooltip` as sugar layered on top — which is exactly what this
sample is.

## Try it

`packages/main/test/pages/DataTooltipSample.html` wires `startDataTooltips()`
and renders `ui5-button` and `ui5-title` with no tooltip markup — the components
set the attribute internally.
