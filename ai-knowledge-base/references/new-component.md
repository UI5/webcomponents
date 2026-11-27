# Creating a New Component

## Contents

- Generate the component files — the scaffolder command, the three files it writes, and the one fix it needs
- Write the component class — the smallest complete component and the `@customElement` options to decide up front
- Define enum types — where enums live and how the property uses them
- Register in the bundle — the one registration file
- Add styles and theme parameters — which CSS files to add and where to import them
- Add translated text — where strings go
- Check accessibility — the checklist to work through
- Write tests — the spec files and the manual test page
- Wire up the website — the API page, playground, and generated reference
- Verify — the commands that must pass

## Generate the component files

```bash
cd packages/main
UI5_TAG_NAME_PREFIX=ui5 yarn create-ui5-element Foo
```

Use a PascalCase name. Without `UI5_TAG_NAME_PREFIX=ui5` the tag becomes `my-foo`. The scaffolder
writes three files:

- `src/Foo.ts` — the class with one `@property`, `@slot`, and `@event`, plus `eventDetails` and `.define()`
- `src/FooTemplate.tsx` — a Hello World template
- `src/themes/Foo.css` — empty

Fix one import in `Foo.ts`: change `decorators/slot.js` to `decorators/slot-strict.js` (the
`event-strict.js` import is already correct). A Fiori component is scaffolded the same way from
`packages/fiori`.

## Write the component class

The smallest complete component in the repo, `MenuSeparator`:

```ts
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

Decide the `@customElement` flags up front — `languageAware` (plus an `@i18n` bundle), `cldr`,
`formAssociated`, `fastNavigation`; when each applies is in `component-anatomy.md` (config keys). A
focusable component usually needs none: `tabindex` goes on the inner focusable element
(`accessibility.md`, Focus).

A component that is slotted into an existing one may also need changes to that parent, such as naming
the new tag in the parent's slot JSDoc or adding `::slotted` rules to its CSS (`AvatarBadge` did both
in `Avatar`).

## Define enum types

One enum per file in `src/types/`, exported as `export default`, with `@public` on the enum and every
member. Don't re-export it from the component file. The property side is core-rules rule 1.

## Register in the bundle

Add a default import to `src/bundle.esm.ts`, in alphabetical order. No other file needs a
registration entry.

```ts
// src/bundle.esm.ts
import Avatar from "./Avatar.js";
import AvatarBadge from "./AvatarBadge.js";
```

## Add styles and theme parameters

`src/themes/Foo.css` is usually the only file. A per-theme value needs
`src/themes/base/Foo-parameters.css` (plus `src/themes/<theme>/Foo-parameters.css` for a theme that
overrides it), `@import`ed into the `parameters-bundle.css` of every theme listed in
`packages/tools/assets-meta.js` except the generated `*_auto` folders — rules in `theming-and-css.md`
(Where each file goes):

```css
/* sap_horizon/parameters-bundle.css */
@import "../base/HeroBanner-parameters.css";
@import "./HeroBanner-parameters.css";
```

## Add translated text

Every user-visible or announced string is a key in `src/i18n/messagebundle.properties` — see
`i18n.md`. Never edit `src/generated` by hand; if you cannot run `yarn generate`, say so.

## Check accessibility

Work through the checklist at the end of `accessibility.md`.

## Write tests

Behaviour tests go in `cypress/specs/Foo.cy.tsx`, and a visual component also gets
`cypress/specs/visuals/Foo.cy.tsx`. For manual testing across themes and text directions, add
`test/pages/Foo.html` and open it from the dev server.

## Wire up the website

Sample file layout (`sample.html`, `main.js`, `sample.tsx`, `<SampleName>.md`) is in
`packages/website/AGENTS.md`. The rest of the wiring:

- **API page.** One `.mdx` under `packages/website/docs/_components_pages/<package>/` — top-level
  (`main/ExpandableText.mdx`), or nested under the parent for a subcomponent
  (`main/Avatar/AvatarBadge.mdx`). It must import and render each sample:

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

- **React playground.** Add `import FooClass from "@ui5/webcomponents/dist/Foo.js";` and `FooClass` to
  the `ComponentClasses` map in `packages/website/src/components/Editor/ReactPlayground.tsx`, or the
  sample fails at runtime.
- **Monaco types.** Add an entry to the `COMPONENTS` array in
  `packages/website/scripts/generate-monaco-types.mjs`, next to
  `{ name: "ButtonBadge", package: "main", tag: "ui5-button-badge" }`.
- **Generate.** The sidebar reads the generated `docs/components/<package>/` folder, so a new page
  stays invisible until `cd packages/website && yarn generate-api-reference` runs. It needs the CEM
  manifest from `yarn generateAPI`.

## Verify

```bash
yarn generate                                        # repo root — creates src/generated, which the component imports
yarn ts                                              # repo root
yarn generateAPI                                     # repo root — validates JSDoc and CEM
cd packages/main && yarn lint && yarn lint:scope
yarn test:cypress:single cypress/specs/Foo.cy.tsx
```
