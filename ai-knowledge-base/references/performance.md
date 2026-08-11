# Performance and Rendering

## The invalidation model

```
assign to an @property
        |
   _invalidate()
        |
  onInvalidation(changeInfo)     you can observe this; suppression is OFF here
        |
  render queued (async, batched)
        |
  onBeforeRendering()            derive state here; suppression is ON
        |
  template runs, DOM patched
        |
  onAfterRendering()             measure DOM here; suppression is OFF
```

Renders are batched and deduped, so you cannot read the DOM right after setting a property.
`RenderQueue.add()` ignores a component already queued, and `scheduleRenderTask()` drains the whole
queue inside a single `requestAnimationFrame`: N assignments in one synchronous turn cost
one render per component. A component re-queued during the drain is processed again; the queue throws
after a component is processed eleven times in one task (the `MAX_PROCESS_COUNT` guard) — the
only guard against a render loop.

## What schedules a render

| Trigger | Effect |
|---------|--------|
| A **different** value assigned to an `@property` field | schedules a render |
| An object or array property reassigned with identical contents | schedules a render — the guard is `!==` |
| An attribute write, via `attributeChangedCallback` assigning the property | schedules a render if the value differs |
| A slotted child added or removed | schedules a render, `reason: "children"` |
| Default-slot text content changed | schedules a render, `reason: "textcontent"` |
| `slotchange` from a slot element in the light DOM | schedules a render, `reason: "slotchange"` |
| `slotchange` from a slot the component itself rendered | reprocesses children |
| A child change matching `invalidateOnChildChange` | schedules a render, `reason: "childchange"` |
| `setLanguage()`, with `languageAware: true` | re-renders every language-aware instance |
| Theme change, with `themeAware: true` | re-renders every theme-aware instance |
| `applyDirection()`, for `rtlAware` components | re-renders every RTL-aware instance |

The last three go through `reRenderAllUI5Elements`, which queues instances directly with
`renderDeferred`, never reaching `_invalidate`: `onInvalidation` does not fire and the flag below does
not apply.

The setter guard is reference equality: `const isDifferent = oldState !== value;`. A
new array with identical contents invalidates. `push` into the existing array does not, and does not
update the UI either. Writing the same primitive back does not. A plain class field never does.

`languageAware` and `themeAware` are class-level flags that trigger a **global** re-render of every
matching instance on the page. Declaring one on a component that has no i18n text or no themed style is
a global regression, not a local convenience.

## One suppression flag, two phases

`_suppressInvalidation` makes `_invalidate` return early. It is set in the
constructor, so nothing invalidates before the first render, then set again around
`onBeforeRendering` and cleared in the `finally`. Deriving state in `onBeforeRendering` therefore
cannot loop — those assignments update `_state` silently.

The flag is `false` again for the entire rest of `_render()`: through `updateShadowRoot`, past
`_rendered = true`, and through `onAfterRendering`. Any `@property` assignment in that whole span
queues a second render. This is why rule 3 exists.

Invalidation is also skipped for a `languageAware` component while language bundles load; the language
change re-renders it when the data arrives.

`onInvalidation(changeInfo)` fires with suppression **off**, before the render is queued. It is the
cheap place to inspect `changeInfo.reason` (e.g. `"childchange"`) and cache a derived value.
Assigning an `@property` there queues a second render, so cache into a plain field.

## The four rules

### 1. State only JavaScript reads is not a property

The rule is `core-rules.md` rule 13. The invalidation consequence: the wasted render runs
`onBeforeRendering`, which can overwrite input the user is still editing. A re-render on the first
keystroke reset the value and moved the caret to the start of the field
(`.claude/memory/DateTimePicker/2026-04-07-first-keystroke-caret-reset.md`).

`@property({ type: Object })` and `type: Array` never reflect to an attribute — the setter returns
early ("Don't reflect arrays and objects to the DOM"). Reassigning still invalidates,
but a CSS attribute selector will never see the value. `noAttribute: true` on any other property skips
the per-render `setAttribute`/`removeAttribute`; use it for private state not read by CSS.

### 2. Scope `invalidateOnChildChange` to the properties you depend on

Unscoped, every property change on every child re-renders the parent. The option takes an object form
`{ properties, slots }` where each is a boolean or a list of names:

```ts
// Follow two named properties, ignore slot changes
@slot({ type: HTMLElement, "default": true, invalidateOnChildChange: { properties: ["navigated", "position"], slots: false } })
rows!: DefaultSlot<TableRow>;

// The inverse: any slot change, no property change
@slot({ type: HTMLElement, invalidateOnChildChange: { properties: false, slots: true } })
headerRow!: Slot<TableHeaderRow>;
```

Many component files still use the unscoped `invalidateOnChildChange: true`. Do not copy them. To
follow one child instead of every child in a slot, attach to that instance:

```ts
// Attaching to a single child; detaches on the first "position" change
lastRow.attachInvalidate(this._onRowInvalidateBound);
```

### 3. Guard any property you set in `onAfterRendering`

Hook semantics are in `component-anatomy.md`. `onAfterRendering` runs with suppression off, so an
`@property` written there reaches `_invalidate` and queues another render; compare
before assigning, and keep measurements in plain fields. `getDomRef()` is not cached — it reads
`shadowRoot.children[0]` on every call, so never call it in a loop.

### 4. Clean up in `onExitDOM`

The symmetry list is in `component-anatomy.md`. Nothing is torn down automatically: an unmatched
`ResizeHandler`, `IntersectionObserver`, scroll listener, or `setTimeout`/`setInterval` keeps firing
on a detached component and blocks GC. Deregister with the **same bound reference** you registered — a
fresh arrow each time never matches and leaks. Gate registration on `open` inside
`onAfterRendering` and keep a safety deregister in `onExitDOM`.

## Repo patterns to reuse

- Size changes: `ResizeHandler`, one shared `ResizeObserver` whose callbacks are coalesced into a rAF. It resolves `getDomRef()` at registration, so register in `onEnterDOM`, not earlier.
- Scroll handlers: the base `throttle()` (`base/util/throttle.js`) is a `setTimeout`-based trailing call — used e.g. by `ShellBar` for resize. `TableUtils.ts` has a separate rAF-based throttle used only by `TableVirtualizer`; don't confuse the two.
- Infinite scroll: `debounce()`, a `setTimeout`-based call. Caveat: it uses a single module-level timer shared by every caller on the page, so a second `debounce()` cancels the first pending one. Safe only when one component at a time calls it (as List's infinite-scroll trigger does).
- End-of-list detection: `IntersectionObserver`.
- Scroll and touch listeners: `{ passive: true }`.
- State for many children: one pass in the parent's `onBeforeRendering` writing plain child fields, not a `@property` per child.
- Derived objects: a key-guarded field on the instance.

`individualSlots: true` runs a `setAttribute("slot", …)` pass over every child on every render.
Combined with an unscoped `invalidateOnChildChange` on a high-cardinality slot it
compounds; use it only where per-child `::slotted()` targeting is required.

`DateFormat.getDateInstance()` is cached repo-wide by options and locale; a runtime locale or
pattern change produces a new key and a new instance, and a caller holding the old instance keeps
the old formatter — `.claude/memory/Calendar/2026-05-22-pr13550-dateformat-caching.md`.

## Animations

Animation state is global configuration, not a per-component decision.

```ts
return this.noAnimation || getAnimationMode() === AnimationMode.None;
```

`getAnimationMode` comes from `@ui5/webcomponents-base/dist/config/AnimationMode.js`. Compare against
the `AnimationMode` enum member — `getAnimationMode() === AnimationMode.None` — as every component does.
The enum values are the lowercase strings `"full"`, `"basic"`, `"minimal"`, `"none"`, so a raw
`=== "none"` is equivalent, but the enum member is the established pattern; import the enum object.

A component that animates unconditionally produces timing-dependent tests, because the test
environment may have animations disabled while the component waits for a transition that never fires.

## Awaiting a render

`renderFinished()`, from `@ui5/webcomponents-base/dist/Render.js`, is not "after paint": it awaits
`whenAllCustomElementsAreDefined()` and then `whenDOMUpdated()`. `whenDOMUpdated` is one
`requestAnimationFrame` that resolves once the queue is empty; the render task itself adds a 200 ms
`setTimeout` settle after draining the queue (named `mutationObserverTimer`, but it is a plain
timeout, not a `MutationObserver`). Do not call `renderFinished()` in a hot path.

`onAfterRendering` runs synchronously at the end of `_render()`: after the DOM
patch, still before the next paint. Measure your own DOM there, not through `renderFinished()`.

In tests use `cy.waitRenderFinished()`. `cy.mount` and
the wrapped real-event commands already wait — see `testing.md`.

## Large lists

`Table` is the reference implementation for anything list-shaped at scale — virtualisation, keyboard
navigation over a virtualised range, and growing are all solved there.
