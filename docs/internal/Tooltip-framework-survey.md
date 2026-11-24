# Tooltip — cross-framework API survey (full)

The complete per-framework reference behind the condensed comparison in
[`Tooltip.md`](./Tooltip.md#cross-framework-reference). Full API snippets and notes
for Material UI, Ant Design, React Aria, shadcn/ui (Radix) and Vaadin.

Two broad API shapes emerge:

- **Wrapper / text-prop** (MUI, Ant Design) — the tooltip *wraps* the trigger and
  carries the text as a prop.
- **Composition / slot** (React Aria, shadcn/Radix, Vaadin) — trigger and tooltip
  are separate elements composed together; the association is structural
  (parent/child or a slot), not a prop.

Vaadin is the most relevant comparison: it is a web-component library and uses the
**slot** model, closest to the UI5 direction.

## Material UI (React) — wrapper + `title` prop

Tooltip wraps its single child; the child is the trigger. Text lives in `title` (a
`node`, so it can be rich).

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

Key props: `title`, `placement` (14 values incl. `-start`/`-end`), `arrow`,
`open`/`onOpen`/`onClose` (controlled), `enterDelay`/`leaveDelay`/`enterTouchDelay`,
`disableHoverListener`/`disableFocusListener`/`disableTouchListener`,
`followCursor`, `describeChild` (switches aria from label → description).

Notable: `describeChild` explicitly toggles `aria-label` vs `aria-describedby`
semantics — a design point we care about (our model wants `aria-describedby`).

## Ant Design (React) — wrapper + `title` prop

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

Key props: `title` (`ReactNode | () => ReactNode`), `placement` (12 values),
`arrow` (`boolean | { pointAtCenter }`), `trigger`
(`hover | focus | click | contextMenu`), `open`/`onOpenChange`, `color`,
`mouseEnterDelay`/`mouseLeaveDelay`, `getPopupContainer` (portal target).

Notable: `trigger` is a single enum rather than three `disable*` flags — cleaner
than MUI for the same capability.

## React Aria (React) — composition, accessibility-first

Trigger and tooltip are siblings inside a `TooltipTrigger`. Behavior config lives
on the trigger; text is the tooltip's children.

```tsx
import { TooltipTrigger } from 'react-aria-components';
import { Tooltip } from 'vanilla-starter/Tooltip';
import { Button } from 'vanilla-starter/Button';

<TooltipTrigger delay={1500} trigger="focus" placement="top">
  <Button aria-label="Edit"><Edit /></Button>
  <Tooltip>Edit</Tooltip>
</TooltipTrigger>
```

Key props (on `TooltipTrigger`): `delay`, `trigger` (`"focus"` to restrict;
default both focus+hover), `placement` (`top|bottom|left|right|start|end`),
`isOpen`/`defaultOpen`/`onOpenChange`, `isDisabled`, `shouldFlip`, `crossOffset`,
`containerPadding`.

Notable: explicit **warmup/cooldown** model — the first tooltip waits `delay`,
subsequent ones show instantly until a cooldown elapses. Strong, documented
accessibility semantics.

## shadcn/ui (React, Radix primitives) — composition + provider

Most verbose. Four parts: a `TooltipProvider` at the app root, then `Tooltip` /
`TooltipTrigger` / `TooltipContent`.

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

Key points: `TooltipProvider` shares delay/skip-delay config across all tooltips;
`TooltipTrigger asChild` merges behavior onto your own element instead of rendering
an extra one; `TooltipContent side` sets placement. Content is arbitrary JSX.

Notable: `asChild` is the React equivalent of "attach the tooltip to an existing
element rather than a wrapper" — conceptually the same intent as the
`data-ui5-has-tooltip` attribute.

## Vaadin (web components) — slot-based, closest to UI5

The tooltip is a real custom element placed in a `tooltip` **slot** of the target.
Text is the `text` attribute; position is `position`.

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

Key API: `text`, `position`, `hoverDelay`/`focusDelay`/`hideDelay` (+ global static
setters), `manual` + `opened` (controlled), `for` (associate with a target by id
when not slotting). Container components (MenuBar, ContextMenu, Grid) take tooltip
text via their items model and reuse one slotted `<vaadin-tooltip>` as a template.

Notable: **focus closes immediately on blur** by design (no hide delay on blur) to
avoid confusion when moving focus — a concrete interaction detail worth copying.
`for`-by-id mirrors the `data-ui5-has-tooltip` id association.

## Comparison table

| Framework | Shape | Text via | Placement prop | Delays | Controlled | Trigger config | A11y note |
|-----------|-------|----------|----------------|--------|------------|----------------|-----------|
| Material UI | wrapper | `title` (node) | `placement` (14) | `enter/leaveDelay`, `enterTouchDelay` | `open`/`onOpen`/`onClose` | 3× `disable*Listener` | `describeChild` label↔description |
| Ant Design | wrapper | `title` (node/fn) | `placement` (12) | `mouseEnter/LeaveDelay` | `open`/`onOpenChange` | `trigger` enum | — |
| React Aria | composition | children | `placement` (6) | `delay` + warmup/cooldown | `isOpen`/`onOpenChange` | `trigger="focus"` | strongest; role=tooltip |
| shadcn/Radix | composition + provider | children | `side` | provider `delayDuration`/`skipDelayDuration` | `open`/`onOpenChange` | — | Radix a11y built-in |
| Vaadin | **slot (web component)** | `text` attr | `position` | `hover/focus/hideDelay` + static globals | `manual` + `opened` | — | blur closes instantly |

## Takeaways for `ui5-tooltip`

- The **slot/association model (Vaadin)** fits web components. Wrapper models
  (MUI/Ant) are React-render idioms that don't map cleanly to slotted custom
  elements.
- **Naming:** `text` (Vaadin) over `title` avoids clashing with the native `title`
  attribute. `placement` (MUI/Ant) is a fine enum name; Vaadin's `position` is a
  synonym.
- **Delays:** everyone separates show vs. hide. A single `delay` is simpler;
  whether hide needs its own value can come later. Vaadin's "blur closes
  immediately" is worth adopting.
- **Controlled API:** every library offers one. `openTooltip()`/`closeTooltip()`/
  `isOpen()` cover it imperatively; a `manual`/`open` property (Vaadin style) would
  be the declarative equivalent if needed.
- **Accessibility:** React Aria and MUI's `describeChild` confirm the
  label-vs-description distinction. The choice of `role="tooltip"` +
  `aria-describedby` is the mainstream, correct default.

## Sources

- Material UI Tooltip — https://mui.com/material-ui/react-tooltip / API https://mui.com/material-ui/api/tooltip
- Ant Design Tooltip — https://ant.design/components/tooltip
- React Aria Tooltip — https://react-aria.adobe.com/Tooltip
- shadcn/ui Tooltip — https://ui.shadcn.com/docs/components/radix/tooltip
- Vaadin Tooltip — https://vaadin.com/docs/latest/components/tooltip
