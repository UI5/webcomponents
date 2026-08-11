# Core Rules

Every rule here is absolute for code you write. Where legacy code violates one, the count is given so
you recognise it on sight — do not copy it, and do not migrate it as a drive-by. Counts are across
`packages/{main,fiori,ai}/src`.

## Blocking

| # | Rule | Wrong | Right |
|---|------|-------|-------|
| 1 | Enum imports: type-only when the enum is only used as a type; runtime when members are compared at runtime | `import type ButtonDesign from "./types/ButtonDesign.js"` when you write `ButtonDesign.Default` in code | `import type` for property declarations only; `import` (runtime) when comparing `=== ButtonDesign.Default` |
| 2 | Enum properties use template literal types | `design: ButtonDesign = ButtonDesign.Default` | ``design: `${ButtonDesign}` = "Default"`` |
| 3 | Enum comparisons use dot notation | `if (this.design === "Transparent")` | `if (this.design === ButtonDesign.Transparent)` |
| 4 | Query and test by attribute | `querySelector("ui5-popover")`, `cy.get("ui5-button")` | `querySelector("[ui5-popover]")`, `cy.get("[ui5-button]")` |
| 5 | Style by attribute | `ui5-button { }` | `[ui5-button] { }` |
| 6 | Identify UI5 components with an instance checker | `el instanceof Button` | `isInstanceOfButton(el)` |
| 7 | Never compare `tagName` against a UI5 tag | `el.tagName === "UI5-BUTTON"` | `isInstanceOfButton(el)` |
| 8 | Set child state through the template | `this._input.value = x` | `<Input value={x} />` |
| 9 | No imperative attribute mutation on child UI5 elements | `childUi5El.setAttribute("disabled", "")` | `<El disabled={this.isDisabled} />` |
| 10 | No class toggling for persistent state | `el.classList.add("active")` to track open/selected state | `:host([active]) { }` driven by a `@property` |
| 11 | No `any` | `const d: any = f()` | `const d: MyType = f()`, or `unknown` plus narrowing |
| 12 | Boolean properties default to `false` | `@property({ type: Boolean }) open = true` | `@property({ type: Boolean }) open = false` |

## Structural

| # | Rule | Wrong | Right |
|---|------|-------|-------|
| 13 | Private `@property` fields get `noAttribute: true`, unless a CSS selector reads the attribute | `@property({ type: Boolean }) _open = false` | `@property({ type: Boolean, noAttribute: true }) _open = false` |
| 14 | Non-rendered state is a plain field | `@property() _lastKey = ""` | `_lastKey = ""` |
| 15 | Fire the event after the state update | fire, then mutate | mutate, then fire |
| 16 | Revert state when a cancelable event is prevented | fire and ignore the return value | revert if `fireDecoratorEvent` returns `false` |
| 17 | Focusable components set `delegatesFocus` | no `shadowRootOptions` | `shadowRootOptions: { delegatesFocus: true }` |
| 18 | Children never reach for their parent | `this.parentElement as Table` | the child fires, the parent listens |
| 19 | Public properties change only in response to user interaction | reassigns `this.value` from a timer or observer | update on user action, then fire the event |
| 20 | State is declared, not commanded | `show(): void` | `@property({ type: Boolean }) open = false` |
| 21 | `fireDecoratorEvent`, never `fireEvent` | `this.fireEvent("change", d, true, true)` | `this.fireDecoratorEvent("change", d)` |
| 22 | Strict decorators only | `decorators/slot.js`, `decorators/event.js` | `decorators/slot-strict.js`, `decorators/event-strict.js` |
| 23 | Relative imports end in `.js` | `from "./Button"` | `from "./Button.js"` |
| 24 | Keyboard checks use the `Keys.js` predicates where one exists | `e.key === "Enter"` | `isEnter(e)` |

## Quality

| # | Rule | Wrong | Right |
|---|------|-------|-------|
| 25 | Import every icon explicitly | rely on the test bundle | `import download from "@ui5/webcomponents-icons/dist/download.js"` |
| 26 | Assert against the i18n bundle, not English | `should("have.text", "Cancel")` | `Button.i18nBundle.getText(KEY)` |
| 27 | Logical CSS direction properties | `margin-left`, `text-align: left` | `margin-inline-start`, `text-align: start` |
| 28 | Real events in specs | `.click()`, `.type()` | `.realClick()`, `.realType()` |
| 29 | Never wait a fixed number of milliseconds | `cy.wait(300)` | assert the condition and let Cypress retry |
| 30 | Descriptive names in samples and test pages | `mgr`, `da`, `q`, `asc` | `itemManager`, `dateA`, `searchQuery`, `isAscending` |
| 31 | No issue or PR numbers in comments | `// fixes #1234` | state the constraint, or nothing |
| 32 | Comments state constraints, not what the code does | `// increment the counter` | `// Popover measures its opener, so this must run after layout` |

## Reviewing a diff

`yarn lint:scope` catches tag-name selector violations mechanically. The rest require eyes.

| # | Spot it | Checked by |
|---|---------|------------|
| 1 | `^import [A-Z]\w* from "\./types/` without `type` keyword — only a problem if the enum members are never used at runtime | review only |
| 2, 3 | A string literal like `=== "Default"` in a comparison where an enum member (`ButtonDesign.Default`) should be used | review only |
| 4 | `querySelector("ui5-`, `cy.get("ui5-` | `yarn lint:scope` for `.ts`; review for `.tsx` and specs |
| 5 | a bare `ui5-*` selector in `.css` | `yarn lint:scope` |
| 6 | `instanceof` followed by a UI5 class name | review only |
| 7 | `.tagName ===` against `"UI5-*"` (native tags like `INPUT`, `IMG`, `SLOT`, `IFRAME` are fine) | review only |
| 8 | an assignment to a property of a `@query` ref | review only |
| 9 | `setAttribute`/`removeAttribute` on a child UI5 element (calling it on `this` in a lifecycle hook, on native HTML elements, or for browser-API-required attributes like `popover="manual"` is legitimate) | review only |
| 10 | `.classList.add/remove/toggle(` for persistent state (animation-trigger classes, read-only `.classList.contains`, and marking state on elements outside your shadow tree are legitimate) | review only |
| 11 | `: any`, `as any` | review only |
| 12 | `@property({ type: Boolean })` with `= true` | review only |
| 13 | a `@property` named `_*` with no `noAttribute` and no matching `:host([_*])` selector | review only |
| 14 | a `@property` whose name never appears in the `.tsx` or `.css` | review only |
| 15 | `fireDecoratorEvent` above the assignments it describes | review only |
| 16 | `fireDecoratorEvent` for a `cancelable` event with the result discarded | review only |
| 17 | a template `tabindex` or a `focus()` override, with no `shadowRootOptions` | review only |
| 18 | `this.parentElement`, `this.closest(`, `this.getRootNode().host` | review only |
| 19 | a `@public` property assigned from a timer, observer, or fetch callback | review only |
| 20 | a new `@public` method named `open`, `show`, `close`, `toggle`, `refresh`, `expand`, `reset` | review only |
| 21 | `this.fireEvent(` | review only |
| 22 | `decorators/slot.js`, `decorators/event.js` | review only |
| 23 | a relative import with no extension | `yarn lint` — `import/extensions` |
| 24 | `e.key ===`, `e.keyCode` when a `Keys.js` predicate covers that key | review only |
| 25 | an icon name in a template with no matching import | review only |
| 26 | a quoted English string in a `should(` | review only |
| 27 | `margin-left`, `padding-right`, `border-left`, bare `left:`/`right:`, `text-align: left` | review only |
| 28 | `.click()`, `.type(` in a `.cy.tsx` | review only |
| 29 | `cy.wait(<digit>` | review only |
| 30 | short identifiers in `test/pages/` or `_samples/` | review only |
| 31 | `#` followed by digits in a comment | review only |
| 32 | a comment that restates the line under it | review only |

## Why enums need both import styles

A runtime import is required whenever you compare against an enum member by name (`=== ButtonDesign.Default`).
A type-only import is correct when the enum is only used in a property declaration as a template literal type.

```ts
// type-only: WrappingType is only used in the property type annotation
import type WrappingType from "./types/WrappingType.js";

@property()
wrappingType: `${WrappingType}` = "Normal";

// runtime: TagDesign is compared by member in a switch
import TagDesign from "./types/TagDesign.js";

if (this.design === TagDesign.Positive) { /* ... */ }
```

The same component can have both. The enum file stays a real TypeScript enum and stays exported for consumers. The distinction is purely about whether members are accessed at runtime inside component code.

Legacy: runtime imports still outnumber type-only ones across the codebase. Both forms appear in current code — the key is matching the import style to the usage.

## Why attribute selectors

Applications can register these components under scoped tag names so two versions of the library can
coexist on one page. `ui5-button` becomes `ui5-button-f5331039`, and every tag-name selector silently
stops matching. The `ui5-button` attribute is present either way.

`yarn lint:scope` fails on bare `ui5-*` selectors in `src/**/*.css` and on `querySelector("ui5-...")` in
`src/**/*.ts`. It does not read `.tsx` and it does not read specs, where a residue of `cy.get("ui5-...")`
calls survives among the attribute selectors.

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
`IFRAME`, `TEXTAREA`) is also fine.

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

`noAttribute: true` is the default for internal state, but drop it when a CSS selector reads the
attribute — `:host([_open])` needs the attribute to exist.

## Why event ordering matters

Listeners read component state when the event fires, so firing first shows them the old value. For a
cancelable event, `fireDecoratorEvent` returns `false` when a listener called `preventDefault()`, and
you must undo the change.

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

These are the known production exceptions to rules 9 and 10. They are narrow — do not expand them.

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
is not DOM mutation and is not covered by rule 10.
