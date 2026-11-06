# AGENTS.md - AI Coding Assistant Guide

This file provides guidance for AI coding assistants (Claude, Copilot, Cursor, Gemini, Codex, etc.) when working with this repository.

## Knowledge Base — read this first

Detailed conventions, guardrails, and good/bad examples live in the **AI Knowledge Base** at
`ai-knowledge-base/`. It is the authority on how to write code here — for bug fixes, features,
refactoring, reviews, and tests alike. Load it **on demand**, not up front: it has a routing table
that points you to the reference files your task needs.

**Read [`ai-knowledge-base/INDEX.md`](./ai-knowledge-base/INDEX.md) before you edit code whenever any of these is true:**

- You add, change, review, or test a `.ts`, `.tsx`, or `.css` file under `packages/`.
- You write or debug a Cypress spec.
- The task names a `ui5-*` component, a property, slot, event, design token, or ARIA attribute.

Then open **only** the reference files its routing table names for the areas your task touches — do not
read every file. If your work is purely conversational, a docs-only edit, or a question that touches no
component code, you do not need it.

**Non-negotiables** — these apply to every code task, whether or not you open the knowledge base:

1. Never run the full test suite. Run one spec: `yarn test:cypress:single cypress/specs/<Component>.cy.tsx`.
2. Property enums are type-only: `import type X`, declare the property as `` `${X}` ``, compare against string literals.
3. Select by attribute, never by tag name: `[ui5-button]` in CSS, in `querySelector`, and in specs.
4. No `instanceof` against a UI5 class. Use `createInstanceChecker` with a duck-typing marker.
5. `@query` refs exist to call methods like `.focus()`. Set child state through the template instead.
6. Public booleans default to `false`. Invert the name when the feature is on by default.
7. Events use `event-strict.js`, a typed `eventDetails` entry, and `fireDecoratorEvent` — never `fireEvent`.
8. Make the smallest change that solves the problem. No opportunistic cleanup, no drive-by refactors.

**By file type** — the rules that matter most, and the reference in `ai-knowledge-base/references/` to read
when the task goes beyond them:

- **Component code** (`packages/*/src/**/*.ts`, `.tsx`) — `core-rules.md`, plus `api-design.md` when the
  change touches a property, slot, event, or public method.
  - Private `@property` fields get `noAttribute: true` unless a CSS selector reads the attribute. State that
    nothing renders is a plain field, not a `@property`.
  - Strict decorators only: `decorators/slot-strict.js` and `decorators/event-strict.js`.
  - Register external listeners (`ResizeHandler`, `document`, `window`) in `onEnterDOM` and deregister them
    in `onExitDOM` with the same bound reference.
  - Bubbled handlers that resolve a child component use `e.composedPath()[0]`, not `e.target`.
  - Children never reach for their parent (`this.parentElement`, `this.closest(`): the child fires, the parent listens.
  - Relative imports end in `.js`, every icon is imported explicitly, and keyboard checks use the `Keys.js`
    predicates (`isEnter(e)`).
- **CSS** (`packages/*/src/**/*.css`) — `theming-and-css.md`.
  - Never hard-code a color or a font. Use `--sap*` tokens; add a `--_ui5_<component>_*` parameter in a
    `-parameters.css` file only when a value differs per theme.
  - Logical properties only: `margin-inline-start`, `inset-inline-start`, `text-align: start` — never
    `margin-left`, `left:`, or `text-align: left`.
  - Style persistent state from reflected attributes (`:host([open])`), not classes.
  - Anything marked `part="..."` is public API: document it with `@csspart`; renaming it is a breaking change.
  - `rem` for sizing; `px` only for hairline borders and small offsets. A
    `@container style(--ui5_content_density: compact)` block works only inside a `-parameters.css` file.
- **Translatable text** (`packages/*/src/i18n/messagebundle.properties`) — `i18n.md`.
  - Every user-visible or screen-reader-audible string is a key — ARIA labels, announcements, and tooltips included.
  - Every new key carries an annotation comment: `#XACT:` for ARIA text, `#XFLD:` for a label, `#XTOL:` for a tooltip.
  - Names are `SCREAMING_SNAKE_CASE` prefixed with the component name. Reuse the shared unprefixed keys
    (`DELETE`, `ACC_STATE_REQUIRED`), and never point at another component's key.
  - Placeholders are positional (`{0}`, `{1}`); plurals are separate keys. Edit only `messagebundle.properties`.
- **Cypress specs** (`packages/*/cypress/**`) — `commands-and-debugging.md`, plus `performance.md` when a
  spec passes locally and fails in CI.
  - Assert translated text against the bundle (`getText(...)` or `.defaultText`), never an English literal.
  - To wait for a render, use `cy.waitRenderFinished()`; `cy.mount` and the real-event commands already wait.

## Project Overview

UI5 Web Components is an enterprise-grade, framework-agnostic web components library implementing SAP Fiori design. It's a Yarn-based monorepo using Lerna and Yarn Workspaces.

**Requirements:** Node.js ^20.19.0 or >=22.12.0, Yarn v4 (via Corepack: `corepack enable`)

## Monorepo Structure

```
packages/
├── base/       # Core framework, UI5Element base class, decorators, rendering
├── main/       # Primary components (Button, Input, Table, etc.)
├── fiori/      # SAP Fiori-specific components (ShellBar, SideNavigation)
├── ai/         # AI-related components
├── theming/    # Theming assets and base themes
├── localization/ # i18n and CLDR assets
├── icons*/     # Icon collections
├── tools/      # Build tools, dev server, CLI
└── website/    # Documentation website
```

Website samples have their own guide: [`packages/website/AGENTS.md`](./packages/website/AGENTS.md).

## Essential Commands

From the repo root:

```bash
yarn start      # dev server; also runs `yarn generate` in watch mode
yarn generate   # compiles .css and .properties into src/generated — needed once on a clean checkout
yarn ts         # TypeScript type-check
yarn lint       # lint all packages
yarn build      # full production build
```

Tests run from a package folder (`packages/main`, `packages/fiori`, …), one spec at a time. They read `.ts` files directly, so `yarn ts` is not needed first. Isolate a failing case with `it.only(...)`, then
remove `.only` and rerun the whole spec before committing.

Docs website: `cd packages/website && yarn start` (Docusaurus on http://localhost:3000). More commands and
debugging steps: [`ai-knowledge-base/references/commands-and-debugging.md`](./ai-knowledge-base/references/commands-and-debugging.md).

## Commit Message Format

Follow [Conventional Commits](https://conventionalcommits.org):

```
<type>(<scope>): <description>

[body]

[footer]
```

**Types:** `fix`, `feat`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`
**Scope:** Component name (e.g., `ui5-button`, `ui5-table`)

```
fix(ui5-button): correct focus outline on tab key

The button now receives proper focus outline when
navigating with the tab key.

Fixes #42
```

## GitHub Actions & Release

The release workflow (`release.yaml`) follows this order:
1. **Version Bump** - `lerna version --no-push` (local only)
2. **Build** - `yarn ci:releasebuild` (has correct version)
3. **Push & Release** - Push tags, create GitHub release
4. **Publish** - `lerna publish from-git`

This ensures `VersionInfo.js` has the correct version and nothing is pushed if build fails.
