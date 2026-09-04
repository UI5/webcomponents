# Public API Design

Properties, slots, events, methods, CSS parts, and the JSDoc that documents them.

JSDoc is validated when the Custom Elements Manifest is generated, by `yarn generateAPI`. Neither
`yarn ts` nor `yarn start` runs it, so a documentation error is invisible while you type and fails
later. Run `yarn generateAPI` before declaring an API change done.

Load alongside `core-rules.md` for any API task — this file covers how to shape and document the
API; that one covers invariants (declarative API, event ordering, boolean defaults, strict
decorators).

## Choosing the mechanism

| The application needs to… | Use |
|---------------------------|-----|
| Configure a value or a mode | property — `design`, `disabled`, `placeholder` |
| Put the component into a state | property — `open`, `collapsed`, `selected` |
| Compose child components, or supply markup, that the host renders and may talk to | slot — `content`, `header`, `valueStateMessage` |
| React to something the user did | event — `click`, `selection-change` |
| Restyle an internal element | CSS part |
| Add an optional capability that carries its own API | a slotted subcomponent — see Features below |
| Compute something the property model cannot express | public method |

Prefer a property. A public method is justified in three cases and no others: a pure computation over
an argument (`isValidValue(value)`, `formatValue(date)`), a transient action with no resting state
(`navigateTo`, `reset`, `closeOverflow`), or handing out a DOM reference. A method that would only
flip a boolean the application already owns should be a property.

`open` is the standard example of a state property. It is inherited from `Popup` by `Popover`,
`Dialog`, and `ResponsivePopover` rather than redeclared, and also exists on `Menu`, `Input`,
`ComboBox`, `MultiComboBox`, `Toast`, and the pickers. `Select` tracks open state in `opened`
(`@private`), so it is absent from the public API and docs. It still reflects as an attribute
because `@property({ type: Boolean })` does not set `noAttribute: true` — `@private` is a
doc-visibility flag only, not a reflection guard.

### Writing your own public property

A component writes its own public property when a user interaction or its own lifecycle changes that
state, then fires the matching event in the same handler. For example, `CheckBox.checked`,
`Panel.collapsed`, and `Input.value` all follow it.

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

When a property is **reflected**, its value is mirrored on the host element as an HTML attribute
(`<ui5-button design="Emphasized">`) and stays in sync when you change the property in JavaScript.

| Option | What it does |
|--------|--------------|
| `@property()` | A **string** property — the default when you pass no options. `{ type: String }` is optional and changes nothing. Reflected to an attribute. |
| `{ type: Number }` | A **number** property. Reading an attribute runs `parseFloat`; assigning in JS stores the value as-is (no coercion). Reflected back as a string attribute. |
| `{ type: Boolean }` | A **boolean** property. Attribute present means `true`, absent means `false`. When `true`, reflected as an empty attribute (`disabled=""`). |
| `{ type: Object }`, `{ type: Array }` | Parsed from a JSON attribute if the author sets one in HTML. Never written back to the attribute. |
| `{ noAttribute: true }` | Property only — no attribute in either direction. |
| `{ converter: { fromAttribute, toAttribute } }` | Custom parse/serialize logic. `converters/DOMReference.js` already handles `opener`-style properties that accept an element or an id string. |

Common surprises: `undefined` and `null` remove the attribute; `""` leaves a present, empty one.
Nothing is reflected before the first render, so `getAttribute` in a constructor or early in a test
returns nothing. In dev mode, assigning the wrong JS type without the matching `type` option logs a
`[UI5-FWK]` error — the fastest way to spot a missing `type`.

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

Public getters need it too. A missing `@default` is a frequent CEM failure on a new API.

### Boolean polarity

No public boolean property in this library defaults to `true` — CEM rejects it. When the behaviour
you want is on by default, invert the name so `false` is the default, using the prefix that matches
what is being turned off:

| Prefix | For | Examples |
|--------|-----|----------|
| `show*` | a non-default rendered element | `showSuggestions`, `showClearIcon` |
| `hide*` | a rendered sub-element that is shown by default | `hideArrow`, `hideCloseButton`, `hideWeekNumbers` |
| `no*` | an automatic behaviour | `noTypeahead`, `noAnimation`, `noAutoSelection` |
| `prevent*` | a focus or closing side effect | `preventFocusRestore`, `preventInitialFocus` |
| `disable*` | a whole capability, distinct from `disabled` | `disableResizing`, `disableSearchCollapse` |

Pick the polarity that makes `false` correct, then name accordingly. `suppress*`, `without*`, and
`omit*` are not used here.

### `@property` on a setter

The decorator works on an accessor pair, and this is how every state property with a side effect is
written — `Popup.open` calls the open and close routines from its setter, `Popover.opener` re-opens
when it changes, `Select.value` stores into a backing field and reconciles against the slotted
options during `onBeforeRendering`. Put the JSDoc above the setter. A plain field is correct when
the property change needs no side effect beyond invalidation.

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

Much of the existing code differs from the form recommended here — importing enums as runtime values
and comparing against members like `ButtonDesign.Default`. Write the correct form; do not migrate
neighbours as a drive-by. If the file you are editing already uses the old pattern, follow the new
form only in the code you write — do not mix styles within a single expression.

### Accessibility properties

An interactive component carries `accessibleName` and `accessibleNameRef` as optional strings with no
default, `accessibleRole` typed to a component-specific enum rather than a raw ARIA role, and
`accessibilityAttributes` as `{ type: Object }` defaulting to `{}` and narrowed with
`Pick<AccessibilityAttributes, …>` to the fields it actually applies. Call `registerUI5Element` in
`onEnterDOM` only when `accessibleNameRef`, `accessibleDescriptionRef`, or `<label for>` targets can
change after mount — see `accessibility.md`.

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

Import the default export of `decorators/slot-strict.js`. The `decorators.js` barrel also exports
`slotStrict` if you need it, but the plain `slot` export there is the deprecated decorator.

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

Blanket `invalidateOnChildChange: true` on a slot holding hundreds of children is a performance
bug — scope it to the properties you read, as `Table` does for its rows. See `performance.md`.

Applications address a named slot by the **camelCase member name** — `slot="endContent"`, not
kebab-case. The default slot is a bare `<slot></slot>` in the template. With `individualSlots`, the
template reads the generated name off each child: `<slot name={step._individualSlot}></slot>`.

Read through a re-projected slot with `this.getSlottedNodes<T>(slotName)` — a method inherited from
`UI5Element` (the helper lives in `util/SlotsHelper.js`, but components call the method, they don't
import it). There is no `getSlottedElements`.

### Typing slot children

When a component accepts specific child elements in a slot, type the slot with a shared interface
(e.g. `items!: DefaultSlot<IMenuItem>`), not the concrete class. Keep `type: HTMLElement` (or `Node`
for the default slot) in the `@slot` decorator — the interface is a compile-time contract only.

Declare the interface in whichever file owns the reusable building block: the consumer when one
component defines both slot and item type (`IMenuItem` in `Menu.ts`, `ITab` in `TabContainer.ts`),
the implementer when many unrelated containers slot the same element (`IButton` in `Button.ts`,
`IIcon` in `Icon.ts`).

On every implementing class, add `implements ITheInterface` and `@implements {ITheInterface}` JSDoc.
For runtime checks across module boundaries, add a duck-typing marker getter (e.g.
`get isMenuItem() { return true; }`) and export a `createInstanceChecker` helper from the same file
— see `MenuItem.ts`.

```ts
// Menu.ts — interface lives with the consumer
interface IMenuItem extends UI5Element { /* ... */ }

@slot({ type: HTMLElement, "default": true })
items!: DefaultSlot<IMenuItem>;

// MenuItem.ts — implementing class
/**
 * @implements {IMenuItem}
 */
class MenuItem extends ListItem implements IMenuItem {
	get isMenuItem() { return true; }
}

export const isInstanceOfMenuItem = createInstanceChecker<MenuItem>("isMenuItem");
```

Never pass a component class as the slot `type` — it reintroduces `instanceof` and breaks under
scoping.

A slot with no accessor is documented with a class-level tag instead:
`@slot {Array<Node>} default - Defines the content…`

## Events

Import the default export of `decorators/event-strict.js`. The `decorators.js` barrel also exports
`eventStrict` if you need it.
Omitted options default to `bubbles: false` and `cancelable: false`. Write the booleans as literals —
CEM reads them literally and records anything that is not a literal `false` as `true`.

A class that declares events must be a custom element — via `@customElement` or by extending
`UI5Element` — or CEM errors, but the decorator order does not matter. What does matter is that
each JSDoc block sits immediately **above the decorator it documents**. An `@event` with no JSDoc
block is silently private: no error, and the event never reaches the docs or the framework
wrappers.

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

### Subclasses must extend `eventDetails` when adding events

The strict decorator resolves event names from `keyof this["eventDetails"]`. A subclass that adds a
new `@event` must re-declare `eventDetails` with the parent's map in the intersection. A subclass
that fires only inherited events needs nothing — `ToggleButton` inherits `Button`'s `eventDetails`
and only fires `click`, without re-declaring. Put your own events **last** in the intersection — CEM
reads only the final member, so the reversed order compiles and then fails validation. `MenuItem` is
the pattern:

```ts
// MenuItem.ts — adds events on top of ListItem
eventDetails!: ListItem["eventDetails"] & {
	"before-open": MenuBeforeOpenEventDetail,
	"open": void,
}
```

Export every detail type from the module, or CEM rejects it as an undocumented public type.

### What one `fireDecoratorEvent` dispatches

Each call to `_fireEvent` fires up to two events with `composed: false`: `ui5-{name}` and `{name}`.
For multi-word names like `selection-change`, a second `_fireEvent` call fires the PascalCase pair
(`ui5-SelectionChange`, `SelectionChange`) when `kebabToPascalCase(name)` differs from `name`. A
single-word name like `open` gets the same second call because `kebabToPascalCase("open")` is
`"Open"`. So a four-event name is two independent `_fireEvent` calls, not one call with four
variants — suppressing the kebab-named event via no-conflict configuration does not suppress the
PascalCase pair from the second call.

The `ui5-` prefixed events always fire; the un-prefixed ones are what no-conflict configuration
suppresses, so listen to the prefixed name inside the library. The PascalCase alias exists so
React's `onSelectionChange` binds to a real dispatched event.

Two consequences: a bubbling event stops at the first shadow boundary, so a host listening to its own
slotted children attaches listeners directly; and preventing one kebab-named event from the first
call does not prevent the PascalCase event from the second call, so a React consumer's handler may
silently not run.

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

Two patterns coexist. Lifecycle events fire first and act only if not prevented (`Popup.openPopup`,
`TabContainer.selectTab`). Value and selection changes apply the change, fire, and revert if prevented
(`CheckBox.toggle`, `List` selection) — so a `change` listener sees the new value while a
`before-open` listener sees the old state. Use fire-then-act for new lifecycle events.

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

Expose focus by overriding `getFocusDomRef()`, not `focus()`.

## JSDoc that passes CEM

Every tag is checked twice: it must be allowed for that kind of member, and it must have the right
shape. A tag in the wrong shape fails with the same "Incorrect use of @tag" error as a disallowed
one, so the shape rules matter more than the error list.

The table below is **CEM shape** — what `yarn generateAPI` accepts — not how you would write
TypeScript in general. Put types on the function signature; CEM reads JSDoc separately. Method
`@param` is prose only (no `{type}` braces — adding them fails the build). Event `@param` is the
opposite: braces are required because CEM has no signature to read.

### CEM tag shape (not TypeScript syntax)

| Tag | Shape |
|-----|-------|
| `@param` on a **method** | prose only, no braces — `@param selectedSet A set of row keys` |
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
