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

