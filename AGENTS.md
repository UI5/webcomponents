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
yarn test        # Test all packages
yarn lint        # Lint all packages
```

### Package Level (Run from specific package folder)
```bash
cd packages/main
yarn test:cypress:single cypress/specs/Button.cy.tsx  # Single test file
```

### Build & Test Flow
1. `yarn start` - Starts dev server with file watching (auto-rebuilds on changes)
2. Make your code changes
3. `cd packages/<pkg> && yarn test:cypress:single ...` - Run relevant tests

**Important:** Never run all tests locally. Only run tests for the component being modified.

## Component Architecture

Components use decorator-based definitions with Preact JSX templates:

```typescript
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property, slot } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type ButtonDesign from "./types/ButtonDesign.js";  // Type-only import

@customElement({
  tag: "ui5-button",
  renderer: jsxRenderer,
  template: ButtonTemplate,
  styles: buttonCss,
})
class Button extends UI5Element {
  @property() design: `${ButtonDesign}` = "Default";  // Template literal type
  @property({ type: Boolean }) disabled = false;
  @slot({ type: HTMLElement, "default": true }) content!: Array<HTMLElement>;
}
```

### File Structure
```
src/
├── ComponentName.ts           # Component class
├── ComponentNameTemplate.tsx  # JSX template
├── themes/ComponentName.css   # Styles (CSS variables)
└── i18n/messagebundle*.properties  # Translations
```

## Critical Development Rules

### 1. Template Literal Types for Enums

Eliminates runtime overhead:

```typescript
// BAD
import ButtonDesign from "./types/ButtonDesign.js";
design: ButtonDesign = ButtonDesign.Default;
if (this.design !== ButtonDesign.Transparent) { }

// GOOD
import type ButtonDesign from "./types/ButtonDesign.js";
design: `${ButtonDesign}` = "Default";
if (this.design !== "Transparent") { }
```

### 2. Scoping-Safe Selectors

Required for micro-frontend support where multiple versions coexist:

```typescript
// BAD - breaks with scoping
this.shadowRoot.querySelector("ui5-popover")
element.tagName === "UI5-BUTTON"

// GOOD - works with any scoping
this.shadowRoot.querySelector("[ui5-popover]")
```

```css
/* BAD */
ui5-button { color: blue; }

/* GOOD */
[ui5-button] { color: blue; }
```

### 3. No instanceof Checks

Fails with multiple framework versions:

```typescript
// BAD
if (element instanceof Button) { }

// GOOD - use duck-typing
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";

class MyItem extends UI5Element {
  readonly isMyItem = true;
}
export const isInstanceOfMyItem = createInstanceChecker<MyItem>("isMyItem");

if (isInstanceOfMyItem(element)) { /* typed as MyItem */ }
```

### 4. DOM Manipulation via Templates Only

```typescript
@query("[ui5-input]")
_input!: Input;

// GOOD - call methods only
this._input?.focus();

// BAD - never modify properties directly
this._input.value = "don't do this";

// GOOD - use template for state
<Input value={this.inputValue} />
```

### 5. Property & Event Conventions

```typescript
// Private properties - no HTML attribute
@property({ noAttribute: true })
_internalState = false;

// Fire events for user interactions
this.fireDecoratorEvent("change", { value: this.value });
```

## Testing Guidelines

### Cypress Component Testing

```typescript
import Button from "../../src/Button.js";

describe("Button", () => {
  it("fires click event", () => {
    cy.mount(<Button>Click me</Button>);

    cy.get("[ui5-button]").then(($btn) => {
      $btn[0].addEventListener("click", cy.stub().as("clicked"));
    });

    cy.get("[ui5-button]").realClick();  // Use real events
    cy.get("@clicked").should("have.been.called");
  });
});
```

### Key Patterns
- Use `cypress-real-events`: `realClick()`, `realPress()`, `realType()`
- Always use attribute selectors `[ui5-component]`
- Use `.only` to debug single test, remove before commit
- Test one component at a time

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

## Quick Reference

| Rule | Bad | Good |
|------|-----|------|
| Enum imports | `import Enum from "..."` | `import type Enum from "..."` |
| Enum types | `prop: Enum` | `prop: \`${Enum}\`` |
| Enum values | `Enum.Value` | `"Value"` |
| DOM queries | `querySelector("ui5-tag")` | `querySelector("[ui5-tag]")` |
| CSS selectors | `ui5-tag { }` | `[ui5-tag] { }` |
| Type checks | `instanceof Component` | `isInstanceOfComponent(el)` |
| DOM mutation | `this._ref.value = x` | Template: `<Comp value={x} />` |
| Build | Run in package folder | Run in root folder |
| Tests | Run all tests | Run single component test |

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
