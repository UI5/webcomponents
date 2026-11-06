# Commands, Debugging, and Checking Your Work

## Contents

- Commands: from the repository root, from a package folder
- Debugging: test pages, DevTools, failing specs, build symptoms
- Checking your work

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
catch tag-name selectors and `querySelector("ui5-...")`. Then re-read `core-rules.md`
(Reviewing a diff) and confirm your change respects each non-negotiable in the root `AGENTS.md`.
