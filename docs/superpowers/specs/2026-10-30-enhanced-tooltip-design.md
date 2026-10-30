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

- The tooltip is a **visual + gesture layer only** — it carries no ARIA anchor
  of its own. Accessibility text rides on each host control's existing native
  mechanism (see "Accessibility" below). The OpenUI5 invisible-anchor approach
  (and `aria-describedby`/`role="tooltip"` pointing at the tooltip) does NOT
  work for web components: the tooltip renders its content inside its own shadow
  root, and ARIA IDREFs do not cross shadow boundaries.
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

`placement` reuses the existing `PopoverPlacement` enum (no dedicated
`TooltipPlacement` type).

### Public API

| Member | Type | Notes |
|--------|------|-------|
| `text` | `string` | Tooltip text, rendered directly in the template. |
| `opener` | `HTMLElement \| string` | The element the tooltip reacts to and docks against. Uses the same `DOMReferenceConverter` pattern as `Popover.opener`. Can be a host focus ref or a sub-element. |
| `placement` | `` `${PopoverPlacement}` `` | Default `Top` (OpenUI5 default). |
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
```

The tooltip renders **only** the visual popover. It carries no `role="tooltip"`
anchor and no `ariaAnchorId` — accessibility text is owned by the host control
(see "Accessibility"). This avoids the shadow-boundary problem entirely: there
is no ARIA IDREF to resolve.

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

- **Button** (`ButtonTemplate.tsx`): remove the native `title={this.buttonTitle}`
  and embed `<ui5-tooltip text={this.buttonTitle} opener={focusRef}>` for the
  visual tooltip. Do **not** add `aria-describedby` for the tooltip — Button
  already exposes its text to screen readers via its existing `aria-label`
  (icon-only buttons) and `aria-description` (`ariaDescriptionText`), both
  rendered in Button's own shadow root. The `tooltip` public property remains
  the data source (`buttonTitle` derives from it). Removing the native `title`
  must not regress Button's existing accessible name/description.
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

- The `<ui5-tooltip>` is **visual only** — it exposes no ARIA to screen readers
  and is not referenced by the host via ARIA.
- Each host control keeps exposing the tooltip text through its own existing,
  same-shadow-root mechanism:
  - **Button** — icon-only buttons already surface `buttonTitle` as the
    accessible name (`aria-label`); `aria-description` carries supplementary
    text. Removing the native `title` must not regress these.
  - **Title** — the full (truncated) text is the element's own text content,
    already in the accessible tree.
- Rationale: ARIA IDREFs (`aria-describedby`) cannot cross shadow boundaries, and
  the tooltip's content lives inside its own shadow root, so an IDREF to it would
  not resolve. Keeping ARIA on the host (where the text already is) is the robust
  web-component approach — this is UI5's own pattern (`AccessibilityTextsHelper`
  re-exposes referenced text rather than relying on cross-shadow IDREFs).

## Testing

- Cypress specs in `packages/main/cypress/specs/Tooltip.cy.tsx`:
  - opens on hover and on keyboard focus;
  - closes on Escape, on activation, on mouseleave/focusout;
  - renders `text`;
  - respects `placement`.
- Button and Title specs: assert the embedded tooltip appears and is wired.
  - Button: embedded `[ui5-tooltip]` reflects the `tooltip` property; native
    `title` is gone; Button's accessible name/description unaffected.
  - Title: tooltip appears **only when truncated** — a narrow, single-line
    (`wrapping-type="None"`) title with overflowing text shows it; a short or
    wrapping title does not.
- Tests exercise **public API and observable DOM/ARIA only** — no private
  methods or fields.
- A dev-server test/demo page for manual, iterative browser verification at
  `http://localhost:8080/`.

## Risks / things to validate early

- **Cross-shadow ARIA** — RESOLVED by design: the tooltip is visual-only and
  carries no ARIA; hosts keep their own accessible name/description. No IDREF
  crosses a shadow boundary.
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
- Any ARIA anchor owned by the tooltip (`role="tooltip"` span, `ariaAnchorId`,
  `aria-describedby` wiring) — accessibility stays on the host control.
