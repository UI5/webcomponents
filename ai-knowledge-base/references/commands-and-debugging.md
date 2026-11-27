# Commands, Debugging, and Checking Your Work

## Contents

- Commands — what each root and package-level command does, and which one you need
- Debugging — the order to investigate in, test pages, DevTools, and the most common build error
- Checking your work — the commands that must pass before a task is done

## Commands

### From the repository root

| Command | What it does |
|---------|--------------|
| `yarn ts` | `tsc -b` across all packages. This is the type-check |
| `yarn generate` | Compiles `.css` and `.properties` into `src/generated/**`. Required on a clean checkout before `yarn ts` |
| `yarn generateAPI` | Generates and validates the Custom Elements Manifest — the only command that checks JSDoc. Required after any public API change |
| `yarn lint` | ESLint across all packages |
| `yarn lint:scope` | Fails on tag-name selectors in `src/**/*.css` and `querySelector("ui5-...")` in `src/**/*.ts` |
| `yarn start` | Runs `generate` once, builds the Cypress helper packages, then starts the dev server with per-package watchers |

### From a package folder

```bash
cd packages/main
yarn test:cypress:single cypress/specs/Button.cy.tsx   # one spec
yarn test:cypress:open                                 # interactive runner
yarn lint
yarn wc-dev lintfix                                    # ESLint with --fix
yarn lint:scope
```

## Debugging

Start at the top and stop as soon as you have an answer: read the neighbouring component, then
`yarn ts`, then one spec, then `yarn start` and a test page.

From the root dev server the page is `packages/<pkg>/test/pages/<Component>.html`; from a package-level
`yarn start` it is `test/pages/<Component>.html`. The port is chosen at startup — read it from the console.

In the DevTools console:

```js
const el = document.querySelector("[ui5-button]");
el.getDomRef()      // the component's root shadow element
el.isUI5Element     // confirm it upgraded
```

`Cannot find module './generated/...'`, or an `i18n-defaults` constant that does not resolve, means
`yarn generate` has not run since the source changed. Run it; never write files under `src/generated`
by hand. For JSDoc and CEM errors, see `api-design.md` (Three errors whose message misleads).

## Checking your work

Before declaring a task done, run `yarn lint` and `yarn ts`, and do not stop until both pass. Most lint
failures are auto-fixable style rules such as `curly`; `yarn wc-dev lintfix` from the package folder
fixes them. Add `yarn lint:scope`, and `yarn generateAPI` for an API change. Which rules these tools
catch, and which need a manual review, is in `core-rules.md` (Reviewing a diff).
