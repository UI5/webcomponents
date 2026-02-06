# AGENTS.md - AI Coding Assistant Guide

This file provides guidance for AI coding assistants (Claude, Copilot, Cursor, etc.) when working with this repository.

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

## Essential Commands

### Root Level (Always run from repo root)
```bash
yarn start       # Start dev server with watch mode (recommended for development)
yarn build       # Full production build
yarn lint        # Lint all packages
```

### Package Level (Run from specific package folder)
```bash
cd packages/main
yarn test:cypress:single cypress/specs/Button.cy.tsx  # Single test file
```

### Build & Test Flow

**Build steps** (always run from root folder):
1. `yarn generate` - Generates `.ts` files (in `src/generated`) from `.css` and `.properties` files. Run once on clean state, or when these files change. The dev server runs this in watch mode automatically.
2. `yarn ts` - TypeScript compilation, populates `dist/` with `.js` and `.d.ts` files. Use to check for TypeScript errors.

**Test steps** (run from package folder):
```bash
cd packages/main  # or fiori, etc.
yarn test:cypress:single cypress/specs/<Component>.cy.tsx
```

Tests consume `.ts` files directly and detect TypeScript errors - no need to run `yarn ts` first.

**Running a single test case:**
When fixing a failing test, use `.only` to run just that case:
```tsx
it.only("should set correct tooltip", () => {  // Add .only
```
Remove `.only` before committing and run the full test file for final verification.

**Dev server:** When running, the dev server executes `yarn generate` in watch mode. This won't interfere with running other commands.

**Important:** Never run all tests locally. Only run tests for the component being modified.

## Component Development

For detailed component architecture, development rules, and testing patterns, see [`packages/base/AGENTS.md`](./packages/base/AGENTS.md).

### Quick Reference

| Rule | Bad | Good |
|------|-----|------|
| Enum imports | `import Enum from "..."` | `import type Enum from "..."` |
| Enum types | `prop: Enum` | `prop: \`${Enum}\`` |
| Enum values | `Enum.Value` | `"Value"` |
| DOM queries | `querySelector("ui5-tag")` | `querySelector("[ui5-tag]")` |
| CSS selectors | `ui5-tag { }` | `[ui5-tag] { }` |
| Type checks | `instanceof Component` | `isInstanceOfComponent(el)` |
| DOM mutation | `this._ref.value = x` | Template: `<Comp value={x} />` |

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

## Website Samples

Component samples for the documentation website follow this structure:

```
packages/website/docs/_samples/
├── main/           # For @ui5/webcomponents
│   └── Button/
│       └── Basic/
│           ├── sample.html   # HTML with component usage
│           ├── main.js       # JS imports
│           ├── main.css      # Optional CSS
│           └── Basic.md      # Markdown wrapper
└── fiori/          # For @ui5/webcomponents-fiori
    └── ShellBar/
        └── Basic/
            └── ...
```

### Sample Files

**`sample.html`** - Component usage wrapped in HTML boilerplate:
```html
<!-- playground-fold -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample</title>
</head>
<body style="background-color: var(--sapBackgroundColor)">
<!-- playground-fold-end -->

    <ui5-button>Press</ui5-button>
    <ui5-button icon="sap-icon://edit">Edit</ui5-button>

<!-- playground-fold -->
    <script type="module" src="main.js"></script>
</body>
</html>
<!-- playground-fold-end -->
```

**`main.js`** - Required imports for the sample:
```javascript
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/edit.js";
```

**`<SampleName>.md`** - Wrapper that loads the sample into the Editor:
```markdown
import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';

<Editor html={html} js={js} />
```

If the sample has CSS, include it:
```markdown
import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';
import css from '!!raw-loader!./main.css';

<Editor html={html} js={js} css={css} />
```

### Playground Fold Comments

Use `<!-- playground-fold -->` and `<!-- playground-fold-end -->` to hide boilerplate code in the interactive playground. Only the component usage (between fold comments) is shown to users.

## GitHub Actions & Release

The release workflow (`release.yaml`) follows this order:
1. **Version Bump** - `lerna version --no-push` (local only)
2. **Build** - `yarn ci:releasebuild` (has correct version)
3. **Push & Release** - Push tags, create GitHub release
4. **Publish** - `lerna publish from-git`

This ensures `VersionInfo.js` has the correct version and nothing is pushed if build fails.
