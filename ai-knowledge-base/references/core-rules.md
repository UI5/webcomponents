# Core Rules

Every rule here is what you follow in code you write. Legacy code violates many of them, sometimes at
scale — do not copy those patterns, and do not migrate them as a drive-by. A rule being listed here
does not mean the codebase is already clean; it means new code must not add to the debt.

## Blocking

| # | Rule | Wrong | Right |
|---|------|-------|-------|
| 1 | Enum properties use template literal types | `design: ButtonDesign = ButtonDesign.Default` | ``design: `${ButtonDesign}` = "Default"`` |
| 2 | Query by attribute | `querySelector("ui5-popover")` | `querySelector("[ui5-popover]")` |
| 3 | Style by attribute | `ui5-button { }` | `[ui5-button] { }` |
| 4 | Identify UI5 components with an instance checker | `el instanceof Button` | `isInstanceOfButton(el)` |
| 5 | Never compare `tagName` against a UI5 tag | `el.tagName === "UI5-BUTTON"` | `isInstanceOfButton(el)` |
| 6 | Set child state through the template | `this._input.value = x` | `<Input value={x} />` |
| 7 | No imperative attribute mutation on child UI5 elements | `childUi5El.setAttribute("disabled", "")` | `<El disabled={this.isDisabled} />` |
| 8 | No class toggling for persistent state | `el.classList.add("active")` to track open/selected state | `:host([active]) { }` driven by a `@property` |
| 9 | No `any` — strongly discouraged; acceptable only as a documented workaround for an external/untyped API | `const d: any = f()` | `const d: MyType = f()`, or `unknown` plus narrowing |
| 10 | Boolean properties default to `false` | `@property({ type: Boolean }) open = true` | `@property({ type: Boolean }) open = false` |
| 11 | Bubbled handlers that resolve a child component use `composedPath()`, not `event.target` | `e.target as ChildElement` when the event bubbles up from a child component | `e.composedPath()[0] as ChildElement` |

## Structural

| # | Rule | Wrong | Right |
|---|------|-------|-------|
| 12 | Private `@property` fields get `noAttribute: true`, unless a CSS selector reads the attribute | `@property({ type: Boolean }) _open = false` | `@property({ type: Boolean, noAttribute: true }) _open = false` |
| 13 | Non-rendered state is a plain field | `@property() _lastKey = ""` | `_lastKey = ""` |
| 14 | Event ordering matches the pattern — value/selection changes mutate then fire (revert if prevented); lifecycle events fire first and act only if not prevented | one pattern applied to the wrong case | value/selection: mutate, then fire; lifecycle: fire, then act if not prevented |
| 15 | Revert state when a cancelable event is prevented | fire and ignore the return value | revert if `fireDecoratorEvent` returns `false` |
| 16 | Focusable components are reachable via `focus()` — either `delegatesFocus: true`, or an inner focusable element found through `getFocusDomRef()` | neither `delegatesFocus` nor an inner focus target | `shadowRootOptions: { delegatesFocus: true }`, **or** `tabindex` on the inner element (the majority pattern) |
| 17 | Children never reach for their parent | `this.parentElement as Table` | the child fires, the parent listens |
| 18 | Public properties change only in response to user interaction | reassigns `this.value` from a timer or observer | update on user action, then fire the event |
| 19 | State is declared, not commanded | `show(): void` | `@property({ type: Boolean }) open = false` |
| 20 | `fireDecoratorEvent`, never `fireEvent` | `this.fireEvent("change", d, true, true)` | `this.fireDecoratorEvent("change", d)` |
| 21 | Strict decorators only | `decorators/slot.js`, `decorators/event.js` | `decorators/slot-strict.js`, `decorators/event-strict.js` |
| 22 | Relative imports end in `.js` | `from "./Button"` | `from "./Button.js"` |
| 23 | Keyboard checks use the `Keys.js` predicates where one exists | `e.key === "Enter"` | `isEnter(e)` |
| 24 | Register and deregister external listeners in `onEnterDOM`/`onExitDOM` | `connectedCallback`/`disconnectedCallback` overrides; `document.addEventListener` with no matching `removeEventListener` in `onExitDOM` | `ResizeHandler.register`/`deregister` in `onEnterDOM`/`onExitDOM`; paired `document.addEventListener`/`removeEventListener` with the same bound handler and options |

## Quality

| # | Rule | Wrong | Right |
|---|------|-------|-------|
| 25 | Import every icon explicitly | assume the icon is globally available | `import download from "@ui5/webcomponents-icons/dist/download.js"` |
| 26 | Logical CSS direction properties | `margin-left`, `text-align: left` | `margin-inline-start`, `text-align: start` |
| 27 | Descriptive names in samples | `mgr`, `da`, `q`, `asc` | `itemManager`, `dateA`, `searchQuery`, `isAscending` |
| 28 | No issue or PR numbers in comments | `// fixes #1234` | state the constraint, or nothing |
| 29 | Comments state constraints, not what the code does | `// increment the counter` | `// Popover measures its opener, so this must run after layout` |

## Reviewing a diff

`yarn lint:scope` catches tag-name selector violations mechanically. The rest require eyes.

| # | Spot it | Checked by |
|---|---------|------------|
| 1 | `design: ButtonDesign` instead of `` `${ButtonDesign}` ``, or `= ButtonDesign.Default` instead of `= "Default"` | review only |
| 2 | `querySelector("ui5-` | `yarn lint:scope` for `.ts`; review for `.tsx` |
| 3 | a bare `ui5-*` selector in `.css` | `yarn lint:scope` |
| 4 | `instanceof` followed by a UI5 class name | review only |
| 5 | `.tagName ===` against `"UI5-*"` (native tags like `INPUT`, `IMG`, `SLOT`, `IFRAME` are fine) | review only |
| 6 | an assignment to a property of a `@query` ref | review only |
| 7 | `setAttribute`/`removeAttribute` on a child UI5 element (calling it on `this` in a lifecycle hook, on native HTML elements, or for browser-API-required attributes like `popover="manual"` is legitimate) | review only |
| 8 | `.classList.add/remove/toggle(` for persistent state (animation-trigger classes, read-only `.classList.contains`, and marking state on elements outside your shadow tree are legitimate) | review only |
| 9 | `: any`, `as any` | review only |
| 10 | `@property({ type: Boolean })` with `= true` | review only |
| 11 | `e.target as` in a bubbled handler that resolves a child component | review only |
| 12 | a `@property` named `_*` with no `noAttribute` and no matching `:host([_*])` selector | review only |
| 13 | a `@property` whose name never appears in the `.tsx` or `.css` | review only |
| 14 | `fireDecoratorEvent` called before the state change on a value/selection event, or state changed before firing on a lifecycle event | review only |
| 15 | `fireDecoratorEvent` for a `cancelable` event with the result discarded | review only |
| 16 | a template `tabindex`/`focus()` override **and** no `delegatesFocus` — only a problem if there is also no inner focus target; the inner-element pattern is valid and common | review only |
| 17 | `this.parentElement`, `this.closest(`, `this.getRootNode().host` | review only |
| 18 | a `@public` property assigned from a timer, observer, or fetch callback | review only |
| 19 | a new `@public` method named `open`, `show`, `close`, `toggle`, `refresh`, `expand`, `reset` | review only |
| 20 | `.fireEvent(` on anything (`this` or a child element) | review only |
| 21 | `decorators/slot.js`, `decorators/event.js` | review only |
| 22 | a relative import with no extension | `yarn lint` — `import/extensions` |
| 23 | `e.key ===`, `e.keyCode` when a `Keys.js` predicate covers that key | review only |
| 24 | `ResizeHandler.register`, `document.addEventListener`, or similar registered outside `onEnterDOM`/`onExitDOM`, or with no symmetric deregister | review only |
| 25 | an icon name in a template with no matching import | review only |
| 26 | `margin-left`, `padding-right`, `border-left`, bare `left:`/`right:`, `text-align: left` | review only |
| 27 | short identifiers in `_samples/` | review only |
| 28 | `#` followed by digits in a comment | review only |
| 29 | a comment that restates the line under it | review only |

## Enum import and comparison

Blocking rule 1 covers property declarations. Import style and runtime comparisons are not a single
house rule — match the import to the usage:

- `import type` when the enum appears only in type position.
- `import` (runtime) when members are compared in code (`=== TagDesign.Positive`).
- Both `ButtonDesign.Transparent` and `"Transparent"` appear in the codebase; pick one style per file
  and stay consistent within it.

```ts
import type WrappingType from "./types/WrappingType.js";
@property()
wrappingType: `${WrappingType}` = "Normal";

import TagDesign from "./types/TagDesign.js";
if (this.design === TagDesign.Positive) { /* ... */ }
```

The enum file stays a real TypeScript enum and stays exported for consumers.

## Why attribute selectors

Applications can register these components under scoped tag names so two versions of the library can
coexist on one page. `ui5-button` becomes `ui5-button-f5331039`, and every tag-name selector silently
stops matching. The `ui5-button` attribute is present either way.

`yarn lint:scope` fails on bare `ui5-*` selectors in `src/**/*.css` and on `querySelector("ui5-...")` in
`src/**/*.ts`. It does not read `.tsx`.

## Why not `instanceof`

Same scoping problem, plus module duplication: with two copies of the library loaded, `Button` from
copy A is not the same class object as `Button` from copy B.

```ts
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";

class MenuItem extends UI5Element {
  get isMenuItem(): boolean { return true; }   // the duck-typing marker
}

export const isInstanceOfMenuItem = createInstanceChecker<MenuItem>("isMenuItem");
```

This applies to UI5 component classes only. `instanceof HTMLElement`, `instanceof Node`,
`instanceof Date` and the like are fine. `tagName ===` against native tags (`INPUT`, `IMG`, `SLOT`,
`IFRAME`, `TEXTAREA`) is also fine. Some current code still uses `instanceof` against UI5 classes
(Toolbar, NotificationList, ShellBar, UserMenuItem, Popover) — treat these as legacy, not precedent.

## Why `@query` is read-only

`@query` is a live reference into your own shadow DOM. Call methods on it; do not assign, because the
next render overwrites the assignment from the template and the value flickers or reverts.

```ts
import query from "@ui5/webcomponents-base/dist/decorators/query.js";

@query("[ui5-input]")
_input!: Input;

this._input?.focus();        // fine
this._input.value = "x";     // wrong — the next render undoes this
```

Put the value in the template: `<Input value={this.inputValue} />`.

## Why `@property` is not free

Every assignment to a `@property` schedules a re-render. If nothing in the template or the CSS reads
the field, that render is waste, and a render mid-interaction runs `onBeforeRendering`, which can
overwrite state the user is editing.

```ts
@property({ type: Boolean, noAttribute: true })
_isOpen = false;             // the template reads it — property is correct

_lastPressedKey = "";        // only JS reads it — plain field is correct
```

`noAttribute: true` is the convention for internal state (not the framework default — the framework
reflects by default), but drop it when a CSS selector reads the attribute — `:host([_open])` needs the
attribute to exist.

## Why `onEnterDOM` / `onExitDOM`

`UI5Element` owns `connectedCallback` and `disconnectedCallback`. Override `onEnterDOM` and
`onExitDOM` instead — they run after the first render and only when the element was fully connected,
so `getDomRef()` and shadow DOM are ready. Register every external listener here:
`ResizeHandler`, `document`/`window` listeners, `IntersectionObserver`, language-change handlers.
Deregister symmetrically in `onExitDOM` with the **same bound reference and options** — a fresh arrow
each time never matches and leaks. See `Breadcrumbs.ts`, `AvatarGroup.ts`, `RangeSlider.ts`, and
`StepInput.ts`.

## Why event ordering matters

Two patterns coexist — see `api-design.md` under Cancelable events. Value and selection changes
mutate first so listeners see the new state; revert if `fireDecoratorEvent` returns `false`. Lifecycle
events fire first and act only if not prevented.

```ts
this.checked = !this.checked;
if (!this.fireDecoratorEvent("change")) {
  this.checked = !this.checked;   // a listener prevented it
}
```

## Why children must not know their parent

`this.parentElement as Table` breaks the moment the child is wrapped in a `div`, slotted somewhere
unexpected, or rendered standalone in a test, and it creates a module cycle.

```ts
// wrong — a child reaching for its parent
const row = this.parentElement as TableRow | null;

// right — the child announces, the parent decides
this.fireDecoratorEvent("selection-change", { selected: this.selected });
```

A few such casts remain in Table and Tree internals, where the parent contract is fixed. New components do not get that exemption.

## Why the API is declarative

Applications describe the state they want and the component gets itself there. A method forces every
React, Vue, and Angular consumer out of its own rendering model to hold a ref; a property is one
attribute binding.

```html
<ui5-date-picker open></ui5-date-picker>
```

A verb in a public API name is the signal: `open` the adjective is a property, `open()` the verb is
not. When the user does something that changes that state — pressing Escape, for instance — the
component updates its own property and fires the matching event.

## When imperative DOM calls are legitimate

These are the known production exceptions to rules 7 and 8. They are narrow — do not expand them.

**`this.setAttribute` on the component's own host in a lifecycle hook** — for browser-API-required
attributes (`popover="manual"` must be a real DOM attribute for the native Popover API to activate)
and for platform-detection markers (`desktop`). Template binding cannot set attributes on `this`.

**Setting attributes on native HTML elements inside shadow DOM** — `<input>` elements accept
attributes like `autocomplete`, `pattern`, and `inputmode` that have no UI5 property-binding path.
Use `setAttribute` on them directly.

**Animation-trigger class toggling** — when a CSS animation must start imperatively (e.g., adding
`ui5-popup-opening` for 50 ms to trigger a CSS transition), the template re-renders synchronously and
would remove the class before the animation fires. `classList.add/remove` is the only viable path.

**Marking state on elements outside your shadow tree** — `classList.add` on an opener element owned
by another component (e.g., `SideNavigation` marking an external button active while a popover is
open) cannot use template binding because the element is not in your template.

**Read-only `classList.contains`** — checking a class for event routing (`target.classList.contains("ui5-mp-item")`)
is not DOM mutation and is not covered by rule 8.
