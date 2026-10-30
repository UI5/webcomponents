# Enhanced Tooltip (`<ui5-tooltip>`) — Design

Date: 2026-10-30
Branch: `enhanced_tooltips`

## Overview

A new public, reusable `<ui5-tooltip>` web component that renders the OpenUI5
tooltip visual design via an internally-wrapped `<ui5-popover>`. It opens on
hover (delayed), keyboard focus (focus-visible), and long-press on touch;
it closes on Escape, pointer/keyboard activation, mouseleave, and focusout.

`<ui5-button>` and `<ui5-title>` embed it inside their own shadow templates,
pointed at their focus DOM ref, directly replacing the native `title`
attribute. There is **no enhanced-mode switch** — the enhanced tooltip is the
only tooltip for these controls in this work.

This is a reimplementation, not a port: the OpenUI5 interaction and visuals are
the reference, but the API and internals are designed for web components. In
particular:

- The tooltip DOM is rendered in place (not lazily built on open), so the host
  can reference it directly with `aria-describedby` and `role="tooltip"`,
  replacing OpenUI5's invisible ARIA anchor.
- No `TooltipEnablement` equivalent — the web component lifecycle handles setup
  and teardown.
- Positioning/flipping/arrow come from `<ui5-popover>`; the tooltip carries no
  positioning math of its own.
- No "late text setting before open" — `text` is set directly in the template.

## Decisions (from brainstorming)

- Integration is **internal**, inside Button/Title shadow templates. Users do
  not place `<ui5-tooltip>` themselves to get the upgrade.
- The old native `title` tooltip is **directly replaced** — no opt-in flag.
- `<ui5-tooltip>` is nonetheless a **public, reusable** component with its own
  API, usable standalone and testable in isolation.
- It **wraps `<ui5-popover>`** rather than a custom popup.
- **Text-selection suppression** on touch is in scope.
- **Focus guard after activation** (suppressing immediate reopen after a
  click/Enter/Space) is out of scope for now — a `// TODO:` note marks where it
  would hook in.
- Always-on for this POC; a global opt-in flag can come later.

## Component structure & API

New files:

- `packages/main/src/Tooltip.ts` — the component.
- `packages/main/src/TooltipTemplate.tsx` — the template.
- `packages/main/src/themes/Tooltip.css` — visual overrides.
- `packages/main/src/types/TooltipPlacement.ts` — placement enum (or reuse
  `PopoverPlacement` if the value set matches; decide during implementation).

### Public API

| Member | Type | Notes |
|--------|------|-------|
| `text` | `string` | Tooltip text, rendered directly in the template. |
| `opener` | `HTMLElement \| string` | The element the tooltip reacts to and docks against. Uses the same `DOMReferenceConverter` pattern as `Popover.opener`. Can be a host focus ref or a sub-element. |
| `placement` | `` `${TooltipPlacement}` `` | Default `Top` (OpenUI5 default). |
| `openTooltip()` | method | Opens immediately (no gesture delay). Named to avoid clashing with Popover's `open` boolean. |
| `closeTooltip()` | method | Closes. |
| `isOpen()` | method → `boolean` | Whether currently open. |

JSDoc is kept short per the project comment style; public API JSDoc includes a
small usage sample.

### Internal render

```tsx
<ui5-popover
  hide-arrow={false}
  opener={this.opener}
  placement={this.placement}
  class="ui5-tooltip-popover"
>
  <span class="ui5-tooltip-text">{this.text}</span>
</ui5-popover>
<span
  role="tooltip"
  id={`${this._id}-aria`}
  class="ui5-tooltip-aria-text"
>{this.text}</span>
```

The `role="tooltip"` span lives in the **same shadow root** as the host element
that references it via `aria-describedby`, so the ID reference resolves (ARIA ID
references do not cross shadow boundaries; same-root does).

## Gesture engine

A small internal helper (plain class, not a `UI5Element`), e.g.
`packages/main/src/TooltipGestures.ts`, attaches listeners to the resolved
opener element and translates raw gestures into open/close calls on the
tooltip. Reference: OpenUI5 `TooltipEventTrigger`, simplified.

- **Hover** — `mouseover` → open after `delay` (default 500 ms); `mouseout` →
  close after a delay. Pointer entering the tooltip itself keeps it open.
- **Focus** — `focusin` gated by `:focus-visible` → open; `focusout` → close.
- **Touch** — `touchstart` starts a long-press timer (500 ms) → open; `touchmove`
  / `touchend` / `touchcancel` clear it. During the gesture, a text-selection
  suppression class is added to the opener and removed when the gesture ends.
- **Escape** — closes a pending or open tooltip.
- **Activation** — click / Enter / Space close immediately; the event is left to
  propagate so the host still activates.
- **Focus guard after activation** — out of scope; `// TODO:` note at the hook
  point.

Delays apply to hover and keyboard focus; touch and Escape act immediately,
matching OpenUI5.

## Visual design

Port `sap/ui/core/themes/base/Tooltip.less` into
`packages/main/src/themes/Tooltip.css` as overrides on the wrapped popover:

- Background `--sapIndicationColor_9_Background`, text
  `--sapContent_ContrastTextColor`, `font-size: var(--sapFontSmallSize)`.
- `border-radius: 0.25rem`, `max-width: 17rem`, `min-height: 1.5rem`,
  `padding: 5px 0.5rem`.
- Arrow restyled to the OpenUI5 look (dark background, matching protrusion),
  reusing Popover's arrow positioning rather than reimplementing placement math.

Exact visual parity is verified in the browser against OpenUI5 during
implementation.

## Button & Title integration

- **Button** (`ButtonTemplate.tsx`): replace `title={this.buttonTitle}` with an
  embedded `<ui5-tooltip text={this.buttonTitle} opener={focusRef}>` and set
  `aria-describedby` on the button to the tooltip's ARIA span id. The existing
  `tooltip` public property remains the data source (`buttonTitle` already
  derives from it).
- **Title** (`Title.ts` / template): Title has **no `tooltip` property** and
  should not gain one. The tooltip text is the title's **own text content**, and
  the tooltip is shown **only when the title is truncated** (its text overflows
  the box and is cut with an ellipsis):
  - Detect truncation by comparing `scrollWidth > clientWidth` on
    `.ui5-title-root`. Re-evaluate on render and on resize (a `ResizeObserver`
    on the title root), storing the result in a private reactive field.
  - When truncated, the embedded `<ui5-tooltip>` gets `text` = the title's text
    content; when not truncated, `text` is empty so the tooltip never opens.
  - Point the embedded tooltip's `opener` at the title root element.
  - Truncation only occurs in the single-line case (`wrapping-type="None"`,
    `white-space: nowrap`); wrapping titles don't truncate and so never show the
    tooltip. This matches the ellipsis behavior already in `Title.css`.

Both are the first two "upgrade" samples required by the spec. Note the
asymmetry: Button's tooltip is driven by its explicit `tooltip` property, while
Title's is derived from truncation of its own content.

## Accessibility

- Host references the in-template `role="tooltip"` span via `aria-describedby`.
- The visible popover content is supplementary; the ARIA span carries the text
  for screen readers.
- Validate live in the browser (spec's explicit "test if this works" item):
  confirm the same-shadow-root `aria-describedby` reference resolves and is
  announced.

## Testing

- Cypress specs in `packages/main/cypress/specs/Tooltip.cy.tsx`:
  - opens on hover and on keyboard focus;
  - closes on Escape, on activation, on mouseleave/focusout;
  - renders `text`;
  - respects `placement`;
  - wires `aria-describedby` to a `role="tooltip"` element with the text.
- Button and Title specs: assert the embedded tooltip appears and is wired.
  - Button: tooltip reflects the `tooltip` property.
  - Title: tooltip appears **only when truncated** — a narrow, single-line
    (`wrapping-type="None"`) title with overflowing text shows it; a short or
    wrapping title does not.
- Tests exercise **public API and observable DOM/ARIA only** — no private
  methods or fields.
- A dev-server test/demo page for manual, iterative browser verification at
  `http://localhost:8080/`.

## Risks / things to validate early

- **Cross-shadow `aria-describedby`** — mitigated by rendering the tooltip in the
  host's own shadow root; verify live.
- **Popover arrow restyle fidelity** — Popover's arrow differs from OpenUI5's
  rotated-square; confirm the override reaches OpenUI5 parity, and fall back to
  a tooltip-specific arrow element only if the popover arrow can't be styled to
  match.
- **Popover sizing for tiny content** — Popover is built for rich content;
  confirm it collapses to tooltip dimensions without min-size artifacts.

## Out of scope

- Enhanced-mode global opt-in flag.
- Focus guard after activation.
- Migrating controls beyond Button and Title.
- `ariaText` / `suppressAriaAnchor` refinements from OpenUI5 (single `text`
  drives both visible and ARIA content for now).
