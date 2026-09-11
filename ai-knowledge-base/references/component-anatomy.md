# Component Anatomy

## The file set

A component named `Foo` in package `main`. Fiori is identical under `packages/fiori/src` — swap the
package prefix (`ShellBar.ts`, `ShellBarTemplate.tsx`, `themes/ShellBar.css`). `ai` and `compat` share
the same file set and build pipeline; see "packages/ai and packages/compat" below for where `ai`
diverges.

| File | Required | Purpose |
|------|----------|---------|
| `packages/main/src/Foo.ts` | yes | Class, decorators, logic, public API |
| `packages/main/src/FooTemplate.tsx` | yes, unless the component is headless (no visible markup) | Preact JSX template |
| `packages/main/src/themes/Foo.css` | yes, unless headless | Structure and layout. Use existing `--sap*` tokens and shared `--_ui5_*` parameters — most components need only this file |
| `packages/main/src/themes/base/Foo-parameters.css` | rare | Only when values differ per theme in ways that cannot be expressed with existing UI5 CSS parameters — structural differences across all themes, not colours or fonts already covered by `--sap*`. See `theming-and-css.md` |
| `packages/main/src/themes/<theme>/Foo-parameters.css` | rare | Per-theme overrides for the above |
| `packages/main/src/themes/<theme>/parameters-bundle.css` | only if parameters files exist | Per-theme aggregator and the registration unit. Add an `@import` for your `-parameters.css` to the theme families the component should be styled in, or the variables never load there. The `*_auto` folders (e.g. `sap_horizon_auto`) are generated composites of their light/dark siblings — never add a direct import there, only to the themes they draw from |
| `packages/main/src/types/FooSomething.ts` | if it has a public enum | One enum per file. A private, unexported enum can live inline in `Foo.ts` instead |
| `packages/main/src/i18n/messagebundle.properties` | if it has text | One bundle per package, mixing component-specific (`BUTTON_*`) and shared (`ACC_STATE_*`, `DELETE`) keys. Prefix new keys with the component name |
| `packages/main/src/i18n/messagebundle_en.properties` | if the English text changes | The defaults generator merges this with `messagebundle.properties` and the translated file wins, so an English copy fix that only touches `messagebundle.properties` has no visible effect until this file is updated too. Edit it by hand alongside `messagebundle.properties`. Other locale files (`messagebundle_de.properties`, etc.) are pipeline-owned — never hand-edit those |
| `packages/main/cypress/specs/Foo.cy.tsx` | conventional | Behaviour tests. A subcomponent's tests usually live in its parent's spec — `AvatarBadge` is covered by `Avatar.cy.tsx`, `MenuItem` by `Menu.cy.tsx` |
| `packages/main/cypress/specs/visuals/Foo.cy.tsx` | if visual | Screenshot tests |
| `packages/main/test/pages/Foo.html` | recommended | Manual test page for the dev server |
| `packages/website/docs/_samples/main/Foo/...` | if public | Documentation samples |

### Beyond the standard set

- Extra templates for popovers and detached subtrees: `InputPopoverTemplate.tsx`,
  `SelectPopoverTemplate.tsx`, `features/InputSuggestionsTemplate.tsx`
- Several entries in `styles: [...]` when composing shared CSS: `Select.ts`, `ShellBar.ts`
- `features/` modules, lazily imported at runtime: `features/InputSuggestions.ts` from `Input.ts`
- Registration entries in `src/bundle.esm.ts`, `src/bundle.scoped.esm.ts` (paired with
  `bundle.scoped.config.ts`), and `src/Assets.ts` — plus `src/Assets-fetch.ts` and
  `src/Assets-node.ts` for the fetch- and Node-targeted asset variants. Keep all of them in sync
  when adding a component

### packages/ai and packages/compat

Both use the same file set and build pipeline as `main`. `compat` matches `main` structurally.

`ai` currently differs in a few incidental ways — none of these are patterns to copy into new
components:

- No local `src/types/` directory today; its components import enums from
  `@ui5/webcomponents/dist/types/...` instead of declaring their own.
- `src/themes/` currently contains only `sap_horizon*` folders — whatever theme set was supported
  when `ai` was added, not an intentional Horizon-only policy.
- Some components subclass a `main` component directly and import the parent's generated CSS, which
  couples `ai` to `main` internals.
- i18n acquisition is mixed: most components use `@i18n(bundleName)`, but a few still use the
  deprecated `static async onDefine()` + `getI18nBundle()` pattern. Write new `ai` components
  against `@i18n`; do not copy `onDefine()`.

## Order inside the `.ts` file

Framework, then base utilities and types, then local modules, then the template, then generated
last — a common tendency, not a rule. Plenty of existing components import out of this order
somewhere. Match the imports around where you're adding one rather than deriving a position from
this list.

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
import ButtonDesign from "./types/ButtonDesign.js";
import type ButtonBadge from "./ButtonBadge.js";
import ButtonTemplate from "./ButtonTemplate.js";
import {
	BUTTON_ARIA_TYPE_ACCEPT,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import buttonCss from "./generated/themes/Button.css.js";
```

`Button.ts` compares against `ButtonDesign` members at runtime. Enum import and comparison
conventions are in `core-rules.md` — team guidance on standardising this is still evolving.

Decorator imports come from individual files here; the Table family instead imports from
`decorators.js`. Both compile identically; importing from `decorators.js` is essentially a
Table-family convention — write new components with individual-file imports unless you are
extending the Table family.

### Order inside the class

A common tendency, not a rule: `eventDetails` first, then public `@property` fields, then `@slot`
fields, then plain private fields and `@query` fields, then the static `@i18n` bundle, then the
constructor, lifecycle hooks, event handlers, the getters the template calls, and static helpers
last. A simple component follows this closely end-to-end.

This pattern breaks down in larger components and subclasses, so don't enforce it across existing
code. Larger components interleave `@property` and `@slot` fields around the `static i18nBundle`,
put form-validity getters (`formValidityMessage`, `formValidity`, `formFormattedValue`) before the
constructor, drop the constructor entirely, or declare a getter/setter property (like `opener`)
after the constructor instead of with the other properties. A subclass may have no `eventDetails`,
no i18n bundle, and no constructor of its own — those can live in the base class instead. Match the
surrounding code in the file you're editing.

`Foo.define()` runs at module scope after the class body, followed by `export default Foo`. A
component with exported enums or constants often has a plain `export { ... }` here too, and
`export type { ... }` only appears when there's a public API type left to export; not every component
needs one. Every type used in a public API signature must be exported this way — see `api-design.md`
for the CEM validation this satisfies.

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
| `@bound` | method | Auto-binds `this`. Real, but not currently used by any shipped component — no example to copy if you reach for it |

The strict decorators take their types from the class's `eventDetails` map and from `Slot<T>` /
`DefaultSlot<T>`. Use `slot-strict.js` and `event-strict.js` (or `slotStrict`/`eventStrict` from
`decorators.js`) for `@slot` and `@event`. The `wc-create-ui5-element` scaffolder emits the wrong `slot.js`
import — fix it to `slot-strict.js` after scaffolding (its `event-strict.js` import is already
correct).

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
| `shadowRootOptions` | object | `{ delegatesFocus: true }` only when the host has no focusable element in the natural tab order and the app may call native `element.focus()` on the host — rare (Button, ColorPicker, ColorPaletteItem). Most focusable components put `tabindex` on the inner element instead; see `accessibility.md` |
| `dependencies` | array | Still consumed at runtime for micro-frontend tag scoping (`getUniqueDependencies`/`tagsToScope`), despite an `@deprecated` JSDoc on the field — that tag means only "unnecessary for the old Handlebars renderer," not "remove this." Some components still set it deliberately. Set it when your component slots in other custom elements and needs correct scoping |
| `features` | array | A different, disused mechanism from the Table `features` *slot* pattern in `api-design.md` — don't confuse the two. Deprecated. Do not add |

## Lifecycle

| Hook | Fires | Use it for |
|------|-------|-----------|
| `constructor` | once, on creation | Field initialisation only. No DOM |
| `static async onDefine()` | once, inside `define()` | Deprecated for new code — use `@i18n` and the `cldr` option instead. Still relied on by a few `ai` components; don't copy that pattern into a new component |
| `onInvalidation(changeInfo)` | at invalidation time, before the deferred render | React to a specific property or slot change. Does not fire for language, theme, or RTL-direction changes — those bypass invalidation and re-render directly; see `performance.md` |
| `onBeforeRendering` | before each render | Derive state the template needs. No DOM reads. May be declared `async` — several components do (`Button`, `Icon`, `AvatarBadge`) even though the base signature is `void` |
| `onAfterRendering` | after each render | DOM measurement, positioning. Guard any `@property` write — an unconditional write re-invalidates and loops |
| `onEnterDOM` | late in `connectedCallback`, after the first render, only if still connected | Listeners on `this`, `ResizeObserver`, delegate setup |
| `onExitDOM` | `disconnectedCallback`, skipped if the element was never fully connected | Tear down everything `onEnterDOM` created |
| `formAssociatedCallback()` | when the browser associates or disassociates the form, for `formAssociated: true` components | Calls `updateFormValue()`; override to react to the association changing |
| `attributeChangedCallback` | on every attribute write | Framework-owned: converts the attribute and assigns the property. Never override |

`onEnterDOM` and `onExitDOM` must be symmetric: whatever you register in one, tear down in the
other. When the component reads `accessibleNameRef`, `accessibleDescriptionRef`, or `<label for>`
associations that can change after mount, pair `registerUI5Element` in `onEnterDOM` with
`deregisterUI5Element` in `onExitDOM` — see `accessibility.md`.

Do not read layout in `onBeforeRendering`; the DOM still reflects the previous render.

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
- `data-sap-focus-ref` marks the element that receives focus when it is not the first shadow child
  (e.g. Input's inner `<input>` inside a wrapper). `getFocusDomRef()` queries for it, then falls
  back to `getDomRef()` (the first shadow child). ARIA and `tabindex` go on that inner focusable
  element, never on the host — see `accessibility.md`.
- Computed values come from getters on the class, not from expressions in the template. Inline
  `class={{ ... }}` objects are the accepted exception, and much of the codebase uses them.
- A template can take an `injectedProps` parameter and be reused by another component's template
  via `templateFn.call(this, { ... })` — `ButtonTemplate.tsx` accepts one so
  `ToggleButtonTemplate.tsx` can call `buttonTemplate.call(this, { ariaPressed: this.pressed })`.
  Large templates are commonly split into local helper functions that take the instance
  (`RangeSliderTemplate.tsx`'s `startTooltip`/`endTooltip`) rather than inlined as one long tree.
- Putting `onKeyDown` directly on a child UI5 custom element in a template is fine and common
  (`MultiComboBoxPopoverTemplate.tsx`, `RangeSliderTemplate.tsx`, `SearchPopoverTemplate.tsx`) — it
  is not a pattern to avoid. If a container-level keydown or click handler misbehaves, check
  whether it reads `event.target` instead of `event.composedPath()` first; see the Debugging
  section of `INDEX.md`.
