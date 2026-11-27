# Core Rules

## Contents

- The rules — numbered wrong/right tables: Blocking (breaks scoping, typing, or framework behaviour), Structural (component design), Quality (style and readability)
- Reviewing a diff — which rules tooling catches and which need a manual check
- Enum import and comparison — when the enum import is type-only and how to compare values
- Why each rule exists — the reasoning behind the rules that are least obvious
- When rules 7 and 8 don't apply — the narrow cases where imperative DOM calls are correct

Consider these rules as modern guidelines when writing code. Legacy code may sometimes violate these
patterns; avoid copying patterns from legacy code.

## Blocking

| # | Rule | Wrong | Right |
|---|------|-------|-------|
| 1 | Enum properties use template literal types and a string-literal default | `design: ButtonDesign = ButtonDesign.Default` | ``design: `${ButtonDesign}` = "Default"`` |
| 2 | Query by attribute | `querySelector("ui5-popover")` | `querySelector("[ui5-popover]")` |
| 3 | Style by attribute | `ui5-button { }` | `[ui5-button] { }` |
| 4 | Identify UI5 components with an instance checker | `el instanceof Button` | `isInstanceOfButton(el)` |
| 5 | Never compare `tagName` against a UI5 tag — native tags (`INPUT`, `IMG`, `SLOT`, `IFRAME`) are fine | `el.tagName === "UI5-BUTTON"` | `isInstanceOfButton(el)` |
| 6 | Set child state through the template | `this._input.value = x` — any assignment to a property of a `@query` ref | `<Input value={x} />` |
| 7 | No imperative attribute mutation on child UI5 elements — exceptions in "When rules 7 and 8 don't apply" | `childUi5El.setAttribute("disabled", "")` | `<El disabled={this.isDisabled} />` |
| 8 | No class toggling for persistent state — exceptions in "When rules 7 and 8 don't apply" | `el.classList.add("active")` to track open/selected state | `:host([active]) { }` driven by a `@property` |
| 9 | No `any` — strongly discouraged; acceptable only as a documented workaround for an external/untyped API | `const d: any = f()`, `as any` | `const d: MyType = f()`, or `unknown` plus narrowing |
| 10 | Boolean properties default to `false` | `@property({ type: Boolean }) open = true` | `@property({ type: Boolean }) open = false` |
| 11 | Bubbled handlers that resolve a child component use `composedPath()`, not `event.target` | `e.target as ChildElement` when the event bubbles up from a child component | `e.composedPath()[0] as ChildElement` |

## Structural

| # | Rule | Wrong | Right |
|---|------|-------|-------|
| 12 | Private `@property` fields get `noAttribute: true`, unless a CSS selector reads the attribute | `@property({ type: Boolean }) _open = false` with no `:host([_open])` selector | `@property({ type: Boolean, noAttribute: true }) _open = false` |
| 13 | Non-rendered state is a plain field | `@property() _lastKey = ""` — a `@property` the `.tsx` and `.css` never read | `_lastKey = ""` |
| 14 | A property the user already changed is applied before the event fires, and reverted if the event is prevented; a request that has not happened yet fires first | `if (!this.fireDecoratorEvent("change")) { return; }` then `this.checked = !this.checked;` — a `change` listener reads the old value; or firing a cancelable event and ignoring the return value | already applied (`checked`, `value`, selection): change, fire, revert if `fireDecoratorEvent` returns `false`. Not yet applied (`before-open`, `before-close`, `tab-select`, `item-toggle`): fire, act only if not prevented |
| 15 | Focusable components are reachable via `focus()` — either `delegatesFocus: true`, or an inner focusable element found through `getFocusDomRef()` | neither `delegatesFocus` nor an inner focus target | `shadowRootOptions: { delegatesFocus: true }`, **or** `tabindex` on the inner element (the majority pattern) |
| 16 | Children never reach for their parent | `this.parentElement as Table`, `this.closest(`, `this.getRootNode().host` | the child fires, the parent listens |
| 17 | Public properties change only in response to user interaction | reassigns `this.value` from a timer, observer, or fetch callback | update on user action, then fire the event |
| 18 | State is declared, not commanded | `show(): void` — a new public method that sets a resting state: `open`, `show`, `close`, `toggle`, `expand` | `@property({ type: Boolean }) open = false` |
| 19 | `fireDecoratorEvent`, never `fireEvent` | `this.fireEvent("change", d, true, true)`, or `.fireEvent(` on a child | `this.fireDecoratorEvent("change", d)` |
| 20 | Strict decorators only | `decorators/slot.js`, `decorators/event.js` | `decorators/slot-strict.js`, `decorators/event-strict.js` |
| 21 | Relative imports end in `.js` | `from "./Button"` | `from "./Button.js"` |
| 22 | Keyboard checks use the `Keys.js` predicates where one exists | `e.key === "Enter"`, `e.keyCode` | `isEnter(e)` |
| 23 | Register and deregister external listeners in `onEnterDOM`/`onExitDOM` | `connectedCallback`/`disconnectedCallback` overrides; `document.addEventListener` with no matching `removeEventListener` in `onExitDOM` | `ResizeHandler.register`/`deregister` in `onEnterDOM`/`onExitDOM`; paired `document.addEventListener`/`removeEventListener` with the same bound handler and options |

## Quality

| # | Rule | Wrong | Right |
|---|------|-------|-------|
| 24 | Import every icon explicitly | an icon name in a template with no matching import | `import download from "@ui5/webcomponents-icons/dist/download.js"` |
| 25 | Logical CSS direction properties | `margin-left`, `padding-right`, `border-left`, bare `left:`/`right:`, `text-align: left` | `margin-inline-start`, `inset-inline-start`, `text-align: start` |
| 26 | Descriptive names | `mgr`, `fd`, `q`, `asc` | `itemManager`, `firstDate`, `searchQuery`, `isAscending` |
| 27 | No issue or PR numbers in comments | `// fixes #1234` | state the constraint, or nothing |
| 28 | Comments state constraints, not what the code does | `// increment the counter` | `// Popover measures its opener, so this must run after layout` |

## Reviewing a diff

Check every changed line against the **Wrong** column above. Tooling catches little of it:
`yarn lint:scope` covers 2 (in `.ts` only, not `.tsx`) and 3 (in `src/**/*.css`); `yarn lint` covers 21
(`import/extensions`) and flags a runtime enum import that is only used as a type
(`consistent-type-imports`). Everything else needs eyes. Before flagging 7 or 8, check "When rules 7
and 8 don't apply"; before flagging 15, confirm there is no inner focus target either.

## Enum import and comparison

Rule 1 covers the property declaration. The import follows from how the code uses the enum:

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

The template-literal type applies to the property only. The enum in `src/types/` stays an exported
TypeScript `enum` for applications to use; do not replace it with a string-union type.

## Why attribute selectors

Applications can register these components under scoped tag names so two versions of the library can
coexist on one page. `ui5-button` becomes `ui5-button-f5331039`, and every tag-name selector silently
stops matching. The `ui5-button` attribute is present either way.

## Why not `instanceof`

Each copy of the library — a second scoped version, or a module the bundler duplicated — has its own
`Button` class, so `el instanceof Button` is `false` for a button from the other copy. That matters
whenever a component recognises one it did not create: a slotted child, an element found in
`composedPath()`, or the item behind an event. A duck-typing marker works across copies:

```ts
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";

class MenuItem extends UI5Element {
  get isMenuItem(): boolean { return true; }   // the duck-typing marker
}

export const isInstanceOfMenuItem = createInstanceChecker<MenuItem>("isMenuItem");
```

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
attribute to exist. `@private` only hides a property from the docs; without `noAttribute: true` it
still reflects.

## Why `onEnterDOM` / `onExitDOM`

`UI5Element` owns `connectedCallback` and `disconnectedCallback`. Override `onEnterDOM` and
`onExitDOM` instead — they run after the first render and only when the element was fully connected,
so `getDomRef()` and shadow DOM are ready. Register every external listener here:
`ResizeHandler`, `document`/`window` listeners, `IntersectionObserver`, language-change handlers.
Deregister symmetrically in `onExitDOM` with the **same bound reference and options** — a fresh arrow
each time never matches and leaks. See `Breadcrumbs.ts`, `AvatarGroup.ts`, `RangeSlider.ts`, and
`StepInput.ts`.

## Why event ordering matters

Listeners rely on the order. A `change` listener reads the new value from the component, so the user's
change must already be applied when the event fires; preventing the event reverts it. A `before-open`
or `tab-select` listener must be able to stop something that has not happened yet, so the component
fires first and acts only if the event was not prevented (`Popup`, `TabContainer`).

```ts
this.checked = !this.checked;
if (!this.fireDecoratorEvent("change")) {
  this.checked = !this.checked;   // a listener prevented it
}
```

## Why children must not know their parent

A child component does not choose its parent: the application composes it, and the same child can sit
in different containers, inside a wrapper `div`, or alone in a test. A child that reads
`this.parentElement as Table` breaks in all of those cases, and importing the parent class creates a
circular import between the two modules. So information flows one way: the parent reads its slotted
children, and the child reports changes by firing events.

```ts
// wrong — a child reaching for its parent
const row = this.parentElement as TableRow | null;

// right — the child announces, the parent decides
this.fireDecoratorEvent("selection-change", { selected: this.selected });
```

## Why the API is declarative

Applications describe the state they want and the component gets itself there. A method forces every
React, Vue, and Angular consumer out of its own rendering model to hold a ref; a property is one
attribute binding.

```html
<ui5-date-picker open></ui5-date-picker>
```

A verb in a public API name is the signal: `open` the adjective is a property, `open()` the verb is
not. How the component updates that property itself on user interaction is in `api-design.md`
(When a component may change its own public property).

## When rules 7 and 8 don't apply

These are the cases where rules 7 and 8 do not apply, listed so a review does not flag them. They are
narrow — do not expand them.

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
