# Tooltips


## Requirements

1. Framework-agnostic — React, any framework, plain HTML
2. Performant
3. Lifecycle-reliable — add/remove/move/replace opener, open or closed, never leaks or goes stale
4. `aria-describedby`

<br>

## Proposal — `data-ui5-has-tooltip` + `aria-describedby` + `<ui5-tooltip>`

- `data-ui5-has-tooltip` points to the tooltip, triggers the gestures
- `aria-describedby` is manually added (author-owned) instead of auto-assinged
  - auto-assign would force observing the opener before any gesture — we can avoid the complexity by leaving it to the author. This way we keep the runtime observer-free and the lifecycle is not in our concern
- `<ui5-tooltip>`
  - contains the popover
  - carries `role`/`aria-label` on its host, so the id doubles as the describedby target
  - same tooltip `id` serves both data-ui5-has-tooltip and aria-describedby

In HTML:

```html
<button data-ui5-has-tooltip="tooltip1" aria-describedby="tooltip1">Save</button>
<ui5-tooltip id="tooltip1" text="Save the document"></ui5-tooltip>
```

In TSX: 
- spread `TooltipHelper(...)`. Emits `data-ui5-has-tooltip` + `aria-describedby`
- the describedby can be overriden by a callback that receives the existing value and returns the merge (space-joined id list, per `Dialog.ariaDescribedByIds`):

```tsx
<button
  {...TooltipHelper(
    "tooltip1",
    // optional
    {
      describedBy: prev => [prev, "tooltip1"].filter(Boolean).join(" "),
    }
  )}
>
```

The new component `<ui5-tooltip>`:
- covers both visualization + describedby target
- sets host `role` + `aria-label` (from `text`) via `ElementInternals`. `// TODO needs testing`

```tsx
<ui5-tooltip
  id="tooltip1"
  text="Save the document"
  <!-- role="tooltip" -->       {/* added automatically via ElementInternals */}
  <!-- aria-label="Save the document" -->  {/* added automatically, from text */}
/>
```

<br>

Overall:

**Pros:**
- Plain attribute → works in React, any framework, plain HTML.
- Event delegation on document → no listeners or lifecycle to manage on the opener; removal is a non-event, leak-proof.
- ARIA author-owned → no `MutationObserver` needed.
- House style; scoping-safe.

**Cons:**
- Needs global document-level attachment of several events — correct trade: it's event delegation, more performant than per-opener listeners.
- More code for consumers

<br><br>

## Comparison with other options

| Dimension | `data-ui5-has-tooltip` + `aria-describedby` + `<ui5-tooltip>` (best) | `<ui5-tooltip opener=[element]>` | ref + helper | prop spread | wrapper (other frameworks) |
|---|---|---|---|---|---|
| Plain HTML (req 1) | ✅ | ✅ | ❌ | ❌ | ✅ |
| Listener lifecycle (req 2) | delegated | per-opener | per-opener | per-opener | on owned child |
| Leak-proof (req 3) | ✅ | ⚠️ needs observer | ⚠️ fires on wrong unmount | ✅ | ✅✅ |
| ARIA (req 4) | manual | manual | manual | through helper | manual; cross-shadow |
| Scoping-safe | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| Fits repo pattern | ✅ | extends | ❌ | ◑ | ❌ |
| UI5 shadow compose | ✅ | ✅ | ✅ | ✅ | ⚠️ outside host shadow |
| Layout impact | none | none | none | none | ❌ yes, `display:contents` |
| Public surface | new attribute + new component | new component | helper | helper | new component |


<br><br>


## Per-option

### `data-ui5-has-tooltip` + `aria-describedby` + `<ui5-tooltip>` (best)
Declarative attribute drives gesture via document delegation; `aria-describedby` author-owned; `<ui5-tooltip>` host carries `role`/`aria-label`.
- **Pro:** plain HTML in any framework; no opener listeners/lifecycle; no observer.
- **Con:** new public attribute; invoker→tooltip inversion; needs global document-level event attachment (correct delegation trade).

### `<ui5-tooltip opener=[element]>`
Tooltip references opener by `opener="id"`; listeners on the resolved opener.
- **Pro:** familiar tooltip-centric API.
- **Con:** needs a removal observer that is load-bearing for memory-safety — misses ancestor-removal, reparent, cross-shadow → leak returns.

### ref + helper
`ref={(el) => helper.attach(el)}`.
- **Pro:** real element; scoping-safe.
- **Con:** not usable from plain HTML; `ref(null)` fires on template unmount, not opener removal → misses the public case.

### prop spread
`{...tooltipBindings({ text })}` → handlers inline on opener.
- **Pro:** handlers die with node; no lookup.
- **Con:** not usable from plain HTML; loses attach-by-id; opaque. Internal sugar only.

### wrapper (other frameworks)
Tooltip contains trigger as slotted child. Dominant in React (Radix/MUI via `asChild`), present in web components (Shoelace). `asChild` escape hatch unavailable to us → forced real wrapper node.
- **Pro:** strongest lifecycle safety (shared subtree); co-located.
- **Con:** changes the DOM (extra wrapper node); harder to write in some cases; single-child constraint; disabled-element gotcha; new component; awkward across UI5 shadow boundary.
- Can use `display:contents`, but it has problems (a11y-tree, version-sensitive).
