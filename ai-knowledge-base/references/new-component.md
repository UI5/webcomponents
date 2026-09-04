# Creating a New Component

The scaffolder writes three files; the rest is manual. Theme bundles and website wiring get skipped.

## 1. Scaffold

```bash
cd packages/main
UI5_TAG_NAME_PREFIX=ui5 yarn create-ui5-element Foo
```

Without `UI5_TAG_NAME_PREFIX=ui5` the tag becomes `my-foo`. PascalCase name; exactly three files:

- `src/Foo.ts` — `@customElement`, one `@property`, `@slot`, `@event`, `eventDetails`, `.define()`
- `src/FooTemplate.tsx` — Hello World template
- `src/themes/Foo.css` — empty

One mandatory fix in `Foo.ts`: it imports the legacy `decorators/slot.js` — switch to
`decorators/slot-strict.js`. The event import is already `event-strict.js`.

A Fiori component is scaffolded the same way from `packages/fiori`, which has its own
`src/bundle.esm.ts` and `src/themes/` folders.

## 2. Write the component

Follow `component-anatomy.md` for file layout and member order, `api-design.md` for the public
surface and its JSDoc. The smallest complete component in the repo:

```ts
// The smallest complete component (class JSDoc and IMenuItem specifics omitted)
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import menuSeparatorTemplate from "./MenuSeparatorTemplate.js";
import menuSeparatorCss from "./generated/themes/MenuSeparator.css.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

@customElement({
	tag: "ui5-menu-separator",
	renderer: jsxRenderer,
	styles: [menuSeparatorCss],
	template: menuSeparatorTemplate,
})
class MenuSeparator extends UI5Element {
	// ... properties, slots, eventDetails ...
}

MenuSeparator.define();

export default MenuSeparator;
```

Set these in `@customElement` up front:

| Question | If yes |
|----------|--------|
| Can it receive focus? | `tabindex` on the inner focusable element (`data-sap-focus-ref` or first shadow child). Add `shadowRootOptions: { delegatesFocus: true }` only if the app may call native `element.focus()` on the host — see `accessibility.md` |
| Does it show translated text? | `languageAware: true`, plus an `@i18n` bundle |
| Does it format dates or numbers? | `cldr: true` |
| Does it take part in form submission? | `formAssociated: true` |
| Is it an F6 navigation group? | `fastNavigation: true` |

A component slotted inside an existing one may also need changes to that parent — for example, the
parent's slot JSDoc may need to name the new tag and its CSS may need `::slotted` rules for the new
child, as `AvatarBadge` did with `Avatar.ts` and `themes/Avatar.css`. This is not universal — e.g.
`TabContainer` styles internal clones rather than slotted children.

## 3. Types

One enum per file in `src/types/`, with `export default` there and `@public` on the enum and every
member. Import it type-only and type the property as `` `${FooDesign}` ``. Do not re-export the enum
from the component file — `ButtonBadge.ts` imports `ButtonBadgeDesign` and exports only itself. CEM
requires the export only for a type declared in the component file itself; that case fails the build
with `Type 'X' is used to describe a public API but is not exported.`

## 4. Register in the bundle

`src/bundle.esm.ts` — default import, alphabetical:

```ts
// src/bundle.esm.ts
import Avatar from "./Avatar.js";
import AvatarBadge from "./AvatarBadge.js";
```

Use `import Foo from "./Foo.js"` rather than `import "./Foo.js"` — both register the component, but
the default-import form matches every other entry in `bundle.esm.ts`.

## 5. Styles and theme parameters

`src/themes/Foo.css` holds structure. Prefer existing `--sap*` variables there — most themes already
define them. Add `Foo-parameters.css` only when a private `--_ui5_*` custom property must differ per
theme: a base file at `src/themes/base/Foo-parameters.css`, plus a per-theme override wherever the
base default is wrong. Then `@import` those files into the `parameters-bundle.css` of every theme
folder in the package (excluding `*_auto`, which are generated composites). In `packages/fiori` the
`*_exp` folders (`sap_horizon_exp`, `sap_horizon_dark_exp`, `sap_horizon_hcb_exp`,
`sap_horizon_hcw_exp`) are **not** generated — they need the manual `@import` too. A theme whose
bundle is missing the import renders the component with unresolved custom properties. See
`theming-and-css.md`.

```css
/* sap_horizon/parameters-bundle.css */
@import "../base/HeroBanner-parameters.css";
@import "./HeroBanner-parameters.css";
```

## 6. Text

Every user-visible or announced string goes in `src/i18n/messagebundle.properties` with a text-type
comment. `yarn generate` from the repo root writes `src/generated/i18n/i18n-defaults.ts`; edit that
file by hand only as a fallback when you cannot run generate. See `i18n.md`.

## 7. Accessibility

Work through the checklist at the end of `accessibility.md` before you consider the component done.

## 8. Tests

`cypress/specs/Foo.cy.tsx` covers rendering, every property, every event and payload, the keyboard
path, and ARIA. A new visual component also gets `cypress/specs/visuals/Foo.cy.tsx`.

## 9. Manual test page

`packages/main/test/pages/Foo.html`, to exercise the component across themes and text directions.

## 10. Website

Sample file layout (`sample.html`, `main.js`, `sample.tsx`, `<SampleName>.md`) is in `AGENTS.md`.
This section covers the wiring that file does not list.

**API page.** One `.mdx` under `packages/website/docs/_components_pages/<package>/` — top-level
(`main/ExpandableText.mdx`) or nested under the parent for a subcomponent
(`main/Avatar/AvatarBadge.mdx`). It must import and render each sample, not just the placeholders:

```mdx
// _components_pages/main/ExpandableText.mdx
---
slug: ../ExpandableText
---

import Basic from "../../_samples/main/ExpandableText/Basic/Basic.md";

<%COMPONENT_OVERVIEW%>

## Basic Sample
<Basic />

<%COMPONENT_METADATA%>
```

**React playground.** Add `import FooClass from "@ui5/webcomponents/dist/Foo.js";` and `FooClass` to
the `ComponentClasses` map in `packages/website/src/components/Editor/ReactPlayground.tsx`,
or the sample fails at runtime.

**Monaco types.** Add an entry to the `COMPONENTS` array in
`packages/website/scripts/generate-monaco-types.mjs`, next to
`{ name: "ButtonBadge", package: "main", tag: "ui5-button-badge" }`.

**Generate.** `docs/components/<package>/` is generated from `_components_pages` and the sidebar
reads the generated folder, so a new page stays invisible until
`cd packages/website && yarn generate-api-reference` runs. It needs the CEM manifest from
`yarn generateAPI`.

## 11. Verify

Run `yarn generate` first. The component imports `./generated/themes/Foo.css.js`, which does not
exist until then, so `yarn ts` and the tests both fail without it.

```bash
yarn generate                                        # repo root — or yarn start, which watches
yarn ts                                              # repo root
yarn generateAPI                                     # repo root — validates JSDoc and CEM
cd packages/main && yarn lint && yarn lint:scope
yarn test:cypress:single cypress/specs/Foo.cy.tsx
```
