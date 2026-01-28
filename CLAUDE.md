# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UI5 Web Components is an enterprise-grade, framework-agnostic web components library implementing SAP Fiori design. It's a Yarn-based monorepo using Lerna and Yarn Workspaces.

**Requirements:** Node.js ^20.19.0 or >=22.12.0, Yarn v4 (via Corepack: `corepack enable`)

## Common Commands

Root folder commands:
```bash
# Building
yarn ts                 # TypeScript compilation, always run in the root folder as the monorepo uses typescript workspaces too

# Linting
yarn lint               # Lint all packages
```

Package level commands  (e.g., packages/main/):
```bash
cd pacakges/main
# Testing in a specific package
yarn test:cypress              # Run all Cypress tests
yarn test:cypress:single cypress/specs/Button.cy.tsx  # Run single test file
```

## Monorepo Structure

Key packages in `/packages/`:
- **base**: Core framework, UI5Element base class, decorators, rendering
- **main**: Primary components (Button, Input, Table, etc.) - `@ui5/webcomponents`
- **fiori**: SAP Fiori-specific components (ShellBar, SideNavigation) - `@ui5/webcomponents-fiori`
- **ai**: AI-related components
- **theming**: Theming assets and base themes
- **localization**: i18n and CLDR assets
- **icons**, **icons-tnt**, **icons-business-suite**: Icon collections
- **tools**: Build tools, dev server, CLI

## Component Architecture

Components use decorator-based definitions with Preact JSX templates:

```typescript
@customElement({
  tag: "ui5-button",
  renderer: jsxRenderer,
  template: ButtonTemplate,
  styles: buttonCss,
  languageAware: true,
})
class Button extends UI5Element {
  @property() design: `${ButtonDesign}` = "Default";
  @property({ type: Boolean }) disabled = false;
}
```

**File structure for a component:**
- `src/ComponentName.ts` - Component class with decorators
- `src/ComponentNameTemplate.tsx` - JSX template
- `src/themes/ComponentName.css` - Styles (works across all themes via CSS variables)
- `src/i18n/messagebundle*.properties` - Translations
- `cypress/specs/<Component>.cy.tsx` - the test file for the component

## Critical Development Rules

### DOM manipulation anti-pattern
this is a common pattern for accessing DOM elements:
```typescript
	@query("[component-selector]")
	_domRefToComponent!: SomeComponent;
```

another way for accessing DOM elements is:
```typescript
const _domRefToComponent = this.shadowRoot!.querySelector<SomeComponent>("[component-selector]")!;
```

Using the reference is only allowed for calling `.focus()` like this:
```typescript
_domRefToComponent?.focus();
```

Modifying properties is strictly forbidden and should be done in the template instead.
```typescript
// BAD - don't modify the dom directly
_domRefToComponent?.value = `don't do this`;
```

```tsx
// GOOD - use the template
<SomeComponent value={'do this instead'}>
```

### Always use template literal types for enums
Imports:
```typescript
// BAD - don't import the enum object from the JS file
import ButtonDesign from "./types/ButtonDesign.js";

// GOOD - import the type of the enum only - no runtime overhead
import type ButtonDesign from "./types/ButtonDesign.js";
```

Property types:
```typescript
  // BAD - don't use the type directy and don't assign values from the enum object
	design: ButtonDesign = ButtonDesign.Default;

  // GOOD - Awalys use template literal for the enum and always assign the string values
  design: `${ButtonDesign}` = "Default";
```

Enum value usage:
```typescript
// BAD - don't use enum values from the object in the runtime (having a type import enforces this)
this.design !== ButtonDesign.Transparent

// GOOD - use strings (IDE will autocomplete, TS will force the enum correctness, no runtime overhead from enum)
this.design !== "Transparent";
```

### Scoping-Safe Code (Required for Micro-Frontend Support)
```typescript
// BAD - hard-coded tag names break scoping
this.shadowRoot.querySelector("ui5-popover")
ui5-button.accept-btn { color: green; }

// GOOD - use attribute notation
this.shadowRoot.querySelector("[ui5-popover]")
[ui5-button].accept-btn { color: green; }
```

### No instanceof Checks, no direct `.tagName` comparison
```typescript
// BAD - fails with multiple framework versions
if (element instanceof Button) { }

// BAD - the tag name could be scoped like `UI5-BUTTON-F5331039` and won't match
if (element.tagName === "UI5-BUTTON") { }

// GOOD - use the `hasTag` helper that checks the pure tag
// use instance check like
const isInstanceOfComboBoxItemGroup = (object: any): object is ComboBoxItemGroup => {
	return "isGroupItem" in object;
};
```

### Property/Event Conventions
- Never change public properties without user interaction
- Set `noAttribute: true` for private properties not used in CSS
- Fire events upon every user interaction to notify applications
- Import all icons explicitly (test bundle imports all, but real apps don't)

## Testing with Cypress

Tests use component testing with JSX mounting:

```typescript
import Button from "../../src/Button.js";

describe("Button", () => {
  it("tests click event", () => {
    cy.mount(<Button>Click me</Button>);

    cy.get("[ui5-button]").then(($btn) => {
      cy.spy($btn[0], "click").as("clicked");
    });

    cy.get("[ui5-button]").realClick();  // Use realClick, not click
    cy.get("@clicked").should("have.been.called");
  });
});
```

**Key testing patterns:**
- Use `cypress-real-events`: `realClick()`, `realPress()`, `realType()` instead of simulated events
- Use `cy.ui5SimulateDevice("phone")` for mobile testing
- For language testing: `cy.wrap({ setLanguage }).invoke("setLanguage", "bg")` (must await)
- Import `Assets.js` when testing with non-default languages

**Running single test case from a test file**
When fixing a failing test, check the fix by running just the failing test case instead of all tests in the file.

Example of failing test case:
```tsx
	it("should set correct tooltip to right text button", () => {
```

Use `.only` to verify the fix faster
```tsx
	it.only("should set correct tooltip to right text button", () => {
```

Do this for each failing test case, remove `.only` when all cases are fixed and run the full test file or suite for final verification

## Commit Message Format

Follow [Conventional Commits](https://conventionalcommits.org):

```
<type>(<scope>): <description>

[body]

[footer]
```

**Types:** `fix`, `feat`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`
**Scope:** Component name (e.g., `ui5-button`, `ui5-table`)
**Description:** Imperative present tense, max 100 chars, no period

Example:
```
fix(ui5-button): correct focus with 'tab' key

The button should receive a correct focus outline
when the 'tab' key is pressed.

Fixes #42
```
