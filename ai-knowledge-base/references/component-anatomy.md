# Component Anatomy

## Contents

- The file set — a table of every file a component consists of, which are required, and what each is for
- Order inside the `.ts` file — the usual order of imports, class members, and exports
- Decorators — what each decorator does, and the `@customElement` config keys
- Lifecycle — when each hook fires and what it is for
- Templates — how a `.tsx` template reads the instance, `part`, and the focus marker

## The file set

The table below uses a component named `Foo` in `packages/main`. The other component packages
(`fiori`, `ai`, `compat`) use the same file set; replace `packages/main/` with the package path.

| File | Required | Purpose |
|------|----------|---------|
| `packages/main/src/Foo.ts` | yes | Class, decorators, logic, public API |
| `packages/main/src/FooTemplate.tsx` | yes, unless the component is headless (no visible markup) | Preact JSX template |
| `packages/main/src/themes/Foo.css` | yes, unless headless | Structure and layout — most components need only this file |
| `packages/main/src/themes/base/Foo-parameters.css` | rare | Per-theme values; when to add one is in `theming-and-css.md` (Where each file goes) |
| `packages/main/src/themes/<theme>/Foo-parameters.css` | rare | Per-theme overrides for the above |
| `packages/main/src/themes/<theme>/parameters-bundle.css` | only if parameters files exist | Registers the parameters files for that theme — see `theming-and-css.md` |
| `packages/main/src/types/FooSomething.ts` | if it has a public enum | One enum per file. A private, unexported enum can live inline in `Foo.ts` instead |
| `packages/main/src/i18n/messagebundle.properties` | if it has text | One bundle per package; key naming is in `i18n.md` |
| `packages/main/src/i18n/messagebundle_en.properties` | if the English text of an existing key changes | Overrides `messagebundle.properties` for English. See `i18n.md` |
| `packages/main/cypress/specs/Foo.cy.tsx` | conventional | Behaviour tests. A subcomponent's tests usually live in its parent's spec — `AvatarBadge` is covered by `Avatar.cy.tsx`, `MenuItem` by `Menu.cy.tsx` |
| `packages/main/cypress/specs/visuals/Foo.cy.tsx` | if visual | Screenshot tests |
| `packages/main/test/pages/Foo.html` | recommended | Manual test page for the dev server |
| `packages/website/docs/_samples/main/Foo/...` | if public | Documentation samples |

A new component is registered in `src/bundle.esm.ts` only; see `new-component.md`.

## Order inside the `.ts` file

Imports commonly go framework first, then base utilities and types, then local modules, then the
template, and generated modules last.

```ts
// A component's imports, condensed — a real file has more framework/base imports than shown
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { Slot, DefaultSlot } from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ButtonDesign from "./types/ButtonDesign.js";
import type ButtonBadge from "./ButtonBadge.js";
import ButtonTemplate from "./ButtonTemplate.js";
import {
	BUTTON_ARIA_TYPE_ACCEPT,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import buttonCss from "./generated/themes/Button.css.js";
```

Import decorators from individual files, as above. Importing from `decorators.js` compiles the same
but is a Table-family convention — use it only when extending that family.

### Order inside the class

Classes commonly start with `eventDetails`, then public `@property` fields, then `@slot` fields, then
plain private fields and `@query` fields, then the static `@i18n` bundle, then the constructor,
lifecycle hooks, event handlers, the getters the template calls, and static helpers last.

`Foo.define()` and `export default Foo` close the file, followed by an `export type { … }` of any type
used in a public signature — CEM requires it (see `api-design.md`).

## Decorators

The `@ui5/webcomponents-base/dist/decorators.js` module re-exports every decorator except `query` and
`queryAll`, which come from their own files.

| Decorator | Applies to | Notes |
|-----------|-----------|-------|
| `@customElement(config)` | class | See config keys below |
| `@property(options)` | field | `type`, `noAttribute`, `converter`. Default type is String |
| `@slot(options)` | field | Use `decorators/slot-strict.js`, or `slotStrict` from `decorators.js`. `type`, `default`, `invalidateOnChildChange`, `individualSlots`, `propertyName` (rarely passed explicitly — `slot-strict` sets it for the default slot) |
| `@event(name, options)` | class | Use `decorators/event-strict.js`, or `eventStrict` from `decorators.js`. `bubbles`, `cancelable` |
| `@i18n(bundleName)` | static field | e.g. `@i18n("@ui5/webcomponents")` |
| `@query(selector)` | field | Shadow DOM `querySelector`, evaluated on access |
| `@queryAll(selector)` | field | Shadow DOM `querySelectorAll` |

The strict decorators take their types from the class's `eventDetails` map and from `Slot<T>` /
`DefaultSlot<T>`.

### `@customElement` config keys

| Key | Type | When to set it |
|-----|------|----------------|
| `tag` | string | Always. Kebab-case, `ui5-` prefix in this repo. Pass it alone as `@customElement("ui5-foo")` when no other key is needed — common for components that inherit everything else from a base class |
| `renderer` | `jsxRenderer` | Set on whichever class in the chain owns the template. Inherited by subclasses through the static prototype chain, so a subclass whose base already sets it doesn't repeat it |
| `template` | imported template | Any component that renders its own visible markup. Omitted entirely by headless components that render nothing (Table "feature" plugins with no shadow DOM of their own) and by subclasses that inherit a base's template unchanged |
| `styles` | one or an array | Set together with `template`, or omitted together with it. Array when composing shared CSS |
| `languageAware` | boolean | The component renders translated text |
| `themeAware` | boolean | The component needs to re-render on theme change |
| `cldr` | boolean | The component formats dates or numbers |
| `formAssociated` | boolean | The component participates in form submission — pairs with `formAssociatedCallback()`, see Lifecycle |
| `fastNavigation` | boolean | The component is an F6 navigation group |
| `shadowRootOptions` | object | `{ delegatesFocus: true }` — rare; see `accessibility.md` (Focus) for when it applies |
| `dependencies` | array | Still consumed at runtime for micro-frontend tag scoping (`getUniqueDependencies`/`tagsToScope`), despite an `@deprecated` JSDoc on the field — that tag means only "unnecessary for the old Handlebars renderer," not "remove this." Some components still set it deliberately. Set it when your component slots in other custom elements and needs correct scoping |
| `features` | array | A different, disused mechanism from the Table `features` *slot* pattern in `api-design.md` — don't confuse the two. Deprecated. Do not add |

## Lifecycle

| Hook | Fires | Use it for |
|------|-------|-----------|
| `constructor` | once, on creation | Field initialisation only. No DOM |
| `static async onDefine()` | once, inside `define()` | Deprecated for new code — use `@i18n` and the `cldr` option instead |
| `onInvalidation(changeInfo)` | at invalidation time, before the deferred render | React to a specific property or slot change. Does not fire for language, theme, or RTL-direction changes — those bypass invalidation and re-render directly; see `performance.md` |
| `onBeforeRendering` | before each render | Derive state the template needs. No DOM or layout reads — the DOM still reflects the previous render |
| `onAfterRendering` | after each render | DOM measurement, positioning. Guard any `@property` write — an unconditional write re-invalidates and loops |
| `onEnterDOM` | late in `connectedCallback`, after the first render, only if still connected | Listeners on `this`, `ResizeObserver`, delegate setup |
| `onExitDOM` | `disconnectedCallback`, skipped if the element was never fully connected | Tear down everything `onEnterDOM` created (core-rules, Why `onEnterDOM` / `onExitDOM`) |
| `formAssociatedCallback()` | when the browser associates or disassociates the form, for `formAssociated: true` components | Calls `updateFormValue()`; override to react to the association changing |
| `attributeChangedCallback` | on every attribute write | Framework-owned: converts the attribute and assigns the property. Never override |

## Templates

Templates are Preact JSX in `.tsx` files. Each is a default-exported function that types `this` as
the component, so `this.foo` in the JSX reads the instance.

```tsx
		<button
			type="button"
			class={{
				"ui5-button-root": true,
				"ui5-button-badge-placement-end": this.badge[0]?.design === "InlineText",
				"ui5-button-badge-placement-end-top": this.badge[0]?.design === "OverlayText",
				"ui5-button-badge-dot": this.badge[0]?.design === "AttentionDot"
			}}
			disabled={this.disabled}
			data-sap-focus-ref
```

- `part="..."` on anything an application may need to style, documented with a class-level
  `@csspart` tag — see `api-design.md` for the JSDoc shape this requires.
- `data-sap-focus-ref` marks the focus target when it is not the first shadow child; ARIA and
  `tabindex` go on that element, never on the host — see `accessibility.md` (Wiring ARIA).
- Computed values come from getters on the class, not from expressions in the template. Inline
  `class={{ ... }}` objects are the accepted exception, and much of the codebase uses them.
- Large templates are commonly split into local helper functions that take the instance
  (`RangeSliderTemplate.tsx`'s `startTooltip`/`endTooltip`) rather than inlined as one long tree.
- A subclass template can reuse its parent's by passing `injectedProps`:
  `buttonTemplate.call(this, { ariaPressed: this.pressed })` in `ToggleButtonTemplate.tsx`.
