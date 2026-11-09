# Core Rules

## Contents

- The rules: Blocking, Structural, Quality
- Reviewing a diff
- Enum import and comparison
- Why each rule exists: attribute selectors, not `instanceof`, `@query` is read-only, `@property` is not free, `onEnterDOM` / `onExitDOM`, event ordering, children must not know their parent, the API is declarative
- When imperative DOM calls are legitimate

Every rule here is what you follow in code you write. Legacy code may violate them, sometimes at
scale — do not copy those patterns, and do not migrate them as a drive-by. A rule being listed here
does not mean the codebase is fully following it; it means new code must not add legacy practices.

## Blocking

| # | Rule | Wrong | Right |
|---|------|-------|-------|
| 1 | Enum properties use template literal types and a string-literal default | `design: ButtonDesign = ButtonDesign.Default` | ``design: `${ButtonDesign}` = "Default"`` |
| 2 | Query by attribute | `querySelector("ui5-popover")` | `querySelector("[ui5-popover]")` |
| 3 | Style by attribute | `ui5-button { }` | `[ui5-button] { }` |
| 4 | Identify UI5 components with an instance checker | `el instanceof Button` | `isInstanceOfButton(el)` |
| 5 | Never compare `tagName` against a UI5 tag — native tags (`INPUT`, `IMG`, `SLOT`, `IFRAME`) are fine | `el.tagName === "UI5-BUTTON"` | `isInstanceOfButton(el)` |
| 6 | Set child state through the template | `this._input.value = x` — any assignment to a property of a `@query` ref | `<Input value={x} />` |
| 7 | No imperative attribute mutation on child UI5 elements — exceptions listed in section "When imperative DOM calls are legitimate" | `childUi5El.setAttribute("disabled", "")` | `<El disabled={this.isDisabled} />` |
| 8 | No class toggling for persistent state — exceptions listed in section "When imperative DOM calls are legitimate" | `el.classList.add("active")` to track open/selected state | `:host([active]) { }` driven by a `@property` |
| 9 | No `any` — strongly discouraged; acceptable only as a documented workaround for an external/untyped API | `const d: any = f()`, `as any` | `const d: MyType = f()`, or `unknown` plus narrowing |
| 10 | Boolean properties default to `false` | `@property({ type: Boolean }) open = true` | `@property({ type: Boolean }) open = false` |
| 11 | Bubbled handlers that resolve a child component use `composedPath()`, not `event.target` | `e.target as ChildElement` when the event bubbles up from a child component | `e.composedPath()[0] as ChildElement` |

## Structural

| # | Rule | Wrong | Right |
|---|------|-------|-------|
| 12 | Private `@property` fields get `noAttribute: true`, unless a CSS selector reads the attribute | `@property({ type: Boolean }) _open = false` with no `:host([_open])` selector | `@property({ type: Boolean, noAttribute: true }) _open = false` |
| 13 | Non-rendered state is a plain field | `@property() _lastKey = ""` — a `@property` the `.tsx` and `.css` never read | `_lastKey = ""` |
| 14 | Event ordering matches the pattern — value/selection changes mutate then fire (revert if prevented); lifecycle events fire first and act only if not prevented | one pattern applied to the wrong case | value/selection: mutate, then fire; lifecycle: fire, then act if not prevented |
| 15 | Revert state when a cancelable event is prevented | fire and ignore the return value | revert if `fireDecoratorEvent` returns `false` |
| 16 | Focusable components are reachable via `focus()` — either `delegatesFocus: true`, or an inner focusable element found through `getFocusDomRef()` | neither `delegatesFocus` nor an inner focus target | `shadowRootOptions: { delegatesFocus: true }`, **or** `tabindex` on the inner element (the majority pattern) |
| 17 | Children never reach for their parent | `this.parentElement as Table`, `this.closest(`, `this.getRootNode().host` | the child fires, the parent listens |
| 18 | Public properties change only in response to user interaction | reassigns `this.value` from a timer, observer, or fetch callback | update on user action, then fire the event |
| 19 | State is declared, not commanded | `show(): void` — a new public method that sets a resting state: `open`, `show`, `close`, `toggle`, `expand` | `@property({ type: Boolean }) open = false` |
| 20 | `fireDecoratorEvent`, never `fireEvent` | `this.fireEvent("change", d, true, true)`, or `.fireEvent(` on a child | `this.fireDecoratorEvent("change", d)` |
| 21 | Strict decorators only | `decorators/slot.js`, `decorators/event.js` | `decorators/slot-strict.js`, `decorators/event-strict.js` |
| 22 | Relative imports end in `.js` | `from "./Button"` | `from "./Button.js"` |
| 23 | Keyboard checks use the `Keys.js` predicates where one exists | `e.key === "Enter"`, `e.keyCode` | `isEnter(e)` |
| 24 | Register and deregister external listeners in `onEnterDOM`/`onExitDOM` | `connectedCallback`/`disconnectedCallback` overrides; `document.addEventListener` with no matching `removeEventListener` in `onExitDOM` | `ResizeHandler.register`/`deregister` in `onEnterDOM`/`onExitDOM`; paired `document.addEventListener`/`removeEventListener` with the same bound handler and options |

## Quality

| # | Rule | Wrong | Right |
|---|------|-------|-------|
| 25 | Import every icon explicitly | an icon name in a template with no matching import | `import download from "@ui5/webcomponents-icons/dist/download.js"` |
| 26 | Logical CSS direction properties | `margin-left`, `padding-right`, `border-left`, bare `left:`/`right:`, `text-align: left` | `margin-inline-start`, `inset-inline-start`, `text-align: start` |
| 27 | Descriptive names in samples | `mgr`, `fd`, `q`, `asc` | `itemManager`, `firstDate`, `searchQuery`, `isAscending` |
| 28 | No issue or PR numbers in comments | `// fixes #1234` | state the constraint, or nothing |
| 29 | Comments state constraints, not what the code does | `// increment the counter` | `// Popover measures its opener, so this must run after layout` |

## Reviewing a diff

Check every changed line against the **Wrong** column above. Tooling catches little of it:
`yarn lint:scope` covers 2 (in `.ts` only, not `.tsx`) and 3; `yarn lint` covers 22
(`import/extensions`) and flags a runtime enum import that is only used as a type
(`consistent-type-imports`). Everything else needs eyes. Before flagging 7 or 8, check "When imperative DOM
calls are legitimate"; before flagging 16, confirm there is no inner focus target either.

## Enum import and comparison

Blocking rule 1 covers the property declaration. The import follows from how the code uses the enum:

- Only as a type — `import type`. `yarn lint` rejects a runtime import here.
- Its members are read at runtime — a comparison or a fallback value — a runtime import is fine.

`Avatar.ts` shows both:

```ts
import type AvatarShape from "./types/AvatarShape.js";   // only in the property type
import AvatarMode from "./types/AvatarMode.js";          // members compared at runtime

@property()
shape: `${AvatarShape}` = "Circle";

if (this.mode === AvatarMode.Decorative) { /* ... */ }
```

Comparing a type-only import against a string literal (`this.design === "Positive"`) is equally valid.
Pick one form per enum within a file, match the file you are editing, and do not migrate the other form
as a drive-by.

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

**Animation-trigger class toggling** — when a CSS animation must start imperatively (e.g., adding
`ui5-popup-opening` for 50 ms to trigger a CSS transition), the template re-renders synchronously and
would remove the class before the animation fires. `classList.add/remove` is the only viable path.

**Marking state on elements outside your shadow tree** — `classList.add` on an opener element owned
by another component (e.g., `SideNavigation` marking an external button active while a popover is
open) cannot use template binding because the element is not in your template.

**Read-only `classList.contains`** — checking a class for event routing (`target.classList.contains("ui5-mp-item")`)
is not DOM mutation and is not covered by rule 8.
