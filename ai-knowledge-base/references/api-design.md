# Public API Design

Properties, slots, events, methods, CSS parts, and the JSDoc that documents them.

JSDoc is validated when the Custom Elements Manifest is generated, by `yarn generateAPI`. Neither
`yarn ts` nor `yarn start` runs it, so a documentation error is invisible while you type and fails
later. Run `yarn generateAPI` before declaring an API change done.

`core-rules.md` carries the declarative-API rule and the rules on event ordering, boolean defaults,
and strict decorators. This file covers how to shape and document the API, not why.

## Choosing the mechanism

| The application needs to… | Use |
|---------------------------|-----|
| Configure a value or a mode | property — `design`, `disabled`, `placeholder` |
| Put the component into a state | property — `open`, `collapsed`, `selected` |
| Supply markup, or a component the host must talk to | slot — `content`, `header`, `valueStateMessage` |
| React to something the user did | event — `click`, `selection-change` |
| Restyle an internal element | CSS part |
| Add an optional capability that carries its own API | a slotted subcomponent — see Features below |
| Compute something the property model cannot express | public method |

Prefer a property. A public method is justified in three cases and no others: a pure computation over
an argument (`isValidValue(value)`, `formatValue(date)`), a transient action with no resting state
(`navigateTo`, `reset`, `closeOverflow`), or handing out a DOM reference. A method that would only
flip a boolean the application already owns should be a property.

`open` is the canonical state property. It is inherited from `Popup` by `Popover`, `Dialog`, and
`ResponsivePopover` rather than redeclared, and also exists on `Menu`, `Input`, `ComboBox`,
`MultiComboBox`, `Toast`, and the pickers. `Select` does **not** expose one — it tracks open state
in `opened`, marked `@private` (so it's out of the public API and docs), though it still reflects as
an attribute since it isn't `noAttribute`.

### Writing your own public property

A component writes its own public property when a user interaction or its own lifecycle changes that
state, then fires the matching event in the same handler. This is the normal pattern, not an
exception — `CheckBox.checked`, `Panel.collapsed`, and `Input.value` all follow it.

```ts
_afterPopoverClose() {
	this.open = false;
	this.fireDecoratorEvent("close");
}
```

What is forbidden is different: never write to a *child or sibling* component's public property from
JavaScript — pass the value through the template — and never write your own public property from a
timer, observer, or fetch callback. See `core-rules.md`.

### Features: capability as a slotted subcomponent

When an optional capability carries its own properties, events, state, and bundle cost, model it as a
subcomponent the application slots in rather than as properties on the host.

For example `Table` has one `features` slot typed to an `ITableFeature` interface that declares lifecycle hooks (`onTableActivate`, `onTableBeforeRendering`, `onTableAfterRendering`), and looks features up by a string `identifier`, never by class. Because `TableSelectionMulti`, `TableGrowing`, and `TableVirtualizer` are separate imports, a table that does not select does not pay for selection.

## Properties

```ts
/**
 * Defines the component design.
 * @default "Default"
 * @public
 */
@property()
design: `${ButtonDesign}` = "Default";
```

`type`, `noAttribute`, and `converter` are the only options that exist.

| Option | Effect |
|--------|--------|
| `@property()` | String, reflected as an attribute. `{ type: String }` is the same thing written out |
| `{ type: Number }` | Reflected. Never coerces — assigning a string stores the string |
| `{ type: Boolean }` | Presence-based attribute |
| `{ type: Object }`, `{ type: Array }` | Not reflected outbound. An author-set attribute is still parsed inbound with `JSON.parse` |
| `{ noAttribute: true }` | No attribute in either direction |
| `{ converter: { fromAttribute, toAttribute } }` | Custom serialisation. `converters/DOMReference.js` already exists for `opener`-style properties that accept an element or an id string |

Reflection notes that cause bug reports: `undefined` and `null` remove the attribute, while `""`
leaves a present, empty one. Nothing is reflected before the first render, so reading `getAttribute`
in a constructor or early in a test sees nothing. In dev mode a type mismatch logs a `[UI5-FWK]`
console error and stops converting that attribute — that message is the fastest way to spot a
missing `type`.

### `@default`

Required on every public property. A literal initializer satisfies it on its own, so most properties
need no tag. A property with **no** initializer needs the tag written explicitly:

```ts
/**
 * @default undefined
 * @public
 */
@property()
icon?: string;
```

Public getters need it too. This is the most common CEM failure on a new API.

### Boolean polarity

No public boolean property in this library defaults to `true` — CEM rejects it. When the behaviour
you want is on by default, invert the name so `false` is the default, using the prefix that matches
what is being turned off:

| Prefix | For | Examples |
|--------|-----|----------|
| `hide*` | a rendered sub-element that is shown by default | `hideArrow`, `hideCloseButton`, `hideWeekNumbers` |
| `no*` | an automatic behaviour | `noTypeahead`, `noAnimation`, `noAutoSelection` |
| `prevent*` | a focus or closing side effect | `preventFocusRestore`, `preventInitialFocus` |
| `disable*` | a whole capability, distinct from `disabled` | `disableResizing`, `disableSearchCollapse` |

The mirror case is `show*` with a `false` default (`showSuggestions`, `showClearIcon`). Pick the
polarity that makes `false` correct, then name accordingly. `suppress*`, `without*`, and `omit*` are
not used here.

### `@property` on a setter

The decorator works on an accessor pair, and this is how every state property with a side effect is
written — `Popup.open` calls the open and close routines from its setter, `Popover.opener` re-opens
when it changes, `Select.value` stores into a backing field and reconciles against the slotted
options during `onBeforeRendering`. Put the JSDoc above the setter.

### Naming

| Name | Use for |
|------|---------|
| `design` | visual style |
| `type` | behavioural or semantic kind — `Button.type` drives form submit and reset |
| `mode` | how the component operates — Image/Text, Button/Scroll |
| `value` | the machine or form payload; `text` is the human-visible label |
| `selected` | on item components only. Containers get `selectionMode` |
| `collapsed` / `expanded` | pick the one whose `false` default is right — panels are expanded by default, tree nodes are collapsed |

`variant` is never used. `readonly` is spelled all-lowercase. Whether `text` is a property or a
default slot varies by component (`Button.text` is a slot; `MenuItem.text`, `Tab.text`, and
`ToolbarButton.text` are properties) — check the neighbour rather than assuming.

### Enums

Import the enum type-only, type the property as `` `${Enum}` ``, default it to a string literal, and
compare against string literals. The attribute path assigns a raw string, so a property typed as the
enum itself is a type lie. One enum per file in `src/types/`.

Much of the existing code violates this — importing enums as runtime values and comparing against
members like `ButtonDesign.Default`. Write the correct form; do not migrate neighbours as a drive-by.

### Accessibility properties

An interactive component carries `accessibleName` and `accessibleNameRef` as optional strings with no
default, `accessibleRole` typed to a component-specific enum rather than a raw ARIA role, and
`accessibilityAttributes` as `{ type: Object }` defaulting to `{}` and narrowed with
`Pick<AccessibilityAttributes, …>` to the fields it actually applies. `accessibleNameRef` needs a
registration in `onEnterDOM` to resolve — see `accessibility.md`.

### Form-associated components

`formAssociated: true` in `@customElement`, plus `formValidityMessage`, `formValidity`,
`formElementAnchor()`, and `formFormattedValue`. Mark the value member `@formProperty`, and
`@formEvents` with the space-separated names of the events that signal a change.

### Re-typing an inherited property

Narrowing a property from a base class needs `declare`, which emits no field and leaves the
framework's accessor intact:

```ts
declare selected: boolean;
```

Without it the class field shadows the prototype accessor, the component silently stops
invalidating, and the console warns that the property is "shadowed by the instance".

## Slots

Import the default export of `decorators/slot-strict.js`. From the `decorators.js` barrel the plain
`slot` export is the deprecated decorator, so alias: `slotStrict as slot`.

Two member types, both exported from `UI5Element.js`. Getting this wrong is the most common slot
mistake:

- `DefaultSlot<T>` — only for the slot declared `"default": true`
- `Slot<T>` — every named slot

```ts
@slot({ type: Node, "default": true })
text!: DefaultSlot<Node>;

@slot({ type: HTMLElement, invalidateOnChildChange: true })
badge!: Slot<ButtonBadge>;
```

| Option | Effect |
|--------|--------|
| `"default": true` | The unnamed slot. One per component; a second one throws |
| `type` | `typeof Node` or `typeof HTMLElement`. Validated at runtime per child with `instanceof`, and a mismatch **throws** — text-content slots need `Node` or a bare text node fails. Defaults to `HTMLElement` |
| `individualSlots: true` | Each child gets a generated slot name in `_individualSlot`, for templates that place children at unrelated positions |
| `invalidateOnChildChange` | `true`, or `{ properties, slots }` where each is a boolean or an array of names. An absent key means `false`. Omitting the option entirely means child changes never invalidate |

Blanket `true` on a slot holding hundreds of children is a performance bug — scope it to the
properties you read, as `Table` does for its rows. See `performance.md`.

Applications address a named slot by the **camelCase member name** — `slot="endContent"`, not
kebab-case. The default slot is a bare `<slot></slot>` in the template. With `individualSlots`, the
template reads the generated name off each child: `<slot name={step._individualSlot}></slot>`.

Read through a re-projected slot with `this.getSlottedNodes<T>(slotName)` — a method inherited from
`UI5Element` (the helper lives in `util/SlotsHelper.js`, but components call the method, they don't
import it). There is no `getSlottedElements`.

### Typing slot children

Constrain children with an interface, declared in the file of the component that *consumes* the slot
and exported as a type from it (e.g. `IMenuItem` in `Menu.ts`, `ITab` in `TabContainer.ts`). Extend
`HTMLElement` when any element qualifies, `UI5Element` when framework services are needed. The one
common exception is `IButton` below: it lives in `Button.ts` because `Button` is the shared building
block many containers slot, so the interface travels with the implementer rather than each consumer.

```ts
/**
 * Interface for components that may be used as a button inside numerous higher-order components
 * @public
 */
interface IButton extends HTMLElement, ITabbable {
	nonInteractive: boolean;
}
```

The slot references the interface while `type` stays `HTMLElement` — the interface is a compile-time
contract only: `startButton!: Slot<IButton>`. The implementing class adds `implements IButton`, an
`@implements {IButton}` JSDoc tag, and a duck-typing marker getter (`get isMenuItem() { return
true; }`) paired with `createInstanceChecker` exported from the bottom of its file. Never pass a
component class as a slot `type` — it reintroduces `instanceof` and breaks under scoping.

A slot with no accessor is documented with a class-level tag instead:
`@slot {Array<Node>} default - Defines the content…`

## Events

Import the default export of `decorators/event-strict.js`; from the barrel, `eventStrict as event`.
Omitted options default to `bubbles: false` and `cancelable: false`. Write the booleans as literals —
CEM reads them literally and records anything that is not a literal `false` as `true`.

`@customElement` must be present or CEM rejects the class, but the decorator order does not matter.
What does matter is that each JSDoc block sits immediately **above the decorator it documents**. An
`@event` with no JSDoc block is silently private: no error, and the event never reaches the docs or
the framework wrappers.

```ts
@customElement({ tag: "ui5-button", renderer: jsxRenderer, template: ButtonTemplate })
/**
 * Fired when the component is activated either with a mouse/tap or by using the Enter or Space key.
 * @public
 */
@event("click", {
	bubbles: true,
	cancelable: true,
})
class Button extends UI5Element implements IButton {
	eventDetails!: {
		"click": ButtonClickEventDetail,
		"active-state-change": void,
	};
}
```

Every event needs an `eventDetails` entry — `void` when there is no payload, otherwise a named
exported type. `@event("open")` with no options object is the right form for a plain, non-bubbling
event.

### Subclasses must re-declare `eventDetails`

The strict decorator resolves event names from `keyof this["eventDetails"]`, so a subclass that does
not re-declare it cannot fire its parent's events and cannot compile a new `@event`. Re-declare even
when adding nothing (`eventDetails!: Popup["eventDetails"];`), and put your own events **last** in
the intersection — CEM reads only the final member, so the reversed order compiles and then fails
validation:

```ts
eventDetails!: ListItem["eventDetails"] & {
	"before-open": MenuBeforeOpenEventDetail,
	"open": void,
}
```

Export every detail type from the module, or CEM rejects it as an undocumented public type.

### What one `fireDecoratorEvent` dispatches

Up to four events, all with `composed: false`. For a multi-word name like `selection-change` it fires
`ui5-selection-change` and `selection-change`, then repeats the pair PascalCased
(`ui5-SelectionChange`, `SelectionChange`). A single-word name like `open` fires four too —
`ui5-open`, `open`, `ui5-Open`, `Open` — because `kebabToPascalCase("open")` is `"Open"`, which
differs from the original and so is not skipped. The `ui5-` prefixed events always fire; the
un-prefixed ones are what no-conflict configuration suppresses, so listen to the prefixed name inside
the library. The PascalCase alias exists so React's `onSelectionChange` binds to a real dispatched
event.

Two consequences: a bubbling event stops at the first shadow boundary, so a host listening to its own
slotted children attaches listeners directly; and preventing the kebab-named event suppresses the
PascalCase form too, so a React consumer's handler silently does not run.

`fireDecoratorEvent` returns `false` when prevented:

```ts
const prevented = !this.fireDecoratorEvent("item-click", { item, text: item.text || "" });
```

| Aspect | Convention |
|--------|-----------|
| Name | kebab-case, and it must survive a round trip through `pascalToKebabCase` or `onX` binding breaks in templates |
| Privacy | Internal events carry no public JSDoc; the `_` prefix is a weak, inconsistently applied hint |
| `bubbles` | `false` for popup lifecycle events — `open`, `close`, `before-open`, `before-close` — because host components embed popovers and a bubbling `open` surfaces as the host's own. Also `false` across the Table family |

### Cancelable events

Two idioms coexist. Lifecycle events fire first and act only if not prevented (`Popup.openPopup`,
`TabContainer.selectTab`). Value and selection changes apply the change, fire, and revert if prevented
(`CheckBox.toggle`, `List` selection) — so a `change` listener sees the new value while a `before-open`
listener sees the old state. Use fire-then-act for new lifecycle events.

Setting `open` on a popup from application code runs the full event sequence, since the setter drives
it. Events here are not user-interaction-only.

## Public methods

Justified in the three cases listed under Choosing the mechanism. An explicit return type is
required; CEM fails without it. Add `@param` for each parameter and `@returns` for the result.

```ts
getSelectedRows(): TableRow[] {
	return this._table ? this._table.rows.filter(row => this.isSelected(row)) : [];
}
```

Expose focus by overriding `getFocusDomRef()`, not `focus()`. A named public focus entry point
(`Popup.applyFocus`) is rare and needs a reason.

## JSDoc that passes CEM

Every tag is checked twice: it must be allowed for that kind of member, and it must have the right
shape. A tag in the wrong shape fails with the same "Incorrect use of @tag" error as a disallowed
one, so the shape rules matter more than the error list.

| Tag | Shape |
|-----|-------|
| `@param` on a **method** | no braces — `@param selectedSet A set of row keys` |
| `@param` on an **event** | braces required — `@param {HTMLElement} item The previewed item` |
| `@returns` | text, no braces |
| `@implements` | braces — `@implements {IButton}` |
| `@extends` | no braces — `@extends UI5Element` |
| `@default` | a value only, no braces and no trailing description |
| `@since` | a version |
| `@csspart`, `@cssState` | `name - description`, no braces |
| `@deprecated`, `@experimental` | free text, no braces |
| Bare, no text at all | `@public`, `@private`, `@protected`, `@abstract`, `@constructor`, `@override`, `@formProperty` |

### Allowed tags per member

Anything outside these is rejected.

| Entity | Allowed |
|--------|---------|
| all | `@public`, `@protected`, `@private`, `@since`, `@deprecated` |
| property, getter | plus `@default`, `@formProperty`, `@formEvents`, and `@override` on getters |
| slot | plus `@default` |
| event | plus `@param` |
| method | plus `@param`, `@returns`, `@override` |
| class | plus `@constructor`, `@class`, `@abstract`, `@experimental`, `@implements`, `@extends`, `@slot`, `@csspart`, `@cssState` |
| enum, enum member, interface | plus `@experimental` |

`@native` and `@allowPreventDefault` are accepted but should not be written — cancelability is
derived from the decorator and documented in prose.

### Class-level JSDoc

The block needs `@class`, `@constructor`, or `@abstract` to be recognised at all. Without one of
them the entire class JSDoc is skipped — silently, with no error and no manifest entry. Beyond that:
`@extends`, `@public`, and `@implements` when there is an `implements` clause. The `### Overview`,
`### Usage`, and `### ES6 Module Import` prose sections are conventional. Full boilerplate in
`new-component.md`.

A `part` in the template also needs a class-level `@csspart name - description`, or the part ships
undocumented with no error.

### Three errors whose message misleads

- `@interface {X} tag is used, but the class doesn't implement…` — the tag you write is
  `@implements`, not `@interface`. Add the `implements` clause or drop the tag.
- `Type 'X' is used to describe a public API but is not exported.` — add it to the module's
  `export type { … }`. Hits event detail types most often.
- `Event details for event 'x' must be described.` — the event has `@param` tags but no matching
  `eventDetails` entry, or the intersection puts the parent's types last.

Everything else CEM reports names the missing tag directly.

## Versioning

- New public property, slot, event, or method gets `@since <next minor>` — read the current version
  from `lerna.json` and bump the minor. Nothing enforces this; a reviewer will.
- Removing or renaming anything public is breaking. Mark the old name `@deprecated` pointing at the
  replacement, keep it working, and note it in the commit body under `BREAKING CHANGE:`.
- `@experimental` marks API that may still change, with optional explanatory text.
