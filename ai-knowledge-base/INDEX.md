---
name: ui5-knowledge-base
description: Conventions and patterns for writing UI5 Web Components code in this repository. Use when adding, changing, reviewing, or testing any .ts, .tsx, or .css file under packages/, when writing a Cypress spec, or when a task names a ui5-* component, property, slot, event, design token, or ARIA attribute.
---

# UI5 Web Components — AI Knowledge Base

Guidance for any AI coding tool (Claude, Cursor, Copilot, or other). This is a reference bundle, not a
tool-specific plugin: read the **one** file the routing table names for your task, and nothing more.

Find your task in the routing table and open the one file it names.

## Non-negotiables

1. Never run the full test suite. Run one spec: `yarn test:cypress:single cypress/specs/<Component>.cy.tsx`.
2. Enums are type-only: `import type X`, declare the property as `` `${X}` ``, compare against string literals.
3. Select by attribute, never by tag name: `[ui5-button]` in CSS, in `querySelector`, and in specs.
4. No `instanceof` against a UI5 class. Use `createInstanceChecker` with a duck-typing marker.
5. `@query` refs exist to call methods like `.focus()`. Set child state through the template instead.
6. Make the smallest change that solves the problem. No opportunistic cleanup, no drive-by refactors.

## Routing table

| Your task | Open |
|-----------|------|
| Changing component code, and you are not sure what applies | `references/core-rules.md` |
| Reviewing a diff, or checking your own work before declaring done | `references/core-rules.md` (Reviewing a diff) |
| Adding or changing a property, slot, event, or public method | `references/api-design.md` |
| Understanding how a component is assembled, or which file does what | `references/component-anatomy.md` |
| Creating a brand-new component | `references/new-component.md` |
| CSS, theming, design tokens, RTL, `::part`, `:host` | `references/theming-and-css.md` |
| Keyboard navigation, ARIA, focus, screen reader output | `references/accessibility.md` |
| Any text a user can see | `references/i18n.md` |
| Unnecessary re-renders, slow interaction, invalidation | `references/performance.md` |
| A test that passes locally and fails in CI | `references/performance.md` |
| Build fails with a documentation error | `references/api-design.md` (CEM validation) |

## Commands

### From the repository root

| Command | What it does |
|---------|--------------|
| `yarn ts` | `tsc -b` across all packages. This is the type-check |
| `yarn generate` | Compiles `.css` and `.properties` into `src/generated/**`. Required on a clean checkout before `yarn ts` |
| `yarn lint` | ESLint across all packages |
| `yarn lint:scope` | Fails on tag-name selectors in `src/**/*.css` and `querySelector("ui5-...")` in `src/**/*.ts` |
| `yarn start` | Runs `generate` once, builds the Cypress helper packages, then starts the dev server with per-package watchers |

### From a package folder

```bash
cd packages/main
yarn test:cypress:single cypress/specs/Button.cy.tsx   # one spec
yarn test:cypress:open                                 # interactive runner
yarn lint
yarn lint:scope
```

## Debugging

Start at the top and stop as soon as you have an answer: read the neighbouring component, then
`yarn ts`, then one spec with `.only`, then `yarn start` and a test page.

From the root dev server the page is `packages/main/test/pages/<Component>.html`; from a package-level
`yarn start` it is `test/pages/<Component>.html`. The port is chosen at startup — read it from the console.

In the DevTools console:

```js
const el = document.querySelector("[ui5-button]");
el.getDomRef()      // the component's root shadow element
el.isUI5Element     // confirm it upgraded
```

When a spec fails, in order: read the assertion rather than the stack; rerun that case with `.only`;
confirm the component upgraded, since one missing from `bundle.esm.ts` mounts with an empty shadow
root; then throttle the CPU. If it still
fails under throttling it is a product bug, not a test bug.

One thing accounts for most interaction bugs here: handlers that read `event.target` break when the
event crosses a shadow boundary — use `composedPath()` instead.

| Build symptom | Cause |
|---------------|-------|
| `Missing default value for 'x'` | A public property without `@default` |
| `Type 'X' is used to describe a public API but is not exported` | Add it to `export type { ... }` |
| `Boolean properties must be initialzed to false` | Invert the property name (the typo is in the real message) |
| Scope lint failure | A tag-name selector in CSS or TS |
| Cannot find `./generated/...` | Run `yarn generate` |
| Unresolved i18n constant | The key is in the properties file but not in `i18n-defaults.ts` |

## Checking your work

Before declaring a task done: `yarn ts` for types, `yarn lint` for style, and `yarn lint:scope` to
catch tag-name selectors and `querySelector("ui5-...")`. Then re-read `references/core-rules.md`
(Reviewing a diff) and confirm your change respects each non-negotiable above.

## When sources disagree

1. `references/` in this skill governs how you write new code. The rules are absolute even where
   existing code disagrees; each one records how much legacy code violates it so you can recognise
   the violation rather than copy it.
2. Neighbouring source code governs structure and idiom — file layout, naming, how a template is put
   together. Copy its shape, not its rule violations. `Button.ts` is the reference component and it
   still uses runtime enum imports.

## Keeping this accurate

Add a learning here only when it is a repeatable rule that applies beyond one component. One-off
incidents don't belong here.

Cite files without line numbers and state rules without counts — both go stale on unrelated commits.
