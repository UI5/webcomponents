---
sidebar_label: To UI5 Web Components 3.0
---

# Migration to UI5 Web Components 3.0

This guide will assist you in transitioning from UI5 Web Components version 2.x to UI5 Web Components 3.0.

---

## @ui5/webcomponents-tools

### WebdriverIO (WDIO) test support removed

WDIO-based testing has been removed from `@ui5/webcomponents-tools`. The following are no longer provided:

| Removed item | Details |
|---|---|
| NPS script `test` | Invoked the WDIO test runner |
| `lib/test-runner/test-runner.js` | WDIO runner wrapper |
| `components-package/wdio.js` | WDIO configuration |
| `@wdio/cli`, `@wdio/local-runner`, `@wdio/mocha-framework`, `@wdio/spec-reporter`, `@wdio/dot-reporter`, `@wdio/static-server-service` | WDIO npm dependencies |
| `wdio-chromedriver-service` | WDIO ChromeDriver service |
| `chromedriver` | Peer dependency |

> **What to do:** Migrate your tests to [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/overview).
>
> The `@ui5/webcomponents-tools` package already provides Cypress-based NPS scripts as the replacement:
>
> | Old | New |
> |---|---|
> | `ui5nps test` | `ui5nps test-cy-ci` (CI, all specs) |
> | — | `ui5nps test-cy-ci-suite-1` … `suite-4` (CI, split by spec name) |
> | — | `ui5nps test-cy-open` (interactive browser) |
>
> If your project has a `config/wdio.conf.cjs` or `config/wdio.conf.js` file, remove it — it is no longer read by the tooling.
>
> For a complete Cypress setup example see any component package in the monorepo (e.g. `packages/main`).

---

### HBS templates, LitRenderer, and hbs2lit/hbs2ui5 removed

Handlebars-based template compilation and the LitRenderer rendering path have been removed. The following are no longer provided:

| Removed item | Details |
|---|---|
| `lib/hbs2lit/` | Handlebars → Lit-HTML compiler |
| `lib/hbs2ui5/` | CLI wrapper and LitRenderer template generator |
| NPS script `build.templates` | Compiled `.hbs` files to `src/generated/templates/` |
| NPS script `watch.templates` | Watched `.hbs` files for changes |
| `options.legacy` | `getScripts()` option that enabled the HBS build path |
| `options.jsx` | `getScripts()` option that forced TypeScript on in legacy mode |
| `handlebars`, `escodegen`, `esprima` | npm dependencies used by the HBS compiler |

> **What to do:** Migrate any remaining `.hbs` templates to JSX/TSX using `jsxRenderer`.
>
> Replace `litRender` + a generated `.lit.ts` template with a `render()` method in your component class:
>
> ```ts
> // Before
> import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
> import MyTemplate from "./generated/templates/MyComponentTemplate.lit.js";
>
> @customElement({ renderer: litRender, template: MyTemplate })
> class MyComponent extends UI5Element { }
> ```
>
> ```tsx
> // After
> import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
>
> @customElement({ renderer: jsxRenderer })
> class MyComponent extends UI5Element {
>     render() {
>         return <div>{this.text}</div>;
>     }
> }
> ```
>
> If you were passing `legacy: true` or `jsx: true` to `getScripts()` in your `package-scripts.cjs`, remove those options. TypeScript support is now controlled via the new `typescript` option (defaults to `true`). Pass `typescript: false` only for pure JavaScript projects.

---

### CSS variable version-scoping removed

CSS custom properties (`--ui5-*`) are no longer scoped with the package version at build time. Previously, variables were transformed from `--ui5-button-color` to `--ui5-v2-19-0-button-color`. This is no longer done.

| Removed item | Details |
|---|---|
| `lib/css-processors/scope-variables.mjs` | Version-based CSS variable scoping logic |
| `CSS_VARIABLES_TARGET` env var | Controlled scoping mode (`root` vs `host`) |
| `options.cssVariablesTarget` | `getScripts()` option that set `CSS_VARIABLES_TARGET` |

> **What to do:** No action needed for most projects — CSS variables in your built output will simply use their plain names (e.g. `--ui5-button-color`) instead of versioned names.
>
> If you were passing `cssVariablesTarget` to `getScripts()` in your `package-scripts.cjs`, remove it — the option is no longer read.
>
> If you relied on versioned variable names for multi-version isolation, you will need to implement an alternative strategy (e.g. CSS layer scoping or shadow DOM containment).

---

### ESLint support removed

The built-in ESLint runner and shared ESLint configuration have been removed from `@ui5/webcomponents-tools`. The following are no longer provided:

| Removed item | Details |
|---|---|
| `lib/eslint/eslint.cjs` | ESLint runner script |
| `components-package/eslint.cjs` | Shared ESLint configuration (airbnb-base + TypeScript overrides) |
| NPS script `lint` | Ran ESLint on the package source |
| NPS script `lintfix` | Ran ESLint with `--fix` |
| `eslint`, `eslint-config-airbnb-base`, `eslint-plugin-import`, `eslint-plugin-jsx-no-leaked-values` | ESLint npm dependencies |
| `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser` | TypeScript ESLint dependencies |

> **What to do:** Set up ESLint directly in your project. Remove any `.eslintrc.cjs` file that extended `@ui5/webcomponents-tools/components-package/eslint.js` — it is no longer available.
>
> For guidance on setting up ESLint with TypeScript support in a web components project, refer to the [ESLint documentation](https://eslint.org/docs/latest/) and the [@typescript-eslint getting started guide](https://typescript-eslint.io/getting-started/).

---

### Package converted to native ESM (`"type": "module"`)

`@ui5/webcomponents-tools` is now a native ES module package. All files use ESM syntax (`import`/`export`) and the package has `"type": "module"` in its `package.json`.

**`package-scripts.cjs` must be renamed and converted to ESM**

If your package has a `package-scripts.cjs` file, rename it to `package-scripts.js` and convert it to ESM syntax:

```js
// Before (package-scripts.cjs — CommonJS)
const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");
module.exports = { scripts: getScripts({ ... }) };
```

```js
// After (package-scripts.js — ESM)
import getScripts from "@ui5/webcomponents-tools/components-package/nps.js";
export default { scripts: getScripts({ ... }) };
```

**`.mjs` entry points renamed to `.js`**

All files that were previously published with a `.mjs` extension are now `.js`. If you imported any of these directly (e.g. from `lib/css-processors/` or `lib/dev-server/`), update the extension in your imports.

